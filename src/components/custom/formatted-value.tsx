import { formatString } from '~/components/utils'

interface FormattedValueProps {
  value: string | number | bigint | undefined | null
  formatter?: (value: string | number | bigint) => string
  fallback?: string
  className?: string
  inline?: boolean
}

export function FormattedValue({
  value,
  formatter,
  fallback = '0',
  className = 'text-primary_blue',
  inline = false,
}: FormattedValueProps) {
  if (!value) {
    return inline ? (
      <>{fallback}</>
    ) : (
      <div className={className}>{fallback}</div>
    )
  }

  let formattedValue: string
  if (formatter) {
    formattedValue = formatter(value)
  } else {
    formattedValue = value.toString()
  }

  const formatted = formatString(formattedValue)
  return inline ? (
    <>{formatted}</>
  ) : (
    <div className={className}>{formatted}</div>
  )
}
