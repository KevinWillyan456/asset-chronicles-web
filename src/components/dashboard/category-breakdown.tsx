import type { Asset } from '@/types'

import { AssetVisual } from '@/components/assets/asset-visual'
import { categories } from '@/data/mock'
import { formatCompactCurrency } from '@/lib/utils'

interface CategoryBreakdownProps {
  assets: Asset[]
}

export function CategoryBreakdown({ assets }: CategoryBreakdownProps) {
  const total = assets.length || 1

  const rows = categories
    .map((category) => {
      const items = assets.filter((asset) => asset.categoryId === category.id)
      const value = items.reduce((sum, asset) => sum + asset.value, 0)
      return { category, count: items.length, value }
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count)

  return (
    <ul className="flex flex-col gap-4 px-5 pb-5">
      {rows.map(({ category, count, value }) => {
        const percentage = Math.round((count / total) * 100)
        return (
          <li className="flex items-center gap-3" key={category.id}>
            <AssetVisual category={category} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-lilac-100 text-[13px] font-medium">{category.name}</span>
                <span className="text-lilac-200/55 text-[11.5px]">
                  {count} {count === 1 ? 'item' : 'itens'} · {formatCompactCurrency(value)}
                </span>
              </div>
              <div className="bg-ink-700/70 mt-1.5 h-1.5 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#7c3aed,#4f46e5_60%,#e4c476)] shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                  style={{ width: `${Math.max(percentage, 6)}%` }}
                />
              </div>
            </div>
            <span className="text-lilac-200/60 w-9 shrink-0 text-right font-mono text-[11.5px]">
              {percentage}%
            </span>
          </li>
        )
      })}
    </ul>
  )
}
