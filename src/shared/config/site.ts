import { env } from './env'

const keywords: string[] = [
	'юрист',
	'адвокат',
	'экономические споры',
	'гражданские споры',
	'взыскание долга',
	'арбитраж',
	'договорные споры',
	'представительство в суде',
]

export const siteConfig = {
	name: env.NEXT_PUBLIC_SITE_NAME,
	url: env.NEXT_PUBLIC_SITE_URL,
	description:
		'Юридическая помощь по экономическим и гражданским спорам. ' +
		'Представительство в судах, взыскание задолженности, договорные споры.',
	keywords,
	contact: {
		phone: env.NEXT_PUBLIC_PHONE,
		phoneClean: env.NEXT_PUBLIC_PHONE.replace(/[^\d+]/g, ''),
		email: env.NEXT_PUBLIC_EMAIL,
		address: env.NEXT_PUBLIC_ADDRESS,
		workingHours: env.NEXT_PUBLIC_WORKING_HOURS,
	},
	social: {
		telegram: `https://t.me/${env.NEXT_PUBLIC_TELEGRAM_USERNAME}`,
		whatsapp: `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
	},
	legal: {
		companyName: 'ИП Иванов И.И.',
		inn: '123456789012',
		ogrn: '123456789012345',
	},
}

export type SiteConfig = typeof siteConfig
