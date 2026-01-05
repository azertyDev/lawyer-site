import { z } from 'zod'

export const clientTypeOptions = [
	{ value: 'legal', label: 'Юридическое лицо / ИП' },
	{ value: 'individual', label: 'Физическое лицо' },
] as const

export const disputeTypeOptions = [
	{ value: 'debt-collection', label: 'Взыскание задолженности' },
	{ value: 'contract-dispute', label: 'Договорной спор' },
	{ value: 'damages', label: 'Взыскание убытков' },
	{ value: 'invalid-transaction', label: 'Недействительность сделки' },
	{ value: 'property', label: 'Спор о недвижимости/собственности' },
	{ value: 'enforcement', label: 'Исполнительное производство' },
	{ value: 'other', label: 'Другое' },
] as const

export const stageOptions = [
	{ value: 'pre-court', label: 'До суда (досудебная стадия)' },
	{ value: 'court', label: 'Идет судебный процесс' },
	{ value: 'enforcement', label: 'Исполнительное производство' },
] as const

export const contactChannelOptions = [
	{ value: 'phone', label: 'Звонок' },
	{ value: 'telegram', label: 'Telegram' },
	{ value: 'whatsapp', label: 'WhatsApp' },
	{ value: 'email', label: 'Email' },
] as const

const phoneRegex = /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

export const leadFormSchema = z.object({
	clientType: z.enum(['legal', 'individual'], {
		required_error: 'Выберите тип клиента',
	}),
	disputeType: z.string({
		required_error: 'Выберите тип спора',
	}).min(1, 'Выберите тип спора'),
	stage: z.enum(['pre-court', 'court', 'enforcement'], {
		required_error: 'Выберите стадию',
	}),
	description: z
		.string()
		.min(10, 'Опишите ситуацию подробнее (минимум 10 символов)')
		.max(2000, 'Максимум 2000 символов'),
	amount: z.string().optional(),
	name: z
		.string()
		.min(2, 'Введите имя (минимум 2 символа)')
		.max(100, 'Максимум 100 символов'),
	phone: z
		.string()
		.min(1, 'Введите номер телефона')
		.regex(phoneRegex, 'Введите корректный номер телефона'),
	email: z.string().email('Введите корректный email').optional().or(z.literal('')),
	contactChannel: z.enum(['phone', 'telegram', 'whatsapp', 'email'], {
		required_error: 'Выберите способ связи',
	}),
	consent: z
		.boolean()
		.refine((val) => val === true, 'Необходимо согласие на обработку данных'),
	_hp: z.string().optional(),
	_ts: z.number().optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export const leadFormDefaultValues: Partial<LeadFormData> = {
	clientType: undefined,
	disputeType: '',
	stage: undefined,
	description: '',
	amount: '',
	name: '',
	phone: '',
	email: '',
	contactChannel: 'phone',
	consent: false,
	_hp: '',
	_ts: undefined,
}
