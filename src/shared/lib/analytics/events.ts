export type AnalyticsEvent =
	| { name: 'view_service_page'; params: { service_slug: string } }
	| { name: 'click_primary_cta'; params: { location: string } }
	| { name: 'click_secondary_cta'; params: { location: string } }
	| { name: 'click_phone'; params: { location: string } }
	| { name: 'click_messenger_tg'; params: { location: string } }
	| { name: 'click_messenger_wa'; params: { location: string } }
	| { name: 'form_submit_attempt'; params: { form_type: string } }
	| { name: 'form_submit_success'; params: { form_type: string } }
	| { name: 'form_submit_error'; params: { form_type: string; error: string } }
	| { name: 'file_attach'; params: { form_type: string; file_count: number } }

export const EventNames = {
	VIEW_SERVICE_PAGE: 'view_service_page',
	CLICK_PRIMARY_CTA: 'click_primary_cta',
	CLICK_SECONDARY_CTA: 'click_secondary_cta',
	CLICK_PHONE: 'click_phone',
	CLICK_MESSENGER_TG: 'click_messenger_tg',
	CLICK_MESSENGER_WA: 'click_messenger_wa',
	FORM_SUBMIT_ATTEMPT: 'form_submit_attempt',
	FORM_SUBMIT_SUCCESS: 'form_submit_success',
	FORM_SUBMIT_ERROR: 'form_submit_error',
	FILE_ATTACH: 'file_attach',
} as const
