'use client'

import { cn } from '@/lib/utils'

interface TooltipProps {
  children: React.ReactNode
  className?: string
  label: string
  side?: 'bottom' | 'top'
}

export function Tooltip({ children, className, label, side = 'top' }: TooltipProps) {
  return (
    <span className={cn('group/tooltip relative inline-flex', className)}>
      {children}
      <span
        className={cn(
          'border-lilac-300/20 bg-ink-950/95 text-lilac-100 pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 scale-95 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap opacity-0 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-150 group-focus-within/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100',
          side === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]',
        )}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  )
}
