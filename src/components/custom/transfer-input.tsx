import * as React from 'react'
import { Button } from './button'
import {
  Dialog,
  DialogClose,
  DialogContent,
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

export interface TransferInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof amountInputVariants> {
  setTransferAmount: (amount: string) => void
  handleTransfer: () => void
  setTransferAddress: (address: string) => void
  maxAmount: number
  symbol: string
  asChild?: boolean
}

const TransferInput = React.forwardRef<HTMLInputElement, TransferInputProps>(
  (
    {
      setTransferAmount,
      handleTransfer,
      setTransferAddress,
      maxAmount,
      symbol,
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
          Transfer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Transfer</DialogTitle>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 bg-grey p-2 px-6 rounded-t-xl">
                <h1 className="text-sm text-[#505050]">
                  I have {Number(maxAmount).toFixed(2)} {symbol}
                </h1>
                <div className="flex flex-row items-center">
                  <Input
                    className="w-full text-right border-none bg-grey font-bold text-xl"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.00"
                    onChange={(e) => {
                      const newValue = e.target.value
                      if (Number(newValue) < 0) {
                        e.target.value = '0'
                        return
                      }
                      setAmount(newValue)
                      setTransferAmount(newValue)
                    }}
                  ></Input>

                  <h1 className="whitespace-nowrap font-bold text-xl">
                    {symbol}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-2 bg-light_black p-2 px-4 rounded-b-xl">
                  <h1 className="text-sm text-[#505050]">
                    I want to transfer to
                  </h1>
                  <div className="flex flex-row items-center">
                    <Input
                      className="w-full text-right border-none bg-light_black font-bold text-sm"
                      type="text"
                      placeholder="Enter public address {0x}"
                      onChange={(e) => {
                        setTransferAddress(e.target.value)
                      }}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

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
                size="lg"
                className="w-full text-xl rounded-full"
                onClick={() => {
                  handleTransfer()
                }}
              >
                Transfer
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
TransferInput.displayName = 'TransferInput'

export { TransferInput }
