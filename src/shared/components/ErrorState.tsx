interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

function AlertIcon() {
  return (
    <svg className="size-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
      <div className="flex gap-3">
        <AlertIcon />
        <div className="flex-1">
          <p className="text-red-700 font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
