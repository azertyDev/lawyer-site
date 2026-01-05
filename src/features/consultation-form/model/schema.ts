import { z } from 'zod'

export const contactChannelOptions = [
	{ value: 'phone', label: 'Звонок' },
	{ value: 'telegram', label: 'Telegram' },
	{ value: 'whatsapp', label: 'WhatsApp' },
	{ value: 'email', label: 'Email' },
] as const

const phoneRegex = /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

export const consultationFormSchema = z.object({
	name: z
		.string()
		.min(2, 'Введите имя (минимум 2 символа)')
		.max(100, 'Максимум 100 символов'),
	phone: z
		.string()
		.min(1, 'Введите номер телефона')
		.regex(phoneRegex, 'Введите корректный номер телефона'),
	comment: z.string().max(500, 'Максимум 500 символов').optional(),
	contactChannel: z.enum(['phone', 'telegram', 'whatsapp', 'email'], {
		required_error: 'Выберите способ связи',
	}),
	consent: z
		.boolean()
		.refine((val) => val === true, 'Необходимо согласие на обработку данных'),
	_hp: z.string().optional(),
	_ts: z.number().optional(),
})

export type ConsultationFormData = z.infer<typeof consultationFormSchema>

export const consultationFormDefaultValues: Partial<ConsultationFormData> = {
	name: '',
	phone: '',
	comment: '',
	contactChannel: 'phone',
	consent: false,
	_hp: '',
	_ts: undefined,
}
