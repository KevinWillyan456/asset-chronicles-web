'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

import { Logo } from './logo'
import { SidebarFooter, SidebarNav } from './sidebar'

interface MobileNavProps {
  onClose: () => void
  open: boolean
}

export function MobileNav({ onClose, open }: MobileNavProps) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      className={cn('fixed inset-0 z-50 lg:hidden', !open && 'pointer-events-none')}
    >
      <div
        className={cn(
          'bg-ink-950/80 absolute inset-0 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        aria-label="Menu de navegação"
        aria-modal={open ? true : undefined}
        className={cn(
          'glass-strong absolute inset-y-0 left-0 flex w-[290px] max-w-[85vw] flex-col gap-6 px-4 py-5 transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        // Only announced as a dialog while open so the closed drawer stays out
        // of the accessibility tree and the tab order.
        role={open ? 'dialog' : undefined}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard" onClick={onClose}>
            <Logo compact />
          </Link>
          <button
            aria-label="Fechar menu"
            className="border-lilac-300/15 text-lilac-200/70 hover:bg-lilac-300/10 rounded-lg border p-2 transition-colors hover:text-white"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(196,181,253,0.28),transparent)]" />
        <div className="text-lilac-200/40 px-1.5 text-[10.5px] font-medium tracking-[0.18em] uppercase">
          Navegação
        </div>
        <div className="overflow-y-auto">
          <SidebarNav onNavigate={onClose} />
        </div>
        <SidebarFooter />
      </aside>
    </div>
  )
}
