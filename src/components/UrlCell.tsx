import type { DefaultCellComponentProps } from 'payload'

import Link from 'next/link'

export const UrlCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const breadcrumbs: {
    id: string
    label: string
    url: string
  }[] = (rowData.breadcrumbs || []).filter((item: any) => Boolean(item.id)).reverse()

  return (
    <div>
      {breadcrumbs.map((b, index) => (
        <span key={b.id}>
          <Link href={`/admin/collections/${b.id}`}>{b.label}</Link>
          {index < breadcrumbs.length - 1 && <span> / </span>}
        </span>
      ))}
    </div>
  )
}
