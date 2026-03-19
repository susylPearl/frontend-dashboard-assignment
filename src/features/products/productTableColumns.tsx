import type { DataTableColumn } from '@/shared/components/DataTable.tsx'
import type { Product } from '@/types/index.ts'

export const PRODUCT_TABLE_COLUMNS: DataTableColumn<Product>[] = [
  {
    key: 'thumbnail',
    header: 'Thumbnail',
    render: (p) => (
      <img
        src={p.thumbnail}
        alt={p.title}
        className="size-14 object-cover rounded-lg aspect-square"
      />
    ),
  },
  { key: 'title', header: 'Title' },
  { key: 'price', header: 'Price', render: (p) => `$${p.price}` },
  { key: 'category', header: 'Category' },
  { key: 'brand', header: 'Brand' },
]
