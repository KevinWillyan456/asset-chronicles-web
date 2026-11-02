import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div' | 'li' | 'section'
  edge?: boolean
  interactive?: boolean
  variant?: 'default' | 'strong'
}

export function Card({
  as = 'div',
  children,
  className,
  edge = false,
  interactive = false,
  variant = 'default',
  ...props
}: CardProps) {
  const Tag = as as React.ElementType
  return (
    <Tag
      className={cn(
        variant === 'strong' ? 'glass-strong' : 'glass',
        'rounded-2xl',
        edge && 'ornament-edge',
        interactive &&
          'hover:border-lilac-300/35 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-30px_rgba(124,58,237,0.7)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 pt-1 pb-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-lilac-200/70 mt-1 text-[13px] leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-lilac-300/10 flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-wrap items-start justify-between gap-3 px-5 pt-5 pb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-display text-lilac-50 text-[15px] font-semibold tracking-wide',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function SectionHeading({
  action,
  className,
  description,
  icon,
  title,
}: {
  action?: React.ReactNode
  className?: string
  description?: string
  icon?: React.ReactNode
  title: string
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div>
        <h2 className="font-display text-lilac-50 flex items-center gap-2.5 text-lg font-semibold tracking-wide">
          {icon && <span className="text-arcane-300">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-lilac-200/70 mt-1 max-w-2xl text-sm">{description}</p>}
      </div>
      {action}
    </div>
  )
}
