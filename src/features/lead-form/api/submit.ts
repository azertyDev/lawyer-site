import { apiRequest } from '@/shared/lib'
import type { LeadFormData } from '../model/schema'

export interface LeadSubmitResponse {
	success: boolean
	message: string
}

export async function submitLeadForm(
	data: LeadFormData
): Promise<LeadSubmitResponse> {
	return apiRequest<LeadSubmitResponse>({
		method: 'POST',
		url: '/lead',
		data,
	})
}
