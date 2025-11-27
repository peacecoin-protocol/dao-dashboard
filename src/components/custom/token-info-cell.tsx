import { ReactNode } from 'react'

interface TokenInfoCellProps {
  label: string
  value: ReactNode
  className?: string
  valueClassName?: string
}

export function TokenInfoCell({
  label,
  value,
  className,
  valueClassName,
}: TokenInfoCellProps) {
  const containerClassName = `flex items-center gap-2${className ? ` ${className}` : ''}`
  const valueClasses = `text-sm text-muted-foreground${
    valueClassName ? ` ${valueClassName}` : ''
  }`

  return (
    <div className={containerClassName}>
      <div className="text-xs font-bold text-foreground uppercase tracking-wide">
        {label}:
      </div>
      <div className={valueClasses}>{value}</div>
    </div>
  )
}
