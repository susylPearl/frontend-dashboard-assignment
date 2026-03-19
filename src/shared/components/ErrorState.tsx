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
    <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
      <div className="flex gap-3">
        <AlertIcon />
        <div className="flex-1">
          <p className="text-red-700 font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
