import { consultationFormSchema } from '@/features/consultation-form'
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

		const validationResult = consultationFormSchema.safeParse(body)
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

		const channelLabels: Record<string, string> = {
			'phone': 'Звонок',
			'telegram': 'Telegram',
			'whatsapp': 'WhatsApp',
			'email': 'Email',
		}

		const emailContent = `
Новая заявка: Запись на консультацию

Контактная информация:
- Имя: ${data.name}
- Телефон: ${data.phone}
- Предпочтительный канал: ${channelLabels[data.contactChannel] || data.contactChannel}

${data.comment ? `Комментарий:\n${data.comment}` : ''}

---
Отправлено с сайта
		`.trim()

		try {
			await sendLeadEmail({
				subject: `Консультация: ${data.name}`,
				text: emailContent,
			})
		} catch (emailError) {
			console.error('Failed to send email:', emailError)
		}

		console.log('Consultation request received:', {
			name: data.name,
			phone: data.phone,
			timestamp: new Date().toISOString(),
		})

		return NextResponse.json({
			success: true,
			message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
		})
	} catch (error) {
		console.error('Consultation submission error:', error)
		return NextResponse.json(
			{ success: false, message: 'Произошла ошибка. Попробуйте позже.' },
			{ status: 500 }
		)
	}
}
