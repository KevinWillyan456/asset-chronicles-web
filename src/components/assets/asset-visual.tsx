import type { Category } from '@/types'

import { Icon } from '@/components/ui/icon'
import { categoryIcon } from '@/lib/domain'
import { cn } from '@/lib/utils'

const accents: Record<string, string> = {
  'cat-eletronicos': 'text-amber-200 border-amber-300/30 bg-amber-400/10',
  'cat-equipamentos': 'text-arcane-200 border-arcane-400/35 bg-arcane-500/14',
  'cat-informatica': 'text-mystic-300 border-mystic-400/35 bg-mystic-400/12',
  'cat-mobiliario': 'text-emerald-200 border-emerald-300/30 bg-emerald-400/10',
  'cat-outros': 'text-lilac-200 border-lilac-300/25 bg-lilac-300/10',
  'cat-veiculos': 'text-rose-200 border-rose-300/30 bg-rose-400/10',
}

interface AssetVisualProps {
  category?: Category
  className?: string
  size?: 'lg' | 'md' | 'sm'
}

export function AssetVisual({ category, className, size = 'md' }: AssetVisualProps) {
  const box =
    size === 'lg'
      ? 'size-12 rounded-2xl'
      : size === 'sm'
        ? 'size-8 rounded-lg'
        : 'size-9.5 rounded-xl'
  const iconSize = size === 'lg' ? 22 : size === 'sm' ? 15 : 18
  const accent = category ? (accents[category.id] ?? accents['cat-outros']) : accents['cat-outros']

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
        box,
        accent,
        className,
      )}
    >
      <Icon name={categoryIcon(category?.icon ?? 'spark')} size={iconSize} />
    </span>
  )
}
