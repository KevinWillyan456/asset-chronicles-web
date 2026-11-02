'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { Tone } from '@/lib/domain'

import { cn } from '@/lib/utils'

import type { IconName } from './icon'

import { Icon } from './icon'

interface Toast {
  description?: string
  icon: IconName
  id: number
  title: string
  tone: Tone
}

interface ToastContextValue {
  info: (title: string, description?: string) => void
  push: (toast: Omit<Toast, 'id'>) => void
  success: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
}

const ToastContext = createContext<null | ToastContextValue>(null)

const tones: Record<Tone, { icon: string; ring: string }> = {
  accent: { icon: 'text-arcane-300', ring: 'border-arcane-400/40' },
  info: { icon: 'text-mystic-300', ring: 'border-mystic-400/35' },
  neutral: { icon: 'text-lilac-200', ring: 'border-lilac-300/25' },
  success: { icon: 'text-emerald-300', ring: 'border-emerald-400/35' },
  warning: { icon: 'text-amber-300', ring: 'border-amber-400/35' },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { ...toast, id }])
      setTimeout(() => remove(id), 4200)
    },
    [remove],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      info: (title, description) => push({ description, icon: 'sparkle', title, tone: 'info' }),
      push,
      success: (title, description) => push({ description, icon: 'check', title, tone: 'success' }),
      warning: (title, description) => push({ description, icon: 'alert', title, tone: 'warning' }),
    }),
    [push],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:right-4 sm:bottom-4 sm:left-auto sm:items-end sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            className={cn(
              'glass-strong animate-rise pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3',
              tones[toast.tone].ring,
            )}
            key={toast.id}
          >
            <Icon className={cn('mt-0.5', tones[toast.tone].icon)} name={toast.icon} size={18} />
            <div className="flex-1">
              <p className="text-lilac-50 text-[13px] font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-lilac-200/70 mt-0.5 text-[12px]">{toast.description}</p>
              )}
            </div>
            <button
              aria-label="Fechar notificação"
              className="text-lilac-200/60 rounded-md p-1 transition-colors hover:text-white"
              onClick={() => remove(toast.id)}
              type="button"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider')
  }
  return context
}
