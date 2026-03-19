import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store.ts'

const selectProductsState = (state: RootState) => state.products

export const selectProductsItems = createSelector(
  [selectProductsState],
  (products) => products.items
)

export const selectProductsTotal = createSelector(
  [selectProductsState],
  (products) => products.total
)

export const selectTotalPages = createSelector(
  [selectProductsState],
  (products) =>
    Math.ceil(products.total / products.itemsPerPage) || 1
)

export const selectPaginationInfo = createSelector(
  [selectProductsState, selectTotalPages],
  (products, totalPages) => ({
    currentPage: products.currentPage,
    itemsPerPage: products.itemsPerPage,
    total: products.total,
    totalPages,
  })
)

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => products.loading
)

export const selectProductsError = createSelector(
  [selectProductsState],
  (products) => products.error
)

export const selectSearchTerm = createSelector(
  [selectProductsState],
  (products) => products.searchTerm
)
