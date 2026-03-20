import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue.ts'
import type { PriceSortOrder } from './productsSlice.ts'
import {
  fetchProducts,
  setCurrentPage,
  setItemsPerPage,
  setPriceSortOrder,
  setSearchTerm,
} from './productsSlice.ts'
import {
  selectPaginationInfo,
  selectPriceSortOrder,
  selectProductsError,
  selectProductsItems,
  selectProductsItemsSorted,
  selectProductsLoading,
  selectSearchTerm,
} from './productsSelectors.ts'

/** Delay after typing stops before calling the API (avoids a request per keystroke). */
const SEARCH_DEBOUNCE_MS = 350

/**
 * Encapsulates products list data flow: selectors, debounced refetch, and actions.
 * Keeps route-level UI (DataPage) focused on layout and presentation.
 */
export function useProductsListPage() {
  const dispatch = useAppDispatch()
  const rawItems = useAppSelector(selectProductsItems)
  const items = useAppSelector(selectProductsItemsSorted)
  const priceSortOrder = useAppSelector(selectPriceSortOrder)
  const loading = useAppSelector(selectProductsLoading)
  const error = useAppSelector(selectProductsError)
  const searchTerm = useAppSelector(selectSearchTerm)
  const { currentPage, itemsPerPage, totalPages } =
    useAppSelector(selectPaginationInfo)

  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    SEARCH_DEBOUNCE_MS
  )

  useEffect(() => {
    void dispatch(fetchProducts())
  }, [dispatch, debouncedSearchTerm, currentPage, itemsPerPage])

  const retry = useCallback(() => {
    void dispatch(fetchProducts())
  }, [dispatch])

  const onSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearchTerm(value))
    },
    [dispatch]
  )

  const onPageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page))
    },
    [dispatch]
  )

  const onItemsPerPageChange = useCallback(
    (count: number) => {
      dispatch(setItemsPerPage(count))
    },
    [dispatch]
  )

  const onPriceSortChange = useCallback(
    (order: PriceSortOrder) => {
      dispatch(setPriceSortOrder(order))
    },
    [dispatch]
  )

  return {
    items,
    rawItemsCount: rawItems.length,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    totalPages,
    priceSortOrder,
    onSearchChange,
    onPageChange,
    onItemsPerPageChange,
    onPriceSortChange,
    retry,
  }
}
