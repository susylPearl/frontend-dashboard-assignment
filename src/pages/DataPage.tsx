import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import {
  fetchProducts,
  setSearchTerm,
  setCurrentPage,
  setItemsPerPage,
} from '@/features/products/productsSlice.ts'

export function DataPage() {
  const dispatch = useAppDispatch()
  const {
    items,
    loading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    total,
  } = useAppSelector((state) => state.products)

  useEffect(() => {
    void dispatch(fetchProducts())
  }, [dispatch, searchTerm, currentPage, itemsPerPage])

  const totalPages = Math.ceil(total / itemsPerPage) || 1

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Products</h1>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <select
          value={itemsPerPage}
          onChange={(e) =>
            dispatch(setItemsPerPage(Number(e.target.value)))
          }
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-600">Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-slate-800 truncate">
                  {product.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-slate-800 font-bold mt-2">${product.price}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex gap-2 items-center">
              <button
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                disabled={currentPage <= 1}
                className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Previous
              </button>
              <span className="text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
