'use client'

import { useId, useState } from 'react'

import { cn } from '@/lib/utils'

export interface TabItem {
  badge?: number | string
  content: React.ReactNode
  id: string
  label: string
}

export function Tabs({ className, items }: { className?: string; items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const baseId = useId()
  const current = items.find((item) => item.id === active) ?? items[0]

  return (
    <div className={className}>
      <div
        aria-label="Seções"
        className="border-lilac-300/12 bg-ink-900/50 flex gap-1 overflow-x-auto rounded-xl border p-1"
        role="tablist"
      >
        {items.map((item) => {
          const isActive = item.id === current?.id
          return (
            <button
              aria-controls={`${baseId}-panel-${item.id}`}
              aria-selected={isActive}
              className={cn(
                'relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'bg-[linear-gradient(135deg,rgba(124,58,237,0.9),rgba(91,33,182,0.85))] text-white shadow-[0_10px_26px_-14px_rgba(124,58,237,0.95)]'
                  : 'text-lilac-200/70 hover:bg-lilac-300/8 hover:text-lilac-100',
              )}
              id={`${baseId}-tab-${item.id}`}
              key={item.id}
              onClick={() => setActive(item.id)}
              role="tab"
              type="button"
            >
              {item.label}
              {item.badge !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                    isActive ? 'bg-white/20 text-white' : 'bg-ink-700 text-lilac-200/80',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {current && (
        <div
          aria-labelledby={`${baseId}-tab-${current.id}`}
          className="animate-rise mt-4"
          id={`${baseId}-panel-${current.id}`}
          key={current.id}
          role="tabpanel"
        >
          {current.content}
        </div>
      )}
    </div>
  )
}
