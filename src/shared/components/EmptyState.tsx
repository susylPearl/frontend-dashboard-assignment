interface EmptyStateProps {
  message?: string
}

function BoxIcon() {
  return (
    <svg className="mx-auto mb-4 size-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

export function EmptyState({ message = 'No data found' }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-12 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <BoxIcon />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  )
}
