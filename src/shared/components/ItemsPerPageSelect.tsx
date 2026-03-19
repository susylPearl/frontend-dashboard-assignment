interface ItemsPerPageSelectProps {
  value: number
  onChange: (value: number) => void
  options: number[]
  disabled?: boolean
  'aria-label'?: string
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}

/**
 * Native select with consistent chevron placement (ss1-style).
 */
export function ItemsPerPageSelect({
  value,
  onChange,
  options,
  disabled = false,
  'aria-label': ariaLabel,
}: ItemsPerPageSelectProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <select
        aria-label={ariaLabel}
        title={ariaLabel}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 min-w-[3.25rem] cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-0 pl-2.5 pr-7 text-center text-sm font-medium tabular-nums text-neutral-900 shadow-sm transition-colors hover:border-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-1.5 top-1/2 size-3.5 -translate-y-1/2 text-neutral-900" />
    </div>
  )
}
