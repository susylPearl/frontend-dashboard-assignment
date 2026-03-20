import type { ReactNode } from 'react'

export interface DataTableColumn<T> {
  key: string
  /** Shown in `<th>` when `renderHeader` is not provided; keep for semantics when using `renderHeader` */
  header: string
  /** Custom header cell (e.g. label + column actions). Overrides plain `header` text. */
  renderHeader?: () => ReactNode
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
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-5 py-3 text-left text-xs font-medium tracking-wider text-slate-400 ${
                  col.renderHeader ? '' : 'uppercase'
                }`}
              >
                {col.renderHeader ? col.renderHeader() : col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="border-b border-slate-100 bg-white last:border-b-0 outline-none transition-colors hover:bg-slate-50/80"
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
