'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import type { IconName } from './icon'

import { Icon } from './icon'

export interface DropdownItem {
  description?: string
  icon?: IconName
  id: string
  label: string
  onSelect?: () => void
  tone?: 'danger' | 'default'
}

interface DropdownProps {
  align?: 'end' | 'start'
  className?: string
  items: DropdownItem[]
  label?: string
  trigger: React.ReactNode
}

export function Dropdown({
  align = 'end',
  className,
  items,
  label = 'Ações',
  trigger,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        className="inline-flex items-center"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {trigger}
      </button>

      {open && (
        <div
          className={cn(
            'animate-rise glass-strong absolute z-30 mt-2 min-w-52 overflow-hidden rounded-xl p-1.5',
            align === 'end' ? 'right-0' : 'left-0',
          )}
          role="menu"
        >
          {items.map((item) => (
            <button
              className={cn(
                'flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
                item.tone === 'danger'
                  ? 'text-rose-200 hover:bg-rose-500/15'
                  : 'text-lilac-100 hover:bg-arcane-500/16',
              )}
              key={item.id}
              onClick={() => {
                item.onSelect?.()
                setOpen(false)
              }}
              role="menuitem"
              type="button"
            >
              {item.icon && <Icon className="mt-0.5 opacity-80" name={item.icon} size={16} />}
              <span>
                <span className="block font-medium">{item.label}</span>
                {item.description && (
                  <span className="text-lilac-200/55 mt-0.5 block text-[11px]">
                    {item.description}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
