const MIN_SUBMISSION_TIME_MS = 3000
const TIMESTAMP_FIELD = '_ts'
const HONEYPOT_FIELD = '_hp'

export function generateAntispamFields(): {
	timestamp: number
	timestampField: string
	honeypotField: string
} {
	return {
		timestamp: Date.now(),
		timestampField: TIMESTAMP_FIELD,
		honeypotField: HONEYPOT_FIELD,
	}
}

export interface AntispamValidation {
	isValid: boolean
	error?: string
}

export function validateAntispam(
	honeypotValue: string | undefined,
	timestamp: number | undefined
): AntispamValidation {
	if (honeypotValue && honeypotValue.length > 0) {
		return {
			isValid: false,
			error: 'Bot detected (honeypot)',
		}
	}

	if (!timestamp) {
		return {
			isValid: false,
			error: 'Missing timestamp',
		}
	}

	const elapsed = Date.now() - timestamp
	if (elapsed < MIN_SUBMISSION_TIME_MS) {
		return {
			isValid: false,
			error: 'Form submitted too quickly',
		}
	}

	return { isValid: true }
}

export async function verifyTurnstile(
	token: string,
	secretKey: string
): Promise<AntispamValidation> {
	try {
		const response = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					secret: secretKey,
					response: token,
				}),
			}
		)

		const data = await response.json() as { success: boolean }

		if (!data.success) {
			return {
				isValid: false,
				error: 'Turnstile verification failed',
			}
		}

		return { isValid: true }
	} catch {
		return {
			isValid: false,
			error: 'Turnstile verification error',
		}
	}
}

export { TIMESTAMP_FIELD, HONEYPOT_FIELD }
