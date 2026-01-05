import { leadFormSchema } from '@/features/lead-form'
import { serverEnv } from '@/shared/config'
import { validateAntispam, verifyTurnstile } from '@/shared/lib'
import { sendLeadEmail } from '@/shared/lib/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const antispamResult = validateAntispam(body._hp, body._ts)
		if (!antispamResult.isValid) {
			console.warn('Antispam validation failed:', antispamResult.error)
			return NextResponse.json(
				{ success: false, message: 'Ошибка валидации' },
				{ status: 400 }
			)
		}

		if (body.turnstileToken && serverEnv?.TURNSTILE_SECRET_KEY) {
			const turnstileResult = await verifyTurnstile(
				body.turnstileToken,
				serverEnv.TURNSTILE_SECRET_KEY
			)
			if (!turnstileResult.isValid) {
				return NextResponse.json(
					{ success: false, message: 'Ошибка проверки капчи' },
					{ status: 400 }
				)
			}
		}

		const validationResult = leadFormSchema.safeParse(body)
		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors
			return NextResponse.json(
				{
					success: false,
					message: 'Ошибка валидации',
					errors,
				},
				{ status: 400 }
			)
		}

		const data = validationResult.data

		const clientTypeLabel = data.clientType === 'legal' ? 'Юрлицо/ИП' : 'Физлицо'
		const disputeTypeLabels: Record<string, string> = {
			'debt-collection': 'Взыскание задолженности',
			'contract-dispute': 'Договорной спор',
			'damages': 'Взыскание убытков',
			'invalid-transaction': 'Недействительность сделки',
			'property': 'Спор о недвижимости/собственности',
			'enforcement': 'Исполнительное производство',
			'other': 'Другое',
		}
		const stageLabels: Record<string, string> = {
			'pre-court': 'До суда',
			'court': 'Судебный процесс',
			'enforcement': 'Исполнительное производство',
		}
		const channelLabels: Record<string, string> = {
			'phone': 'Звонок',
			'telegram': 'Telegram',
			'whatsapp': 'WhatsApp',
			'email': 'Email',
		}

		const emailContent = `
Новая заявка: Оценка перспективы дела

Тип клиента: ${clientTypeLabel}
Тип спора: ${disputeTypeLabels[data.disputeType] || data.disputeType}
Стадия: ${stageLabels[data.stage] || data.stage}

Описание:
${data.description}

${data.amount ? `Сумма/предмет спора: ${data.amount}` : ''}

Контактная информация:
- Имя: ${data.name}
- Телефон: ${data.phone}
${data.email ? `- Email: ${data.email}` : ''}
- Предпочтительный канал: ${channelLabels[data.contactChannel] || data.contactChannel}

---
Отправлено с сайта
		`.trim()

		try {
			await sendLeadEmail({
				subject: `Новая заявка: ${data.name} — ${disputeTypeLabels[data.disputeType] || data.disputeType}`,
				text: emailContent,
			})
		} catch (emailError) {
			console.error('Failed to send email:', emailError)
		}

		console.log('Lead received:', {
			name: data.name,
			phone: data.phone,
			disputeType: data.disputeType,
			timestamp: new Date().toISOString(),
		})

		return NextResponse.json({
			success: true,
			message: 'Заявка отправлена. Мы свяжемся с вами в течение рабочего дня.',
		})
	} catch (error) {
		console.error('Lead submission error:', error)
		return NextResponse.json(
			{ success: false, message: 'Произошла ошибка. Попробуйте позже.' },
			{ status: 500 }
		)
	}
}
