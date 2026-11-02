'use client'

import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  description?: string
  disabled?: boolean
  label?: string
  onChange: (checked: boolean) => void
}

export function Switch({ checked, description, disabled = false, label, onChange }: SwitchProps) {
  return (
    <label
      className={cn(
        'flex items-start justify-between gap-4',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      {(label || description) && (
        <span>
          {label && <span className="text-lilac-100 block text-[13px] font-medium">{label}</span>}
          {description && (
            <span className="text-lilac-200/55 mt-0.5 block text-[11.5px] leading-relaxed">
              {description}
            </span>
          )}
        </span>
      )}
      <button
        aria-checked={checked}
        aria-label={label}
        className={cn(
          'focus-visible:ring-arcane-400 focus-visible:ring-offset-ink-900 relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          checked
            ? 'border-arcane-400/60 bg-[linear-gradient(120deg,#7c3aed,#4f46e5)] shadow-[0_0_16px_-4px_rgba(139,92,246,0.9)]'
            : 'border-lilac-300/20 bg-ink-700/70',
        )}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        role="switch"
        type="button"
      >
        <span
          className={cn(
            'absolute top-0.5 size-4.5 rounded-full bg-white transition-all duration-200',
            checked ? 'left-[calc(100%-1.25rem)]' : 'left-0.5',
          )}
        />
      </button>
    </label>
  )
}
