import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('skeleton block rounded-md', className)} />
}

export function Spinner({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <span
      aria-label="Carregando"
      className={cn(
        'animate-spin-slow border-arcane-300/30 border-t-arcane-300 inline-block rounded-full border-2',
        className,
      )}
      role="status"
      style={{ height: size, width: size }}
    />
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          className="border-lilac-300/10 bg-ink-900/30 flex items-center gap-4 rounded-xl border p-3.5"
          key={index}
        >
          <Skeleton className="size-9 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-2.5 w-1/5" />
          </div>
          <Skeleton className="hidden h-3 w-24 sm:block" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  )
}
