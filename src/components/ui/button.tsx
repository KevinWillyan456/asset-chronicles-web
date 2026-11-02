import Link from 'next/link'

import { cn } from '@/lib/utils'

import type { IconName } from './icon'

import { Icon } from './icon'

export type ButtonSize = 'icon' | 'lg' | 'md' | 'sm'
export type ButtonVariant = 'danger' | 'ghost' | 'gold' | 'outline' | 'primary' | 'secondary'

const variants: Record<ButtonVariant, string> = {
  danger:
    'text-rose-100 bg-rose-600/85 border border-rose-400/45 hover:bg-rose-600 active:bg-rose-700',
  ghost:
    'text-lilac-200 bg-transparent border border-transparent hover:bg-lilac-300/10 hover:text-white active:bg-lilac-300/16',
  gold: 'text-ink-900 bg-[linear-gradient(135deg,#f0dca4_0%,#d1a94a_100%)] border border-gilt-200/50 shadow-[0_10px_28px_-14px_rgba(209,169,74,0.95)] hover:brightness-105 active:brightness-95',
  outline:
    'text-arcane-200 bg-transparent border border-arcane-400/45 hover:bg-arcane-500/12 hover:border-arcane-300/70 active:bg-arcane-500/20',
  primary:
    'text-white bg-[linear-gradient(135deg,#7c3aed_0%,#5b21b6_100%)] border border-arcane-400/40 shadow-[0_10px_30px_-12px_rgba(124,58,237,0.9)] hover:brightness-115 hover:border-arcane-300/60 active:brightness-95',
  secondary:
    'text-lilac-100 bg-ink-700/70 border border-lilac-300/20 hover:bg-ink-600/80 hover:border-lilac-300/35 active:bg-ink-700',
}

const sizes: Record<ButtonSize, string> = {
  icon: 'h-10 w-10 justify-center rounded-xl',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
}

const base =
  'inline-flex items-center font-medium whitespace-nowrap transition-[background,box-shadow,border-color,filter,transform] duration-200'
const focus =
  'focus-visible:ring-2 focus-visible:ring-arcane-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 focus-visible:outline-none'
const disabledState =
  'disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:brightness-100'

interface ButtonLinkProps extends Omit<React.ComponentProps<typeof Link>, 'className'> {
  className?: string
  fullWidth?: boolean
  icon?: IconName
  iconRight?: IconName
  size?: ButtonSize
  variant?: ButtonVariant
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
  icon?: IconName
  iconRight?: IconName
  loading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  icon,
  iconRight,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const iconSize = iconSizeFor(size)

  return (
    <button
      className={buttonClasses({ className, fullWidth, size, variant })}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="animate-spin-slow size-4 rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon && <Icon name={icon} size={iconSize} />
      )}
      {children}
      {iconRight && !loading && <Icon name={iconRight} size={iconSize} />}
    </button>
  )
}

export function buttonClasses({
  className,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
}: {
  className?: string
  fullWidth?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
} = {}): string {
  return cn(
    base,
    focus,
    disabledState,
    'active:translate-y-px',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )
}

export function ButtonLink({
  children,
  className,
  fullWidth = false,
  icon,
  iconRight,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const iconSize = iconSizeFor(size)

  return (
    <Link className={buttonClasses({ className, fullWidth, size, variant })} {...props}>
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </Link>
  )
}

function iconSizeFor(size: ButtonSize): number {
  return size === 'sm' ? 15 : size === 'lg' ? 20 : 17
}
