import { describe, expect, it } from 'vitest'
import { consultationFormSchema } from '../model/schema'

describe('consultationFormSchema', () => {
	const validData = {
		name: 'Иван Иванов',
		phone: '+7 999 123-45-67',
		comment: 'Удобно после 18:00',
		contactChannel: 'phone' as const,
		consent: true,
		_hp: '',
		_ts: Date.now(),
	}

	it('should validate correct data', () => {
		const result = consultationFormSchema.safeParse(validData)
		expect(result.success).toBe(true)
	})

	it('should require name', () => {
		const data = { ...validData, name: '' }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require name with minimum length', () => {
		const data = { ...validData, name: 'A' }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require phone', () => {
		const data = { ...validData, phone: '' }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should validate phone format', () => {
		const validPhones = [
			'+7 999 123-45-67',
			'89991234567',
			'+79991234567',
		]

		for (const phone of validPhones) {
			const data = { ...validData, phone }
			const result = consultationFormSchema.safeParse(data)
			expect(result.success).toBe(true)
		}
	})

	it('should allow optional comment', () => {
		const data = { ...validData, comment: undefined }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(true)
	})

	it('should limit comment length', () => {
		const data = { ...validData, comment: 'a'.repeat(501) }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should require consent', () => {
		const data = { ...validData, consent: false }
		const result = consultationFormSchema.safeParse(data)
		expect(result.success).toBe(false)
	})

	it('should validate contactChannel enum', () => {
		const validChannels = ['phone', 'telegram', 'whatsapp', 'email']

		for (const contactChannel of validChannels) {
			const data = { ...validData, contactChannel }
			const result = consultationFormSchema.safeParse(data)
			expect(result.success).toBe(true)
		}
	})
})
