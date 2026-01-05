import { siteConfig } from '@/shared/config'

export interface BreadcrumbItem {
	name: string
	url: string
}

export function generateOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LegalService',
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		telephone: siteConfig.contact.phone,
		email: siteConfig.contact.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: siteConfig.contact.address,
			addressCountry: 'RU',
		},
		openingHours: siteConfig.contact.workingHours,
		sameAs: [siteConfig.social.telegram],
		areaServed: {
			'@type': 'Country',
			name: 'Russia',
		},
		serviceType: [
			'Экономические споры',
			'Гражданские споры',
			'Взыскание задолженности',
			'Договорные споры',
			'Представительство в суде',
		],
	}
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: `${siteConfig.url}${item.url}`,
		})),
	}
}

export interface FAQItem {
	question: string
	answer: string
}

export function generateFAQSchema(items: FAQItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	}
}

export function generateServiceSchema(service: {
	name: string
	description: string
	url: string
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: service.name,
		provider: {
			'@type': 'LegalService',
			name: siteConfig.name,
			url: siteConfig.url,
		},
		description: service.description,
		url: `${siteConfig.url}${service.url}`,
		areaServed: {
			'@type': 'Country',
			name: 'Russia',
		},
	}
}
