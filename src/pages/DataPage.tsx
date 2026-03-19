import {
  SearchBar,
  DataTable,
  Pagination,
  Loader,
  ErrorState,
  EmptyState,
} from '@/shared/components/index.ts'
import { PRODUCT_TABLE_COLUMNS } from '@/features/products/productTableColumns.tsx'
import { useProductsListPage } from '@/features/products/useProductsListPage.ts'
export function DataPage() {
  const {
    items,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    totalPages,
    onSearchChange,
    onPageChange,
    onItemsPerPageChange,
    retry,
  } = useProductsListPage()

  const showResults = !loading && !error

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 md:mb-8 md:text-3xl">
        Products
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8 md:gap-4">
        <div className="w-full min-w-0 max-w-sm">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search products..."
            disabled={loading}
          />
        </div>
        <select
          aria-label="Items per page"
          title="Items per page"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          disabled={loading}
          className="h-8 min-w-[2.75rem] shrink-0 rounded-md border border-slate-300 bg-white px-1 py-0 text-center text-sm font-medium tabular-nums text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/40 disabled:opacity-50"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      {error && !loading && (
        <ErrorState message={error} onRetry={retry} />
      )}

      {loading && <Loader message="Loading products..." />}

      {showResults && (
        <>
          {items.length === 0 ? (
            <EmptyState message="No products found" />
          ) : (
            <div className="mb-8">
              <DataTable
                columns={PRODUCT_TABLE_COLUMNS}
                data={items}
                keyExtractor={(p) => p.id}
              />
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                disabled={loading}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
