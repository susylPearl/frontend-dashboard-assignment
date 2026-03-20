import type { PriceSortOrder } from '@/features/products/productsSlice.ts'

const stroke = {
  stroke: 'currentColor' as const,
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/**
 * Bars grow top → bottom + arrow up = ascending (low → high).
 * Plain glyph only (no box/shadow).
 */
function SortLowToHighIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <line x1="3" y1="6" x2="7" y2="6" {...stroke} />
      <line x1="3" y1="10" x2="9" y2="10" {...stroke} />
      <line x1="3" y1="14" x2="11" y2="14" {...stroke} />
      <line x1="3" y1="18" x2="13" y2="18" {...stroke} />
      <path d="M19 17V9M16 12l3-3 3 3" {...stroke} />
    </svg>
  )
}

/**
 * Bars shrink top → bottom + arrow down = descending (high → low).
 */
function SortHighToLowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <line x1="3" y1="6" x2="13" y2="6" {...stroke} />
      <line x1="3" y1="10" x2="11" y2="10" {...stroke} />
      <line x1="3" y1="14" x2="9" y2="14" {...stroke} />
      <line x1="3" y1="18" x2="7" y2="18" {...stroke} />
      <path d="M19 7v8M16 12l3 3 3-3" {...stroke} />
    </svg>
  )
}

interface PriceSortSelectProps {
  value: PriceSortOrder
  onChange: (value: PriceSortOrder) => void
  disabled?: boolean
}

export function PriceSortSelect({
  value,
  onChange,
  disabled = false,
}: PriceSortSelectProps) {
  const isAsc = value === 'asc'
  const label = isAsc
    ? 'Price sorted low to high. Click to sort high to low.'
    : 'Price sorted high to low. Click to sort low to high.'

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      title={label}
      onClick={() => onChange(isAsc ? 'desc' : 'asc')}
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-slate-600 transition-colors hover:bg-slate-100/90 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isAsc ? (
        <SortLowToHighIcon className="size-5 shrink-0" />
      ) : (
        <SortHighToLowIcon className="size-5 shrink-0" />
      )}
    </button>
  )
}
