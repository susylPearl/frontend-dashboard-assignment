interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      <p className="mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
        >
          Retry
        </button>
      )}
    </div>
  )
}
