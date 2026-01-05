import { describe, expect, it } from 'vitest'
import {
	getAllServices,
	getServiceBySlug,
	getServicesByAudience,
	services,
} from '../model/data'

describe('services data', () => {
	it('should have all required services', () => {
		const requiredSlugs = [
			'debt-collection',
			'contract-disputes',
			'economic-disputes',
			'civil-disputes',
		]

		for (const slug of requiredSlugs) {
			expect(services[slug]).toBeDefined()
		}
	})

	it('should have valid service structure', () => {
		for (const service of Object.values(services)) {
			expect(service.slug).toBeTruthy()
			expect(service.title).toBeTruthy()
			expect(service.shortDescription).toBeTruthy()
			expect(service.fullDescription).toBeTruthy()
			expect(service.icon).toBeTruthy()
			expect(['business', 'individual', 'both']).toContain(service.audience)
			expect(service.applicability.length).toBeGreaterThan(0)
			expect(service.whatWeDo.length).toBeGreaterThan(0)
			expect(service.documents.length).toBeGreaterThan(0)
			expect(service.timeline.min).toBeTruthy()
			expect(service.timeline.max).toBeTruthy()
			expect(service.pricing.model).toBeTruthy()
			expect(service.seo.title).toBeTruthy()
			expect(service.seo.description).toBeTruthy()
		}
	})
})

describe('getServiceBySlug', () => {
	it('should return service by slug', () => {
		const service = getServiceBySlug('debt-collection')
		expect(service).toBeDefined()
		expect(service?.slug).toBe('debt-collection')
	})

	it('should return undefined for invalid slug', () => {
		const service = getServiceBySlug('invalid-slug')
		expect(service).toBeUndefined()
	})
})

describe('getAllServices', () => {
	it('should return all services as array', () => {
		const allServices = getAllServices()
		expect(Array.isArray(allServices)).toBe(true)
		expect(allServices.length).toBe(Object.keys(services).length)
	})
})

describe('getServicesByAudience', () => {
	it('should return services for business', () => {
		const businessServices = getServicesByAudience('business')
		expect(businessServices.length).toBeGreaterThan(0)
		for (const service of businessServices) {
			expect(['business', 'both']).toContain(service.audience)
		}
	})

	it('should return services for individuals', () => {
		const individualServices = getServicesByAudience('individual')
		expect(individualServices.length).toBeGreaterThan(0)
		for (const service of individualServices) {
			expect(['individual', 'both']).toContain(service.audience)
		}
	})
})
