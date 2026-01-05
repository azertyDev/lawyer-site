import { serverEnv } from '@/shared/config'
import nodemailer from 'nodemailer'

interface SendEmailOptions {
	subject: string
	text: string
	html?: string
}

async function sendWithNodemailer(options: SendEmailOptions): Promise<void> {
	if (
		!serverEnv?.SMTP_HOST ||
		!serverEnv?.SMTP_USER ||
		!serverEnv?.SMTP_PASS
	) {
		throw new Error('SMTP configuration is incomplete')
	}

	const transporter = nodemailer.createTransport({
		host: serverEnv.SMTP_HOST,
		port: serverEnv.SMTP_PORT || 587,
		secure: serverEnv.SMTP_PORT === 465,
		auth: {
			user: serverEnv.SMTP_USER,
			pass: serverEnv.SMTP_PASS,
		},
	})

	await transporter.sendMail({
		from: serverEnv.SMTP_FROM || serverEnv.SMTP_USER,
		to: serverEnv.LEADS_EMAIL,
		subject: options.subject,
		text: options.text,
		html: options.html,
	})
}

async function sendWithResend(options: SendEmailOptions): Promise<void> {
	if (!serverEnv?.RESEND_API_KEY) {
		throw new Error('Resend API key is not configured')
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${serverEnv.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: 'noreply@resend.dev',
			to: serverEnv.LEADS_EMAIL,
			subject: options.subject,
			text: options.text,
			html: options.html,
		}),
	})

	if (!response.ok) {
		const error = await response.text()
		throw new Error(`Resend API error: ${error}`)
	}
}

export async function sendLeadEmail(options: SendEmailOptions): Promise<void> {
	if (serverEnv?.RESEND_API_KEY) {
		return sendWithResend(options)
	}

	if (serverEnv?.SMTP_HOST) {
		return sendWithNodemailer(options)
	}

	console.warn('No email provider configured. Lead email not sent.')
	console.log('Email would be sent:', options)
}
