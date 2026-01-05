import { describe, expect, it } from 'vitest'
import { leadFormSchema } from '../model/schema'

describe('leadFormSchema', () => {
	const validData = {
		clientType: 'legal' as const,
		disputeType: 'debt-collection',
		stage: 'pre-court' as const,
		description: 'Test description with enough characters',
		amount: '500000',
		name: 'Иван Иванов',
		phone: '+7 999 123-45-67',
		email: 'test@example.com',
		contactChannel: 'phone' as const,
		consent: true,
		_hp: '',
		_ts: Date.now(),
	}

	it('should validate correct data', () => {
		const result = leadFormSchema.safeParse(validData)
		expect(result.success).toBe(true)
	})

	it('should require clientType', () => {
		const data = { ...validData, clientType: undefined }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.issues[0].path).toContain('clientType')
		}
	})

	it('should require disputeType', () => {
		const data = { ...validData, disputeType: '' }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require stage', () => {
		const data = { ...validData, stage: undefined }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require description with minimum length', () => {
		const data = { ...validData, description: 'short' }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require name with minimum length', () => {
		const data = { ...validData, name: 'A' }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should validate phone format', () => {
		const validPhones = [
			'+7 999 123-45-67',
			'89991234567',
			'+79991234567',
			'8 (999) 123-45-67',
		]

		for (const phone of validPhones) {
			const data = { ...validData, phone }
			const result = leadFormSchema.safeParse(data)
			expect(result.success).toBe(true)
		}

		const invalidPhones = ['123', 'not-a-phone', '']

		for (const phone of invalidPhones) {
			const data = { ...validData, phone }
			const result = leadFormSchema.safeParse(data)
			expect(result.success).toBe(false)
		}
	})

	it('should validate email format when provided', () => {
		const validEmails = ['test@example.com', 'user@domain.ru', '']

		for (const email of validEmails) {
			const data = { ...validData, email }
			const result = leadFormSchema.safeParse(data)
			expect(result.success).toBe(true)
		}

		const invalidEmails = ['not-an-email', 'missing@domain']

		for (const email of invalidEmails) {
			const data = { ...validData, email }
			const result = leadFormSchema.safeParse(data)
			expect(result.success).toBe(false)
		}
	})

	it('should require consent', () => {
		const data = { ...validData, consent: false }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should allow optional amount', () => {
		const data = { ...validData, amount: undefined }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(true)
	})

	it('should validate contactChannel enum', () => {
		const validChannels = ['phone', 'telegram', 'whatsapp', 'email']

		for (const contactChannel of validChannels) {
			const data = { ...validData, contactChannel }
			const result = leadFormSchema.safeParse(data)
			expect(result.success).toBe(true)
		}

		const data = { ...validData, contactChannel: 'invalid' }
		const result = leadFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})
})
