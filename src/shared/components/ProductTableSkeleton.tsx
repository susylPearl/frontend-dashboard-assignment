import type { ReactNode } from 'react'

const DEFAULT_HEADERS = [
  'Thumbnail',
  'Title',
  'Price',
  'Category',
  'Brand',
] as const

interface ProductTableSkeletonProps {
  /** Match current page size so layout doesn’t jump */
  rowCount: number
  /** Match DataTable price header (label + sort control) */
  priceHeaderSlot?: ReactNode
}

function SkeletonCell({
  className = '',
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <td className={`px-5 py-4 align-middle ${className}`}>
      {children ?? <div className="skeleton-bar h-4 w-full max-w-[8rem]" />}
    </td>
  )
}

/**
 * Same shell as DataTable — used while refetching (pagination / search) so the
 * UI doesn’t show stale rows with a text banner.
 */
export function ProductTableSkeleton({ rowCount, priceHeaderSlot }: ProductTableSkeletonProps) {
  const rows = Math.max(1, Math.min(rowCount, 30))

  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white"
      aria-busy="true"
      aria-label="Loading products"
    >
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            {DEFAULT_HEADERS.map((h) => (
              <th
                key={h}
                className={`px-5 py-3 text-left text-xs font-medium tracking-wider text-slate-400 ${
                  h === 'Price' && priceHeaderSlot ? '' : 'uppercase'
                }`}
              >
                {h === 'Price' && priceHeaderSlot ? (
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wider">Price</span>
                    {priceHeaderSlot}
                  </div>
                ) : (
                  h
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, i) => (
            <tr
              key={i}
              className="border-b border-slate-100 bg-white last:border-b-0"
            >
              <SkeletonCell>
                <div className="skeleton-bar size-14 rounded-lg" />
              </SkeletonCell>
              <SkeletonCell>
                <div className="skeleton-bar h-4 w-[min(100%,14rem)]" />
              </SkeletonCell>
              <SkeletonCell>
                <div className="skeleton-bar h-4 w-16" />
              </SkeletonCell>
              <SkeletonCell>
                <div className="skeleton-bar h-6 w-20 rounded-full" />
              </SkeletonCell>
              <SkeletonCell>
                <div className="skeleton-bar h-4 w-24" />
              </SkeletonCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
