interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Merged with default width/focus styles (e.g. from parent flex layout). */
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  className = '',
}: SearchBarProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition-shadow placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50 disabled:opacity-50 ${className}`}
    />
  )
}
