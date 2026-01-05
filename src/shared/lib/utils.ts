import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
	const digits = phone.replace(/\D/g, '')
	if (digits.length === 11) {
		return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
	}
	return phone
}

export function cleanPhone(phone: string): string {
	return phone.replace(/[^\d+]/g, '')
}

export function truncate(str: string, length: number): string {
	if (str.length <= length) return str
	return `${str.slice(0, length)}...`
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}
