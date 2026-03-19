import type { ReactNode } from 'react'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-medium text-slate-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm text-slate-800"
                >
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
