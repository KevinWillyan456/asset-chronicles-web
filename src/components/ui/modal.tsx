'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

import { Icon } from './icon'

interface ModalProps {
  children: React.ReactNode
  description?: string
  footer?: React.ReactNode
  icon?: React.ComponentProps<typeof Icon>['name']
  onClose: () => void
  open: boolean
  size?: 'lg' | 'md' | 'sm'
  title?: string
}

const sizes = {
  lg: 'max-w-3xl',
  md: 'max-w-xl',
  sm: 'max-w-md',
}

export function Modal({
  children,
  description,
  footer,
  icon,
  onClose,
  open,
  size = 'md',
  title,
}: ModalProps) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  // `document` only exists in the browser; modals are always opened through
  // user interaction, so the server never renders an open dialog.
  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        className="animate-fade bg-ink-950/75 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        aria-label={title}
        aria-modal="true"
        className={cn(
          'glass-strong animate-rise relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl',
          sizes[size],
        )}
        role="dialog"
      >
        <div className="ornament-edge border-lilac-300/12 flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="flex items-start gap-3">
            {icon && (
              <span className="border-arcane-400/35 bg-arcane-500/15 text-arcane-200 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border">
                <Icon name={icon} size={18} />
              </span>
            )}
            <div>
              {title && (
                <h2 className="font-display text-lilac-50 text-base font-semibold tracking-wide">
                  {title}
                </h2>
              )}
              {description && <p className="text-lilac-200/70 mt-0.5 text-[13px]">{description}</p>}
            </div>
          </div>
          <button
            aria-label="Fechar"
            className="text-lilac-200/60 hover:bg-lilac-300/10 rounded-lg p-1.5 transition-colors hover:text-white"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="border-lilac-300/12 bg-ink-950/40 flex flex-wrap items-center justify-end gap-2.5 border-t px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
