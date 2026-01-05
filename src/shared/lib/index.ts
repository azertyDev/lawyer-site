export { cn, formatPhone, cleanPhone, truncate, slugify } from './utils'
export { httpClient, apiRequest, ApiError } from './http'
export { analytics, EventNames, type AnalyticsEvent } from './analytics'
export {
	generateOrganizationSchema,
	generateBreadcrumbSchema,
	generateFAQSchema,
	generateServiceSchema,
	type BreadcrumbItem,
	type FAQItem,
} from './seo'
export {
	generateAntispamFields,
	validateAntispam,
	verifyTurnstile,
	TIMESTAMP_FIELD,
	HONEYPOT_FIELD,
} from './antispam'
