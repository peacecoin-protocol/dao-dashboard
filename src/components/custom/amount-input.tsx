import * as React from 'react'
import { Button } from './button'
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
import { type VariantProps, cva } from 'class-variance-authority'

const amountInputVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface AmountInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof amountInputVariants> {
  setStakingAmount: (amount: string) => void
  handleStake: () => void
  maxAmount: number
  asChild?: boolean
}

const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      setStakingAmount,
      handleStake,
      maxAmount,
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [amount, setAmount] = React.useState('')
    return (
      <Dialog>
        <DialogTrigger
          className={cn(amountInputVariants({ variant, size, className }))}
        >
          Stake
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Enter Amount</DialogTitle>
            <DialogDescription>
              Enter the amount of tokens you want to stake.
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

            <DialogClose>
              <Button
                onClick={() => {
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
