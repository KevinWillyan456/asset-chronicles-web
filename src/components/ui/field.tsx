import { cn } from '@/lib/utils'

import { Icon } from './icon'

const controlBase =
  'w-full rounded-xl border border-lilac-300/18 bg-ink-900/60 px-3.5 text-sm text-lilac-50 placeholder:text-lilac-200/35 transition-[border-color,box-shadow,background] duration-200 hover:border-lilac-300/30 focus:border-arcane-400/70 focus:bg-ink-850/80 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.18)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-rose-400/60 aria-invalid:focus:shadow-[0_0_0_3px_rgba(244,63,94,0.2)]'

interface FieldProps {
  children: React.ReactNode
  className?: string
  error?: string
  hint?: string
  htmlFor?: string
  label?: string
  required?: boolean
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentProps<typeof Icon>['name']
}

export function Field({ children, className, error, hint, htmlFor, label, required }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          className="text-lilac-200/85 text-[12px] font-medium tracking-wide"
          htmlFor={htmlFor}
        >
          {label}
          {required && <span className="text-arcane-300 ml-1">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-[11px] text-rose-300">
          <Icon name="alert" size={12} />
          {error}
        </p>
      ) : (
        hint && <p className="text-lilac-200/50 text-[11px]">{hint}</p>
      )}
    </div>
  )
}

export function NativeSelect({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(controlBase, 'h-10 cursor-pointer appearance-none pr-9', className)}
        {...props}
      >
        {children}
      </select>
      <Icon
        className="text-lilac-200/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        name="chevronDown"
        size={16}
      />
    </div>
  )
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlBase, 'min-h-[92px] resize-y py-2.5 leading-relaxed', className)}
      {...props}
    />
  )
}

export function TextInput({ className, icon, ...props }: TextInputProps) {
  if (icon) {
    return (
      <div className="relative">
        <Icon
          className="text-lilac-200/45 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          name={icon}
          size={16}
        />
        <input className={cn(controlBase, 'h-10 pl-9', className)} {...props} />
      </div>
    )
  }
  return <input className={cn(controlBase, 'h-10', className)} {...props} />
}
