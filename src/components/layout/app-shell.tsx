'use client'

import { useState } from 'react'

import { ToastProvider } from '@/components/ui/toast'

import { Header } from './header'
import { MobileNav } from './mobile-nav'
import { Sidebar } from './sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav onClose={() => setMenuOpen(false)} open={menuOpen} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onOpenMenu={() => setMenuOpen(true)} />
          <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-[1400px] px-4 pb-6 lg:px-8">
            <div className="border-lilac-300/10 text-lilac-200/40 flex flex-col items-center justify-between gap-2 border-t pt-4 text-[11px] sm:flex-row">
              <span>Asset Chronicles — protótipo de interface com dados fictícios.</span>
              <span className="flex items-center gap-1.5">
                <span className="bg-gilt-400/80 size-1.5 rounded-full" />
                Nenhum dado real é armazenado.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  )
}
