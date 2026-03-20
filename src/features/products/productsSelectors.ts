import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store.ts'

const selectProductsState = (state: RootState) => state.products

export const selectProductsItems = createSelector(
  [selectProductsState],
  (products) => products.items
)

export const selectPriceSortOrder = createSelector(
  [selectProductsState],
  (p) => p.priceSortOrder
)

/** Current page items, optionally sorted by price (client-side). */
export const selectProductsItemsSorted = createSelector(
  [selectProductsItems, selectPriceSortOrder],
  (items, order) => {
    const next = [...items]
    next.sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    )
    return next
  }
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
