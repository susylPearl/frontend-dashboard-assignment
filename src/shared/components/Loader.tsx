interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className="size-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-slate-600">{message}</p>
      </div>
    </div>
  )
}
