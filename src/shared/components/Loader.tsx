interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div
        className="size-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"
        role="status"
        aria-label="Loading"
      />
      <p className="text-slate-600">{message}</p>
    </div>
  )
}
