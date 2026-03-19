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
    <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
      <table className="min-w-[600px] w-full">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="bg-white transition-colors hover:bg-slate-50/80"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 align-middle text-sm">
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
