interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

function ChevronLeftIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

/** Page indices and ellipsis for compact numbered pagination. */
function getPageNumbers(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) {
    pages.push('ellipsis')
  }

  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  if (right < total - 1) {
    pages.push('ellipsis')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const items = getPageNumbers(currentPage, totalPages)

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-center text-sm text-slate-400 tabular-nums sm:text-left">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center justify-center gap-1 sm:justify-end">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || disabled}
          aria-label="Previous page"
          title={
            currentPage <= 1
              ? 'Already on the first page'
              : `Go to page ${currentPage - 1}`
          }
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-0.5 px-1">
          {items.map((item, idx) =>
            item === 'ellipsis' ? (
              <span
                key={`e-${idx}`}
                className="flex size-9 items-center justify-center text-sm text-slate-400"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                disabled={disabled}
                aria-label={`Page ${item}`}
                title={
                  item === currentPage
                    ? `Current page (${item} of ${totalPages})`
                    : `Go to page ${item}`
                }
                aria-current={item === currentPage ? 'page' : undefined}
                className={
                  item === currentPage
                    ? 'inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-blue-600 text-xs font-medium text-white shadow-sm tabular-nums transition-colors disabled:cursor-not-allowed'
                    : 'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-slate-600 tabular-nums transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed'
                }
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || disabled}
          aria-label="Next page"
          title={
            currentPage >= totalPages
              ? 'Already on the last page'
              : `Go to page ${currentPage + 1}`
          }
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
