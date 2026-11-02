import { cn } from '@/lib/utils'

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <table className={cn('w-full border-collapse text-left text-sm', className)}>{children}</table>
  )
}

export function TableWrap({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-lilac-300/12 bg-ink-900/40 overflow-x-auto rounded-2xl border backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={cn('divide-lilac-300/8 divide-y', className)}>{children}</tbody>
}

export function TD({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('text-lilac-100/90 px-4 py-3.5 align-middle', className)} {...props}>
      {children}
    </td>
  )
}

export function TH({
  children,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('px-4 py-3 font-medium whitespace-nowrap', className)} {...props}>
      {children}
    </th>
  )
}

export function THead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <thead
      className={cn(
        'bg-ink-800/60 text-lilac-200/60 text-[11px] tracking-wider uppercase',
        className,
      )}
    >
      {children}
    </thead>
  )
}

export function TR({
  children,
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }) {
  return (
    <tr
      className={cn(
        'transition-colors',
        interactive && 'hover:bg-arcane-500/8 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}
