import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import {
  fetchProducts,
  setSearchTerm,
  setCurrentPage,
  setItemsPerPage,
} from '@/features/products/productsSlice.ts'
import {
  selectProductsItems,
  selectProductsLoading,
  selectProductsError,
  selectSearchTerm,
  selectPaginationInfo,
} from '../features/products/productsSelectors.ts'
import {
  SearchBar,
  DataTable,
  type DataTableColumn,
  Pagination,
  Loader,
  ErrorState,
  EmptyState,
} from '../shared/components/index.ts'
import { useDebouncedValue } from '../shared/hooks/useDebouncedValue.ts'
import type { Product } from '../types/index.ts'

const PRODUCT_COLUMNS: DataTableColumn<Product>[] = [
  {
    key: 'thumbnail',
    header: 'Thumbnail',
    render: (p: Product) => (
      <img
        src={p.thumbnail}
        alt={p.title}
        className="size-14 object-cover rounded-lg aspect-square"
      />
    ),
  },
  { key: 'title', header: 'Title' },
  { key: 'price', header: 'Price', render: (p: Product) => `$${p.price}` },
  { key: 'category', header: 'Category' },
  { key: 'brand', header: 'Brand' },
]

export function DataPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectProductsItems)
  const loading = useAppSelector(selectProductsLoading)
  const error = useAppSelector(selectProductsError)
  const searchTerm = useAppSelector(selectSearchTerm)
  const { currentPage, itemsPerPage, totalPages } =
    useAppSelector(selectPaginationInfo)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)

  useEffect(() => {
    void dispatch(fetchProducts())
  }, [dispatch, debouncedSearchTerm, currentPage, itemsPerPage])

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">
        Products
      </h1>

      <div className="mb-6 md:mb-8 flex flex-wrap gap-4 md:gap-6 items-center">
        <SearchBar
          value={searchTerm}
          onChange={(v: string) => dispatch(setSearchTerm(v))}
          placeholder="Search products..."
          disabled={loading}
        />
        <select
          value={itemsPerPage}
          onChange={(e) =>
            dispatch(setItemsPerPage(Number(e.target.value)))
          }
          disabled={loading}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 hover:border-slate-400 transition-colors"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>

      {error && (
        <ErrorState
          message={error}
          onRetry={() => void dispatch(fetchProducts())}
        />
      )}

      {loading ? (
        <Loader message="Loading products..." />
      ) : (
        <>
          {items.length === 0 ? (
            <EmptyState message="No products found" />
          ) : (
            <div className="mb-8">
              <DataTable
                columns={PRODUCT_COLUMNS}
                data={items}
                keyExtractor={(p: Product) => p.id}
              />
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => dispatch(setCurrentPage(page))}
                disabled={loading}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
