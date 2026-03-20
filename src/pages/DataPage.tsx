import {
  SearchBar,
  DataTable,
  Pagination,
  ItemsPerPageSelect,
  PriceSortSelect,
  ProductTableSkeleton,
  Loader,
  ErrorState,
  EmptyState,
} from '@/shared/components/index.ts'
import { getProductTableColumns } from '@/features/products/productTableColumns.tsx'
import { useProductsListPage } from '@/features/products/useProductsListPage.ts'

export function DataPage() {
  const {
    items,
    rawItemsCount,
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
  } = useProductsListPage()

  const showTable = !error && (!loading || rawItemsCount > 0)
  const showInitialLoader = loading && rawItemsCount === 0 && !error
  const showRefetchSkeleton = loading && rawItemsCount > 0

  const tableColumns = getProductTableColumns({
    priceSortOrder,
    onPriceSortChange,
  })

  const priceHeaderSlot = (
    <PriceSortSelect
      value={priceSortOrder}
      onChange={onPriceSortChange}
      disabled={loading}
    />
  )

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
          {rawItemsCount === 0 && !loading ? (
            <EmptyState message="No products found" />
          ) : showRefetchSkeleton ? (
            <div className="mb-8">
              <ProductTableSkeleton
                rowCount={itemsPerPage}
                priceHeaderSlot={priceHeaderSlot}
              />
            </div>
          ) : items.length > 0 ? (
            <div className="mb-8">
              <DataTable
                columns={tableColumns}
                data={items}
                keyExtractor={(p) => p.id}
              />
            </div>
          ) : null}

          {totalPages > 1 && rawItemsCount > 0 && (
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
