interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className="size-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600"
          role="status"
          aria-label="Loading"
        />
        <p className="text-slate-600 text-sm">{message}</p>
      </div>
    </div>
  )
}
