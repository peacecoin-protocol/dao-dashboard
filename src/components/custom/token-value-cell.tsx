import { TableCell } from '~/components/ui/table'
import { FormattedValue } from './formatted-value'

interface TokenValueCellProps {
  value: string | number | bigint | undefined | null
  formatter?: (value: string | number | bigint) => string
  tokenSymbol?: string
  className?: string
}

export function TokenValueCell({
  value,
  formatter,
  tokenSymbol,
  className = 'font-bold font-md text-primary_blue',
}: TokenValueCellProps) {
  return (
    <TableCell className={className}>
      <FormattedValue value={value} formatter={formatter} inline />
      {tokenSymbol && <> {tokenSymbol}</>}
    </TableCell>
  )
}
