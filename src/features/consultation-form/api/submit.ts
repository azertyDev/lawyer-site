import { apiRequest } from '@/shared/lib'
import type { ConsultationFormData } from '../model/schema'

export interface ConsultationSubmitResponse {
	success: boolean
	message: string
}

export async function submitConsultationForm(
	data: ConsultationFormData
): Promise<ConsultationSubmitResponse> {
	return apiRequest<ConsultationSubmitResponse>({
		method: 'POST',
		url: '/lead/consultation',
		data,
	})
}
