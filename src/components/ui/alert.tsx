'use client'

import { useState } from 'react'

import type { Tone } from '@/lib/domain'

import { cn } from '@/lib/utils'

import type { IconName } from './icon'

import { Icon } from './icon'

const styles: Record<Tone, { icon: string; name: IconName; wrap: string }> = {
  accent: {
    icon: 'text-arcane-300',
    name: 'sparkle',
    wrap: 'border-arcane-400/32 bg-arcane-500/10 text-arcane-100',
  },
  info: {
    icon: 'text-mystic-300',
    name: 'sparkle',
    wrap: 'border-mystic-400/30 bg-mystic-400/8 text-mystic-300',
  },
  neutral: {
    icon: 'text-lilac-200',
    name: 'history',
    wrap: 'border-lilac-300/20 bg-lilac-300/6 text-lilac-100',
  },
  success: {
    icon: 'text-emerald-300',
    name: 'check',
    wrap: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-100',
  },
  warning: {
    icon: 'text-amber-300',
    name: 'alert',
    wrap: 'border-amber-400/30 bg-amber-400/8 text-amber-100',
  },
}

interface AlertProps {
  children: React.ReactNode
  className?: string
  dismissible?: boolean
  icon?: IconName
  title?: string
  tone?: Tone
}

export function Alert({
  children,
  className,
  dismissible = false,
  icon,
  title,
  tone = 'info',
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  const style = styles[tone]
  return (
    <div
      className={cn(
        'animate-rise flex items-start gap-3 rounded-xl border px-4 py-3 text-[13px] leading-relaxed',
        style.wrap,
        className,
      )}
      role="status"
    >
      <Icon className={cn('mt-0.5', style.icon)} name={icon ?? style.name} size={17} />
      <div className="flex-1">
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        <div className="text-current/85">{children}</div>
      </div>
      {dismissible && (
        <button
          aria-label="Dispensar aviso"
          className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
          onClick={() => setVisible(false)}
          type="button"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  )
}
