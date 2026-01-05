export interface Service {
	slug: string
	title: string
	shortDescription: string
	fullDescription: string
	icon: string
	audience: 'business' | 'individual' | 'both'
	applicability: string[]
	whatWeDo: string[]
	documents: string[]
	timeline: {
		min: string
		max: string
		factors: string[]
	}
	pricing: {
		model: string
		description: string
		factors: string[]
	}
	faq: ServiceFAQ[]
	seo: {
		title: string
		description: string
		keywords: string[]
	}
}

export interface ServiceFAQ {
	question: string
	answer: string
}

export interface ServiceCategory {
	slug: string
	title: string
	description: string
	services: string[]
}
