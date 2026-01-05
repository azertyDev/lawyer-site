import { describe, expect, it, vi } from 'vitest'
import { validateAntispam } from '../antispam'

describe('validateAntispam', () => {
	it('should pass validation with empty honeypot and valid timestamp', () => {
		const timestamp = Date.now() - 5000
		const result = validateAntispam('', timestamp)
		expect(result.isValid).toBe(true)
	})

	it('should pass validation with undefined honeypot', () => {
		const timestamp = Date.now() - 5000
		const result = validateAntispam(undefined, timestamp)
		expect(result.isValid).toBe(true)
	})

	it('should fail if honeypot is filled', () => {
		const timestamp = Date.now() - 5000
		const result = validateAntispam('bot-filled-this', timestamp)
		expect(result.isValid).toBe(false)
		expect(result.error).toContain('honeypot')
	})

	it('should fail if timestamp is missing', () => {
		const result = validateAntispam('', undefined)
		expect(result.isValid).toBe(false)
		expect(result.error).toContain('timestamp')
	})

	it('should fail if form submitted too quickly', () => {
		const timestamp = Date.now() - 1000
		const result = validateAntispam('', timestamp)
		expect(result.isValid).toBe(false)
		expect(result.error).toContain('too quickly')
	})

	it('should pass if form submitted after minimum time', () => {
		const timestamp = Date.now() - 4000
		const result = validateAntispam('', timestamp)
		expect(result.isValid).toBe(true)
	})
})
