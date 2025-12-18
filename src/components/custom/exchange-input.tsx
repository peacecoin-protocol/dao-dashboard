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
import SwapIcon from '../../../public/svg/swap'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { usePathname } from 'next/navigation'
import { TOKEN, Dictionary, Locale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { formatString } from '~/components/utils'
import { formatEther } from 'viem'
import { ZeroAddress } from 'ethers'

export interface ExchangeInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setSwapAmount: (amount: string) => void
  handleSwap: (fromToken: TOKEN, toToken: TOKEN) => void
  tokenLists: TOKEN[]
  selectedToken: TOKEN
  exchangeRates: Record<string, bigint>
  pceBalance: bigint
  asChild?: boolean
  dict?: Dictionary
}

const ExchangeInput = React.forwardRef<HTMLInputElement, ExchangeInputProps>(
  (
    {
      setSwapAmount,
      handleSwap,
      tokenLists,
      pceBalance,
      selectedToken,
      exchangeRates,
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
    const swapLabel = tokenLabels.swap ?? 'Swap'

    const PCE_TOKEN = React.useMemo(
      () => ({
        symbol: 'PCE',
        address: ZeroAddress,
        balance: pceBalance,
        name: 'PEACE COIN',
        swapToLocalAllowance: Number(formatEther(pceBalance)),
      }),
      [pceBalance]
    )

    const [amount, setAmount] = React.useState('')
    const [_isFromLocal, _setIsFromLocal] = React.useState(false)
    const [toggleGroupValue, setToggleGroupValue] = React.useState('')
    const [exchangeAmount, setExchangeAmount] = React.useState('')

    const [_tokenList, setTokenList] = React.useState<TOKEN[]>([])
    const [toToken, setToToken] = React.useState<TOKEN>()
    const [fromToken, setFromToken] = React.useState<TOKEN>()

    React.useEffect(() => {
      const list = tokenLists
      setTokenList([PCE_TOKEN, ...list])
    }, [tokenLists, PCE_TOKEN])

    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setExchangeAmount('0')
            setAmount('0')
            setFromToken(undefined)
            setToToken(undefined)
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className={className}>{swapLabel}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>EXCHANGE</DialogTitle>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 bg-grey py-6 px-6 rounded-t-xl">
                <h1 className="text-sm text-[#505050]">
                  I have{' '}
                  {fromToken?.address === PCE_TOKEN.address
                    ? formatString(formatEther(pceBalance))
                    : formatString(formatEther(selectedToken.balance))}{' '}
                  {fromToken?.address === PCE_TOKEN.address
                    ? PCE_TOKEN.symbol
                    : selectedToken.symbol}
                </h1>

                <div className="flex flex-row items-center">
                  <Select
                    value={fromToken?.address}
                    onValueChange={(value) => {
                      if (value === PCE_TOKEN.address) {
                        setFromToken(PCE_TOKEN)
                      } else {
                        setFromToken(selectedToken)
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={PCE_TOKEN.address}>
                          {PCE_TOKEN.symbol}
                        </SelectItem>
                        <SelectItem value={selectedToken.address}>
                          {selectedToken.symbol}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-full text-right border-none bg-grey font-bold text-xl"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.00"
                    onChange={(e) => {
                      if (fromToken === undefined || toToken === undefined) {
                        return
                      }

                      const newValue = e.target.value
                      if (Number(newValue) < 0) {
                        e.target.value = '0'
                        return
                      }

                      let exchangeRate = '0'
                      let exchangeAmount = '0'

                      if (fromToken.address == PCE_TOKEN.address) {
                        exchangeRate = formatEther(
                          exchangeRates[toToken.address] || BigInt(0)
                        ).toString()

                        exchangeAmount = (
                          Number(newValue) * Number(exchangeRate)
                        ).toFixed(2)
                      } else if (toToken.address == PCE_TOKEN.address) {
                        exchangeRate = formatEther(
                          exchangeRates[fromToken.address] || BigInt(0)
                        ).toString()

                        exchangeAmount = (
                          Number(newValue) / Number(exchangeRate)
                        ).toFixed(2)
                      }

                      setExchangeAmount(exchangeAmount)
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
                    const _fromToken = fromToken
                    const _toToken = toToken
                    setFromToken(_toToken)
                    setToToken(_fromToken)
                  }}
                >
                  <SwapIcon colorClass="fill-current" />
                </Button>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-4 bg-light_black py-6 px-6 rounded-b-xl">
                  <h1 className="text-sm text-[#505050]">
                    I want to get {toToken?.symbol}
                  </h1>
                  <div className="flex flex-row items-center">
                    <Select
                      value={toToken?.address}
                      onValueChange={(value) => {
                        const _selectedToken = _tokenList.find(
                          (token) => token.address === value
                        )
                        setToToken(_selectedToken)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {_tokenList.map((token) => (
                            <SelectItem
                              key={token.address}
                              value={token.address}
                            >
                              {token.symbol}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      className="w-full text-right border-none bg-light_black font-bold text-xl"
                      type="number"
                      min="0"
                      disabled={true}
                      step="0.1"
                      placeholder="0"
                      value={exchangeAmount}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

            {fromToken && toToken && amount === '0' && (
              <h1 className="text-sm text-red-500 text-right">
                Amount should be greater than 0.
              </h1>
            )}

            {fromToken?.address == PCE_TOKEN.address &&
              Number(amount) > Number(formatEther(pceBalance ?? BigInt(0))) && (
                <h1 className="text-sm text-red-500 text-right">
                  Amount should be less than{' '}
                  {Number(formatEther(pceBalance ?? BigInt(0))).toFixed(2)}
                </h1>
              )}

            {fromToken?.address != PCE_TOKEN.address &&
              Number(amount) >
                Number(formatEther(selectedToken?.balance ?? BigInt(0))) && (
                <h1 className="text-sm text-red-500 text-right">
                  Amount should be less than{' '}
                  {Number(
                    formatEther(selectedToken?.balance ?? BigInt(0))
                  ).toFixed(2)}
                  .
                </h1>
              )}

            {Number(amount) > (fromToken?.swapToLocalAllowance ?? 0) && (
              <h1 className="text-sm text-red-500 text-right">
                Today's swappable amount is{' '}
                {fromToken?.swapToLocalAllowance.toFixed(2)}.
              </h1>
            )}

            {fromToken &&
              toToken &&
              fromToken?.address === toToken?.address && (
                <h1 className="text-sm text-red-500 text-right">
                  You cannot swap to the same token.
                </h1>
              )}

            <DialogClose asChild>
              <Button
                className="w-full text-xl rounded-full"
                onClick={() => {
                  if (fromToken && toToken) {
                    handleSwap(fromToken, toToken)
                    setExchangeAmount('0')
                    setAmount('0')
                    setFromToken(undefined)
                    setToToken(undefined)
                  }
                }}
              >
                {swapLabel}
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
