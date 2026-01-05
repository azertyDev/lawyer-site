import { describe, expect, it } from 'vitest'
import { cleanPhone, cn, formatPhone, slugify, truncate } from '../utils'

describe('cn', () => {
	it('should merge class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar')
	})

	it('should handle conditional classes', () => {
		expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
	})

	it('should merge tailwind classes correctly', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
	})

	it('should handle arrays', () => {
		expect(cn(['foo', 'bar'])).toBe('foo bar')
	})
})

describe('formatPhone', () => {
	it('should format 11-digit phone number', () => {
		expect(formatPhone('79991234567')).toBe('+7 (999) 123-45-67')
	})

	it('should return original if not 11 digits', () => {
		expect(formatPhone('123')).toBe('123')
	})
})

describe('cleanPhone', () => {
	it('should remove all non-digit characters except +', () => {
		expect(cleanPhone('+7 (999) 123-45-67')).toBe('+79991234567')
	})

	it('should handle plain numbers', () => {
		expect(cleanPhone('89991234567')).toBe('89991234567')
	})
})

describe('truncate', () => {
	it('should truncate long strings', () => {
		expect(truncate('Hello World', 5)).toBe('Hello...')
	})

	it('should not truncate short strings', () => {
		expect(truncate('Hello', 10)).toBe('Hello')
	})

	it('should handle exact length', () => {
		expect(truncate('Hello', 5)).toBe('Hello')
	})
})

describe('slugify', () => {
	it('should convert to lowercase', () => {
		expect(slugify('Hello World')).toBe('hello-world')
	})

	it('should replace spaces with dashes', () => {
		expect(slugify('foo bar baz')).toBe('foo-bar-baz')
	})

	it('should remove special characters', () => {
		expect(slugify('Hello, World!')).toBe('hello-world')
	})

	it('should handle multiple dashes', () => {
		expect(slugify('foo  bar')).toBe('foo-bar')
	})
})
