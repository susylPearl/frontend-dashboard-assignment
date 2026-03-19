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
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="min-w-[600px] w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-4 text-left text-sm font-semibold text-slate-800"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((item, i) => (
            <tr
              key={keyExtractor(item)}
              className={`transition-colors ${
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              } hover:bg-slate-100`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-5 py-4 text-sm text-slate-800"
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
