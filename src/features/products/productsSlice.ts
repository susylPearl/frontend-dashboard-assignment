import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store.ts'
import type { Product, ProductsResponse } from '@/types/index.ts'
import { productsApi } from '@/services/api.ts'

export interface FetchProductsPayload {
  searchTerm?: string
  currentPage?: number
  itemsPerPage?: number
}

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  FetchProductsPayload | void,
  { state: RootState }
>(
  'products/fetchProducts',
  async (payload, { getState }) => {
    const state = getState()
    const searchTerm = payload?.searchTerm ?? state.products.searchTerm
    const currentPage = payload?.currentPage ?? state.products.currentPage
    const itemsPerPage = payload?.itemsPerPage ?? state.products.itemsPerPage
    const skip = (currentPage - 1) * itemsPerPage
    const limit = String(itemsPerPage)
    const skipStr = String(skip)

    if (searchTerm.trim()) {
      const res = await productsApi.get<ProductsResponse>(
        `/products/search?${new URLSearchParams({ q: searchTerm, limit, skip: skipStr })}`
      )
      return res.data
    }
    const res = await productsApi.get<ProductsResponse>(
      `/products?${new URLSearchParams({ limit, skip: skipStr })}`
    )
    return res.data
  }
)

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  searchTerm: string
  currentPage: number
  itemsPerPage: number
  total: number
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 10,
  total: 0,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: { payload: string }) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: { payload: number }) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: { payload: number }) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products
        state.total = action.payload.total
        state.loading = false
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error =
          (action.error as { message?: string })?.message ??
          'Failed to fetch products'
      })
  },
})

export const { setSearchTerm, setCurrentPage, setItemsPerPage } =
  productsSlice.actions
