import * as React from 'react'
import { Button } from './button'
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

import { Input } from '~/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'
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

export interface ExchangeInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof amountInputVariants> {
  setSwapAmount: (amount: string) => void
  handleSwap: (isFromLocal: boolean) => void
  swappableAmount: number
  maxAmount: number
  exchangeRate: number
  symbol: string
  communityTokenBalance: number
  asChild?: boolean
}

const ExchangeInput = React.forwardRef<HTMLInputElement, ExchangeInputProps>(
  (
    {
      setSwapAmount,
      handleSwap,
      maxAmount,
      exchangeRate,
      swappableAmount,
      symbol,
      communityTokenBalance,
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [amount, setAmount] = React.useState('')
    const [_isFromLocal, _setIsFromLocal] = React.useState(false)
    const [toggleGroupValue, setToggleGroupValue] = React.useState('')
    const [exchangeAmount, setExchangeAmount] = React.useState('')
    const PCE_SYMBOL = 'PEACE COIN'

    return (
      <Dialog>
        <DialogTrigger
          className={cn(amountInputVariants({ variant, size, className }))}
        >
          Swap
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>EXCHANGE</DialogTitle>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 bg-grey py-6 px-6 rounded-t-xl">
                <h1 className="text-sm text-[#505050]">
                  I have{' '}
                  {_isFromLocal
                    ? Number(communityTokenBalance).toFixed(2)
                    : Number(maxAmount).toFixed(2)}{' '}
                  {_isFromLocal ? symbol : PCE_SYMBOL}
                </h1>
                <div className="flex flex-row items-center">
                  <h1 className="whitespace-nowrap font-bold text-xl">
                    {_isFromLocal ? symbol : PCE_SYMBOL}
                  </h1>
                  <Input
                    className="w-full text-right border-none bg-grey font-bold text-xl"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.00"
                    value={exchangeAmount}
                    onChange={(e) => {
                      const newValue = e.target.value
                      if (Number(newValue) < 0) {
                        e.target.value = '0'
                        return
                      }
                      setExchangeAmount(newValue)
                      setAmount(newValue)
                      setSwapAmount(newValue)
                      setToggleGroupValue('0')
                    }}
                  ></Input>
                </div>
              </div>

              <div className="flex justify-center -my-5 z-10">
                <Button
                  className="w-10 h-10 bg-white border-none outline-none hover:bg-white p-2"
                  onClick={() => {
                    _setIsFromLocal(!_isFromLocal)
                  }}
                  disabled={communityTokenBalance == 0}
                >
                  <Image
                    src="/swap-icon.png"
                    alt="Swap"
                    width={30}
                    height={30}
                  />
                </Button>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-4 bg-light_black py-6 px-6 rounded-b-xl">
                  <h1 className="text-sm text-[#505050]">
                    I want to get {_isFromLocal ? PCE_SYMBOL : symbol}
                  </h1>
                  <div className="flex flex-row items-center">
                    {' '}
                    <h1 className="whitespace-nowrap font-bold text-xl">
                      {_isFromLocal ? PCE_SYMBOL : symbol}
                    </h1>
                    <Input
                      className="w-full text-right border-none bg-light_black font-bold text-xl"
                      type="number"
                      min="0"
                      disabled={true}
                      step="0.1"
                      placeholder="0.00"
                      value={
                        !_isFromLocal
                          ? (Number(amount) * exchangeRate).toFixed(2)
                          : (Number(amount) / exchangeRate).toFixed(2)
                      }
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

            <ToggleGroup
              type="single"
              className="flex flex-row gap-2 w-full rounded-full bg-grey"
              defaultValue="default"
              value={toggleGroupValue}
              onValueChange={(value) => {
                setToggleGroupValue(value)
                if (value === 'clear') {
                  setExchangeAmount('0')
                  setAmount('0')
                  setSwapAmount('0')
                } else if (value === 'half') {
                  const _value = _isFromLocal
                    ? (Number(communityTokenBalance) / 2).toFixed(2)
                    : (Number(maxAmount) / 2).toFixed(2)
                  setExchangeAmount(_value)
                  setAmount(_value)
                  setSwapAmount(_value)
                } else if (value === 'all') {
                  const _value = _isFromLocal
                    ? communityTokenBalance.toFixed(2)
                    : maxAmount.toFixed(2)
                  setExchangeAmount(_value)
                  setAmount(_value)
                  setSwapAmount(_value)
                }
              }}
            >
              <ToggleGroupItem
                value="clear"
                className="w-full rounded-full data-[state=on]:bg-[#D0E6FF]"
              >
                Clear
              </ToggleGroupItem>
              <ToggleGroupItem
                value="half"
                className="w-full rounded-full data-[state=on]:bg-[#D0E6FF]"
              >
                Half
              </ToggleGroupItem>
              <ToggleGroupItem
                value="all"
                className="w-full rounded-full data-[state=on]:bg-[#D0E6FF]"
              >
                All
              </ToggleGroupItem>
            </ToggleGroup>

            {amount === '0' && (
              <h1 className="text-sm text-red-500 text-right">
                Amount should be greater than 0.
              </h1>
            )}

            {Number(amount) >
              (!_isFromLocal ? maxAmount : communityTokenBalance) && (
              <h1 className="text-sm text-red-500 text-right">
                Amount should be less than{' '}
                {!_isFromLocal
                  ? maxAmount.toFixed(2)
                  : communityTokenBalance.toFixed(2)}
                .
              </h1>
            )}

            {Number(amount) > swappableAmount && _isFromLocal && (
              <h1 className="text-sm text-red-500 text-right">
                Today's swappable amount is {swappableAmount.toFixed(2)}.
              </h1>
            )}

            <DialogClose>
              <Button
                size="lg"
                className="w-full text-xl rounded-full"
                onClick={() => {
                  handleSwap(_isFromLocal)
                }}
              >
                Swap
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
ExchangeInput.displayName = 'ExchangeInput'

export { ExchangeInput }
