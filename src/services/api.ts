import { DUMMYJSON_BASE_URL } from '@/constants/api.ts'
import { createApiClient } from './axiosFactory.ts'

export const productsApi = createApiClient({
  baseURL: DUMMYJSON_BASE_URL,
})
