import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from 'axios'

interface ApiErrorResponse {
	message: string
	errors?: Record<string, string[]>
}

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public errors?: Record<string, string[]>
	) {
		super(message)
		this.name = 'ApiError'
	}
}

function createHttpClient(): AxiosInstance {
	const client = axios.create({
		baseURL: '/api',
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	client.interceptors.request.use(
		(config) => {
			return config
		},
		(error) => Promise.reject(error)
	)

	client.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError<ApiErrorResponse>) => {
			if (error.response) {
				const { status, data } = error.response
				throw new ApiError(
					data?.message || 'Произошла ошибка',
					status,
					data?.errors
				)
			}

			if (error.request) {
				throw new ApiError('Сервер не отвечает. Проверьте соединение.', 0)
			}

			throw new ApiError('Не удалось выполнить запрос', 0)
		}
	)

	return client
}

export const httpClient = createHttpClient()

export async function apiRequest<T>(
	config: AxiosRequestConfig
): Promise<T> {
	const response = await httpClient.request<T>(config)
	return response.data
}
