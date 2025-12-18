import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'

export interface AmountInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setStakingAmount: (amount: string) => void
  handleStake: () => void
  maxAmount: number
  localDict: any
  asChild?: boolean
}

const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      setStakingAmount,
      handleStake,
      maxAmount,
      className,
      localDict,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [amount, setAmount] = React.useState('')
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className}>{localDict.stake ?? 'Stake'}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>{localDict.enterAmount ?? 'Enter Amount'}</DialogTitle>
            <DialogDescription>
              {localDict.enterTheAmountOfTokensYouWantToStake ??
                'Enter the amount of tokens you want to stake.'}
            </DialogDescription>
            <Input
              type="number"
              min="0"
              step="0.1"
              placeholder="0.00"
              className="w-full"
              onChange={(e) => {
                const newValue = e.target.value
                if (Number(newValue) < 0) {
                  e.target.value = '0'
                  return
                }
                setAmount(newValue)
                setStakingAmount(newValue)
              }}
            ></Input>
            {amount === '0' && (
              <h1 className="text-sm text-red-500 text-right">
                Amount should be greater than 0.
              </h1>
            )}

            {Number(amount) > maxAmount && (
              <h1 className="text-sm text-red-500 text-right">
                Amount should be less than {maxAmount}.
              </h1>
            )}

            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={() => {
                  if (Number(amount) === 0) return
                  handleStake()
                }}
              >
                Stake
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
AmountInput.displayName = 'AmountInput'

export { AmountInput }
