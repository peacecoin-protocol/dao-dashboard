import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { usePathname } from 'next/navigation'
import { Dictionary, Locale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

export interface TransferInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setTransferAmount: (amount: string) => void
  handleTransfer: () => void
  setTransferAddress: (address: string) => void
  maxAmount: number
  symbol: string
  asChild?: boolean
  dict?: Dictionary
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
      asChild = false,
      dict: dictProp,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()
    const [dict, setDict] = React.useState<Dictionary | null>(dictProp || null)

    React.useEffect(() => {
      if (!dictProp) {
        const fetchDict = async () => {
          try {
            const locale = (pathname?.split('/')[1] || 'en') as Locale
            const fetchedDict = await getDict(locale)
            setDict(fetchedDict)
          } catch (error) {
            console.error('Error fetching dictionary:', error)
          }
        }
        fetchDict()
      }
    }, [dictProp, pathname])

    const tokenLabels = dict?.token ?? {}
    const transferLabel = tokenLabels.transfer ?? 'Transfer'

    const [amount, setAmount] = React.useState('')
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className}>{transferLabel}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>{transferLabel}</DialogTitle>
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

            <DialogClose asChild>
              <Button
                className="w-full text-xl rounded-full"
                onClick={() => {
                  handleTransfer()
                }}
              >
                {transferLabel}
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
