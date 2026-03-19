interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = 'No data found' }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-slate-600">{message}</p>
    </div>
  )
}
