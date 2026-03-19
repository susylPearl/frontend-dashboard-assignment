import {
  SearchBar,
  DataTable,
  Pagination,
  ItemsPerPageSelect,
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

  const showTable = !error && (!loading || items.length > 0)
  const showInitialLoader = loading && items.length === 0 && !error

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-950 md:mb-8 md:text-4xl">
        Products
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8 md:gap-4">
        <div className="w-full min-w-0 max-w-[14rem] sm:max-w-xs">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search products..."
          />
        </div>
        <ItemsPerPageSelect
          aria-label="Items per page"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          options={[5, 10, 20, 30]}
        />
      </div>

      {error && !loading && (
        <ErrorState message={error} onRetry={retry} />
      )}

      {showInitialLoader && (
        <Loader message="Loading products..." />
      )}

      {showTable && (
        <>
          {items.length === 0 && !loading ? (
            <EmptyState message="No products found" />
          ) : items.length > 0 ? (
            <div
              className={`relative mb-8 ${loading ? 'opacity-70 transition-opacity' : ''}`}
            >
              {loading && (
                <p className="mb-2 text-xs text-slate-500" aria-live="polite">
                  Updating results…
                </p>
              )}
              <DataTable
                columns={PRODUCT_TABLE_COLUMNS}
                data={items}
                keyExtractor={(p) => p.id}
              />
            </div>
          ) : null}

          {totalPages > 1 && items.length > 0 && (
            <div className="mt-8 border-t border-slate-200/80 pt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
