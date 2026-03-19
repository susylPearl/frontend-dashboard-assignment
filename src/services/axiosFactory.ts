import axios, { type AxiosInstance, type AxiosError } from 'axios'

const DEFAULT_TIMEOUT = 10000
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

/**
 * Adds a response interceptor that normalizes API errors.
 * On 4xx/5xx responses, extracts a user-friendly message and rejects with a plain Error.
 * Message priority: response.data.message > response.data.error > error.message > fallback
 */
function addErrorInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; error?: string }>) => {
      const message =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message ??
        'An unexpected error occurred'
      return Promise.reject(new Error(message))
    }
  )
}

export interface CreateAxiosConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export function createApiClient(config: CreateAxiosConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: { ...DEFAULT_HEADERS, ...config.headers },
  })

  addErrorInterceptor(instance)

  return instance
}
