import { z } from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_SITE_URL: z.string().url().default('https://example.com'),
	NEXT_PUBLIC_SITE_NAME: z.string().default('Юридическая практика'),

	NEXT_PUBLIC_PHONE: z.string().default('+7 (999) 123-45-67'),
	NEXT_PUBLIC_EMAIL: z.string().email().default('info@example.com'),
	NEXT_PUBLIC_ADDRESS: z.string().default('г. Москва, ул. Примерная, д. 1'),
	NEXT_PUBLIC_WORKING_HOURS: z.string().default('Пн-Пт: 9:00-19:00'),

	NEXT_PUBLIC_TELEGRAM_USERNAME: z.string().default('lawyer'),
	NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default('79991234567'),

	NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
	NEXT_PUBLIC_GA_ID: z.string().optional(),
	NEXT_PUBLIC_YM_ID: z.string().optional(),
})

const serverEnvSchema = z.object({
	RESEND_API_KEY: z.string().optional(),
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().optional(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	SMTP_FROM: z.string().optional(),
	LEADS_EMAIL: z.string().email().default('leads@example.com'),
	TURNSTILE_SECRET_KEY: z.string().optional(),
})

function getClientEnv() {
	const parsed = envSchema.safeParse({
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
		NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
		NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
		NEXT_PUBLIC_ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
		NEXT_PUBLIC_WORKING_HOURS: process.env.NEXT_PUBLIC_WORKING_HOURS,
		NEXT_PUBLIC_TELEGRAM_USERNAME: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME,
		NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
		NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
		NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
		NEXT_PUBLIC_YM_ID: process.env.NEXT_PUBLIC_YM_ID,
	})

	if (!parsed.success) {
		console.error('❌ Invalid environment variables:', parsed.error.flatten())
		throw new Error('Invalid environment variables')
	}

	return parsed.data
}

function getServerEnv() {
	const parsed = serverEnvSchema.safeParse({
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		SMTP_HOST: process.env.SMTP_HOST,
		SMTP_PORT: process.env.SMTP_PORT,
		SMTP_USER: process.env.SMTP_USER,
		SMTP_PASS: process.env.SMTP_PASS,
		SMTP_FROM: process.env.SMTP_FROM,
		LEADS_EMAIL: process.env.LEADS_EMAIL,
		TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
	})

	if (!parsed.success) {
		console.error('❌ Invalid server environment:', parsed.error.flatten())
		throw new Error('Invalid server environment variables')
	}

	return parsed.data
}

export const env = getClientEnv()
export const serverEnv = typeof window === 'undefined' ? getServerEnv() : null

export type Env = z.infer<typeof envSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>
