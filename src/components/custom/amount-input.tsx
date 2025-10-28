import * as React from 'react'
import { Button } from '~/components/custom/button'
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
import { cn } from '~/components/utils'

export interface AmountInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        <DialogTrigger
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
            className
          )}
        >
          {localDict.stake ?? 'Stake'}
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
                variant="outline"
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
