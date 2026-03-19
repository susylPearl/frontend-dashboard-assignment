import type { DataTableColumn } from '@/shared/components/DataTable.tsx'
import type { Product } from '@/types/index.ts'

export const PRODUCT_TABLE_COLUMNS: DataTableColumn<Product>[] = [
  {
    key: 'thumbnail',
    header: 'Thumbnail',
    render: (p) => (
      <div className="inline-flex size-14 items-center justify-center rounded-lg bg-slate-100 p-1">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="size-full rounded-md object-cover"
        />
      </div>
    ),
  },
  {
    key: 'title',
    header: 'Title',
    render: (p) => (
      <span className="font-normal text-slate-900">{p.title}</span>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    render: (p) => (
      <span className="font-semibold text-slate-900">${p.price}</span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: (p) => (
      <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium capitalize text-sky-800">
        {p.category}
      </span>
    ),
  },
  {
    key: 'brand',
    header: 'Brand',
    render: (p) => (
      <span className="text-slate-500">{p.brand}</span>
    ),
  },
]
