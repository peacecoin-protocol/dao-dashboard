import { TooltipComponent } from '~/components/custom/TooltipComponent'

interface InfoCellProps {
  title: string
  tooltipText: string
  value: unknown
  formatter?: (value: string | number | bigint) => string | number
  defaultValue?: string
  className?: string
}

export function InfoCell({
  title,
  tooltipText,
  value,
  formatter,
  defaultValue = '0',
  className = '',
}: InfoCellProps) {
  const displayValue =
    value !== null && value !== undefined
      ? formatter
        ? String(formatter(value as string | number | bigint))
        : String(value)
      : defaultValue

  return (
    <div className={`flex flex-row justify-between items-center ${className}`}>
      <TooltipComponent
        title={title}
        tooltipText={tooltipText}
        className="font-bold rounded-xl flex"
      />
      <div className="text-primary_blue">{displayValue}</div>
    </div>
  )
}
