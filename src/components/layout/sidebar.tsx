'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icon } from '@/components/ui/icon'
import { isActivePath, navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { Logo } from './logo'

export function Sidebar() {
  return (
    <aside className="relative hidden w-[272px] shrink-0 lg:block">
      <div className="glass fixed top-0 left-0 flex h-screen w-[272px] flex-col gap-6 overflow-y-auto border-y-0 border-l-0 px-4 py-5">
        <Link className="px-1.5" href="/dashboard">
          <Logo />
        </Link>
        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(196,181,253,0.28),transparent)]" />
        <div className="text-lilac-200/40 px-1.5 text-[10.5px] font-medium tracking-[0.18em] uppercase">
          Navegação
        </div>
        <SidebarNav />
        <SidebarFooter />
      </div>
    </aside>
  )
}

export function SidebarFooter() {
  return (
    <div className="mt-auto flex flex-col gap-3">
      <div className="border-lilac-300/12 bg-ink-800/50 flex items-center gap-3 rounded-xl border px-3 py-2.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#4f46e5)] text-[11px] font-semibold text-white">
          AC
        </span>
        <span className="flex-1">
          <span className="text-lilac-50 block text-[12.5px] font-medium">Aria Corvina</span>
          <span className="text-lilac-200/50 block text-[11px]">Administradora do acervo</span>
        </span>
        <Icon className="text-gilt-400" name="shield" size={15} />
      </div>
      <p className="text-lilac-200/35 px-1 text-[10.5px] leading-relaxed">
        Asset Chronicles · v0.9 protótipo visual
      </p>
    </div>
  )
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Navegação principal" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href)
        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
              active
                ? 'text-lilac-50 bg-[linear-gradient(100deg,rgba(124,58,237,0.28),rgba(79,70,229,0.12))] shadow-[inset_0_0_0_1px_rgba(196,181,253,0.22),0_14px_30px_-20px_rgba(124,58,237,0.9)]'
                : 'text-lilac-200/70 hover:bg-lilac-300/8 hover:text-lilac-50',
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -left-px h-6 w-[3px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#f0dca4,#d1a94a)] shadow-[0_0_12px_rgba(240,220,164,0.85)]"
              />
            )}
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-lg border transition-colors',
                active
                  ? 'border-arcane-400/45 bg-arcane-500/20 text-arcane-100'
                  : 'border-lilac-300/12 bg-ink-800/60 text-lilac-200/70 group-hover:border-lilac-300/25 group-hover:text-lilac-100',
              )}
            >
              <Icon name={item.icon} size={17} />
            </span>
            <span className="flex flex-col">
              <span className="text-[13.5px] font-medium tracking-wide">{item.label}</span>
              <span className="text-lilac-200/45 text-[11px]">{item.description}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
