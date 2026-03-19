import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue.ts'
import {
  fetchProducts,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
} from './productsSlice.ts'
import {
  selectPaginationInfo,
  selectProductsError,
  selectProductsItems,
  selectProductsLoading,
  selectSearchTerm,
} from './productsSelectors.ts'

const SEARCH_DEBOUNCE_MS = 300

/**
 * Encapsulates products list data flow: selectors, debounced refetch, and actions.
 * Keeps route-level UI (DataPage) focused on layout and presentation.
 */
export function useProductsListPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectProductsItems)
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

  return {
    items,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    totalPages,
    onSearchChange: (value: string) => {
      dispatch(setSearchTerm(value))
    },
    onPageChange: (page: number) => {
      dispatch(setCurrentPage(page))
    },
    onItemsPerPageChange: (count: number) => {
      dispatch(setItemsPerPage(count))
    },
    retry,
  }
}
