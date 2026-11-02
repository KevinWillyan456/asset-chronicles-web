import { cn } from '@/lib/utils'

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className="drop-shadow-[0_0_14px_rgba(139,92,246,0.5)]" size={compact ? 34 : 38} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lilac-50 text-[15px] font-semibold tracking-[0.14em] uppercase">
          Asset
        </span>
        <span className="font-display text-gilt-300 text-[15px] font-semibold tracking-[0.14em] uppercase">
          Chronicles
        </span>
      </span>
    </span>
  )
}

export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      focusable="false"
      height={size}
      viewBox="0 0 48 48"
      width={size}
    >
      <defs>
        <linearGradient id="ac-sigil" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="45%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="ac-gilt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f7ecc9" />
          <stop offset="100%" stopColor="#d1a94a" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 41 13.2v21.6L24 45 7 34.8V13.2z"
        fill="url(#ac-sigil)"
        fillOpacity="0.16"
        stroke="url(#ac-sigil)"
        strokeWidth="1.6"
      />
      <path
        d="M24 10.5 34.5 17v13L24 36.5 13.5 30V17z"
        fill="none"
        opacity="0.7"
        stroke="url(#ac-gilt)"
        strokeWidth="1.1"
      />
      <path d="M24 15.5 24 31.5" stroke="url(#ac-gilt)" strokeLinecap="round" strokeWidth="1.4" />
      <path
        d="M18 21.5 24 15.5l6 6"
        fill="none"
        stroke="url(#ac-gilt)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <circle cx="24" cy="24" fill="#f7ecc9" r="2.1" />
    </svg>
  )
}
