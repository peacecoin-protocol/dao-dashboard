'use client'

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { formatEther, parseEther } from 'ethers'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { TokenTable } from '~/components/custom/token-table'
import { Input } from '~/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { formatString } from '~/components/utils'
import useWindowWidth from '~/components/useWindWidth'

import { defaultChainId, pceAddress } from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { PagePropsWithLocale, TOKEN } from '~/i18n/types'
import { COMMUNITY_TOKEN_ABI } from '~/app/ABIs/CommunityToken'

import { config } from '~/lib/config'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { LoadingOverlay } from '~/components/ui/loading-overlay'
import { useDictionary } from '~/hooks/use-dictionary'
import { useEnsureSupportedChain } from '~/hooks/use-ensure-supported-chain'
import { useTransactionToast } from '~/hooks/use-transaction-toast'
import { usePagination } from '~/hooks/use-pagination'

type TokenFormFieldName =
  | 'name'
  | 'symbol'
  | 'amountToExchange'
  | 'dilutionFactor'
  | 'decreaseIntervalDays'
  | 'afterDecreaseBp'
  | 'maxIncreaseOfTotalSupplyBp'
  | 'maxIncreaseBp'
  | 'maxUsageBp'
  | 'changeBp'

interface TokenCreationState {
  name: string
  symbol: string
  amountToExchange: string
  dilutionFactor: string
  decreaseIntervalDays: string
  afterDecreaseBp: string
  maxIncreaseOfTotalSupplyBp: string
  maxIncreaseBp: string
  maxUsageBp: string
  changeBp: string
  incomeExchangeAllowMethod: 3
  outgoExchangeAllowMethod: 3
  incomeTargetTokens: string[]
  outgoTargetTokens: string[]
}

const tokenAmountFields = new Set<TokenFormFieldName>([
  'amountToExchange',
  'dilutionFactor',
])

const initialTokenInfo: TokenCreationState = {
  name: '',
  symbol: '',
  amountToExchange: '0',
  dilutionFactor: '0',
  decreaseIntervalDays: '',
  afterDecreaseBp: '',
  maxIncreaseOfTotalSupplyBp: '',
  maxIncreaseBp: '',
  maxUsageBp: '',
  changeBp: '',
  incomeExchangeAllowMethod: 3,
  outgoExchangeAllowMethod: 3,
  incomeTargetTokens: [],
  outgoTargetTokens: [],
}

const tokenCreationFields: Array<{
  name: TokenFormFieldName
  placeholder: string
  type?: 'number'
}> = [
  { name: 'name', placeholder: 'Name - PeaceCoin, Ethereum, Bitcoin, etc.' },
  { name: 'symbol', placeholder: 'Symbol - PCE, ETH, BTC, etc.' },
  {
    name: 'amountToExchange',
    placeholder: 'amountToExchange - 100',
    type: 'number',
  },
  {
    name: 'dilutionFactor',
    placeholder: 'dilutionFactor - 1',
    type: 'number',
  },
  {
    name: 'decreaseIntervalDays',
    placeholder: 'decreaseIntervalDays - 7',
    type: 'number',
  },
  {
    name: 'afterDecreaseBp',
    placeholder: 'afterDecreaseBp - 9980',
    type: 'number',
  },
  {
    name: 'maxIncreaseOfTotalSupplyBp',
    placeholder: 'maxIncreaseOfTotalSupplyBp - 20',
    type: 'number',
  },
  {
    name: 'maxIncreaseBp',
    placeholder: 'maxIncreaseBp - 2000',
    type: 'number',
  },
  {
    name: 'maxUsageBp',
    placeholder: 'maxUsageBp - 3000',
    type: 'number',
  },
  {
    name: 'changeBp',
    placeholder: 'changeBp - 3000',
    type: 'number',
  },
]

const tokenPageSize = 5

export default function ForTokenPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const dict = useDictionary(locale)
  const width = useWindowWidth()
  const colSpan = width < 1280

  const { address, chainId } = useAccount()
  useEnsureSupportedChain()
  const { data: hash, error, writeContractAsync } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const [isOpened, setDialogStatus] = useState(false)
  const [tokenInfo, setTokenInfo] =
    useState<TokenCreationState>(initialTokenInfo)
  const [exchangeRates, setExchangeRate] = useState<Record<string, bigint>>({})
  const [tokens, setTokens] = useState<string[]>([])
  const [swapAmount, setSwapAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferAddress, setTransferAddress] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTokenLoading, setIsTokenLoading] = useState(true)

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: _tokens, refetch: refetchTokens } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'getTokens',
    args: [],
  })

  const { data: lastModifiedFactor } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'lastModifiedFactor',
    args: [],
  })

  const { data: factor } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'getCurrentFactor',
    args: [],
  })

  const { data: INITIAL_FACTOR } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'INITIAL_FACTOR',
    args: [],
  })

  const fetchExchangeRate = useCallback(
    async (_tokens: string[]) => {
      if (_tokens.length === 0 || !pceAddress[chainId || defaultChainId]) {
        setExchangeRate({})
        return
      }

      const exchangeRateEntries = await Promise.all(
        _tokens.map(async (tokenAddress) => {
          if (!tokenAddress) return null

          try {
            const exchangeRate = await readContract(config, {
              address: pceAddress[chainId || defaultChainId] as `0x${string}`,
              abi: PCE_ABI,
              functionName: 'getExchangeRate',
              args: [tokenAddress],
            })

            return [tokenAddress, exchangeRate as bigint] as const
          } catch (error) {
            console.error('Error getting exchange rate:', error)
            return null
          }
        })
      )

      setExchangeRate(
        Object.fromEntries(
          exchangeRateEntries.filter(
            (entry): entry is readonly [string, bigint] => entry !== null
          )
        )
      )
    },
    [chainId]
  )

  useEffect(() => {
    if (tokens.length > 0) {
      fetchExchangeRate(tokens)
      return
    }

    setExchangeRate({})
  }, [fetchExchangeRate, tokens])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name as TokenFormFieldName
    const value = event.target.value
    const isAmountField = tokenAmountFields.has(name)
    const nextValue = isAmountField
      ? value !== '' && value !== '0' ? parseEther(value).toString() : '0'
      : value

    setTokenInfo((prev) => ({
      ...prev,
      [name]: nextValue,
    }))
  }

  const [communityTokenInfo, setCommunityTokenInfo] = useState<TOKEN[]>([])

  const getCommunityTokenInfo = useCallback(
    async (tokenAddress: string) => {
      if (!tokenAddress || !tokenAddress.startsWith('0x')) return

      try {
        const addr = tokenAddress as `0x${string}`
        const [name, symbol, balance, swappableBalanceToday, swappableBalanceForIndividual] =
          await Promise.all([
            readContract(config, { address: addr, abi: PCE_ABI, functionName: 'name', args: [] }) as Promise<string>,
            readContract(config, { address: addr, abi: PCE_ABI, functionName: 'symbol', args: [] }) as Promise<string>,
            readContract(config, { address: addr, abi: PCE_ABI, functionName: 'balanceOf', args: [address] }) as Promise<bigint>,
            readContract(config, { address: addr, abi: COMMUNITY_TOKEN_ABI, functionName: 'getTodaySwapableToPCEBalance', args: [] }) as Promise<string>,
            readContract(config, { address: addr, abi: COMMUNITY_TOKEN_ABI, functionName: 'getTodaySwapableToPCEBalanceForIndividual', args: [address] }) as Promise<string>,
          ])

        setCommunityTokenInfo((prev) => {
          const existingTokenIndex = prev.findIndex(
            (t) => t.address === tokenAddress
          )
          if (existingTokenIndex >= 0) {
            const newArray = [...prev]
            newArray[existingTokenIndex] = {
              address: tokenAddress,
              name,
              symbol,
              balance,
              swapToLocalAllowance: Math.min(
                Number(formatEther(swappableBalanceToday)),
                Number(formatEther(swappableBalanceForIndividual))
              ),
            }
            return newArray
          }
          return [
            ...prev,
            {
              address: tokenAddress,
              name,
              symbol,
              balance,
              swapToLocalAllowance: Math.min(
                Number(formatEther(swappableBalanceToday)),
                Number(formatEther(swappableBalanceForIndividual))
              ),
            },
          ]
        })
      } catch (err) {
        console.error('Error getting balance:', err)
        return null
      }
    },
    [address]
  )

  useEffect(() => {
    if (_tokens === undefined) {
      setIsTokenLoading(true)
      return
    }

    const nextTokens = Array.isArray(_tokens) ? (_tokens as string[]) : []
    setTokens(nextTokens)

    if (nextTokens.length === 0) {
      setCommunityTokenInfo([])
      setIsTokenLoading(false)
      return
    }

    const uniqueTokens = Array.from(new Set(nextTokens.filter(Boolean)))
    setCommunityTokenInfo((prev) =>
      prev.filter((tokenInfo) => uniqueTokens.includes(tokenInfo.address))
    )
    let cancelled = false
    setIsTokenLoading(true)

    Promise.allSettled(
      uniqueTokens.map((token) => getCommunityTokenInfo(token))
    ).then(() => {
      if (!cancelled) {
        setIsTokenLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [_tokens, getCommunityTokenInfo])

  const filteredCommunityTokenInfo = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return communityTokenInfo

    return communityTokenInfo.filter((tokenInfo) => {
      const name = (tokenInfo?.name ?? '').toLowerCase()
      const address = (tokenInfo?.address ?? '').toLowerCase()
      return name.includes(query) || address.includes(query)
    })
  }, [communityTokenInfo, searchQuery])

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      refetchTokens()
    }
  }, [isConfirmed, refetchBalance, refetchTokens])

  useTransactionToast({
    error,
    isConfirmed,
    isConfirming,
    pendingMessage: 'TX is Pending, Please Wait...',
    successMessage: 'Transaction Succeed!',
  })

  const waitForHash = useCallback(
    async (transactionHash: `0x${string}`) =>
      waitForTransactionReceipt(config, {
        hash: transactionHash,
        confirmations: 1,
      }),
    []
  )

  const ensureTokenAllowance = useCallback(
    async ({
      amount,
      spender,
      tokenAddress,
    }: {
      amount: bigint
      spender: `0x${string}`
      tokenAddress: `0x${string}`
    }) => {
      if (!address) {
        return
      }

      const allowance = (await readContract(config, {
        abi: COMMUNITY_TOKEN_ABI,
        address: tokenAddress,
        functionName: 'allowance',
        args: [address, spender],
      })) as bigint

      if (allowance >= amount) {
        return
      }

      const approvalHash = await writeContractAsync({
        abi: COMMUNITY_TOKEN_ABI,
        address: tokenAddress,
        functionName: 'approve',
        args: [spender, amount],
      })

      await waitForHash(approvalHash)
    },
    [address, waitForHash, writeContractAsync]
  )

  const handleSwap = async (fromToken: TOKEN, toToken: TOKEN) => {
    let amount: bigint | null = null

    try {
      amount = parseEther(swapAmount)
      await ensureTokenAllowance({
        amount,
        spender: toToken.address as `0x${string}`,
        tokenAddress: fromToken.address as `0x${string}`,
      })
    } catch (error) {
      console.error('Error approving token swap:', error)
      return
    }

    if (amount === null) {
      return
    }

    try {
      const hash = await writeContractAsync({
        abi: COMMUNITY_TOKEN_ABI,
        address: fromToken.address as `0x${string}`,
        functionName: 'swapTokens',
        args: [toToken.address as `0x${string}`, amount],
      })

      await waitForHash(hash)

      await getCommunityTokenInfo(toToken.address as `0x${string}`)
      await getCommunityTokenInfo(fromToken.address as `0x${string}`)
    } catch (error) {
      console.error('Error swapping tokens:', error)
    }
  }

  const handleSwapFromLocalToken = async (token: any) => {
    if (!token || !INITIAL_FACTOR || !lastModifiedFactor) return
    let amount: bigint | null = null

    try {
      amount = parseEther(swapAmount)
      await ensureTokenAllowance({
        amount,
        spender: pceAddress[chainId || defaultChainId] as `0x${string}`,
        tokenAddress: token as `0x${string}`,
      })
    } catch (error) {
      console.error('Error swapping from local token:', error)
      return
    }

    if (amount === null) {
      return
    }

    try {
      const hash = await writeContractAsync({
        abi: PCE_ABI,
        address: pceAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'swapFromLocalToken',
        args: [token, amount],
      })

      await waitForHash(hash)

      await getCommunityTokenInfo(token)
    } catch (error) {
      console.error('Error swapping to local token:', error)
    }
  }

  const handleTransfer = async (token: `0x${string}`) => {
    let hash
    try {
      hash = await writeContractAsync({
        abi: PCE_ABI,
        address: token,
        functionName: 'transfer',
        args: [transferAddress, parseEther(transferAmount)],
      })

      await waitForHash(hash)

      await getCommunityTokenInfo(token)
    } catch (error) {
      console.error('Error transferring tokens:', error)
    }
  }

  const handleSwapToLocalToken = async (tokenAddress: string) => {
    try {
      const hash = await writeContractAsync({
        abi: PCE_ABI,
        address: pceAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'swapToLocalToken',
        args: [tokenAddress, parseEther(swapAmount)],
      })

      await waitForHash(hash)
      await getCommunityTokenInfo(tokenAddress)
    } catch (error) {
      console.error('Error swapping to local token:', error)
    }
  }

  const handleCreateToken = async () => {
    setDialogStatus(false)

    try {
      const hash = await writeContractAsync({
        abi: PCE_ABI,
        address: pceAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'createToken',
        args: [
          tokenInfo.name,
          tokenInfo.symbol,
          tokenInfo.amountToExchange,
          tokenInfo.dilutionFactor,
          tokenInfo.decreaseIntervalDays,
          tokenInfo.afterDecreaseBp,
          tokenInfo.maxIncreaseOfTotalSupplyBp,
          tokenInfo.maxIncreaseBp,
          tokenInfo.maxUsageBp,
          tokenInfo.changeBp,
          tokenInfo.incomeExchangeAllowMethod,
          tokenInfo.outgoExchangeAllowMethod,
          tokenInfo.incomeTargetTokens,
          tokenInfo.outgoTargetTokens,
        ],
      })

      await waitForHash(hash)
    } catch (error) {
      console.error('Error creating token:', error)
    }
  }

  const token = dict?.token ?? {}
  const {
    page: tokenSafePage,
    totalPages: tokenTotalPages,
    pageItems: pagedCommunityTokenInfo,
    goToNextPage,
    goToPrevPage,
  } = usePagination(filteredCommunityTokenInfo, tokenPageSize)

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="w-full mx-auto flex flex-col gap-2">
        <PageHeaderSection title={token.title ?? ''} />
        <p className="text-muted-foreground">
          {token.subtitle1 ?? ''}
          {': '}
          {balance ? formatString(formatEther(BigInt(balance as string))) : '0'}
        </p>

        <p className="text-muted-foreground">
          {token.subtitle2 ?? ''}
          {': '} {factor ? formatEther(BigInt(factor as string)) : '0'}
        </p>
        <Button
          className="w-40 my-2"
          onClick={() => {
            setDialogStatus(true)
          }}
        >
          {token.createToken ?? ''}
        </Button>
        <div className="w-full max-w-md">
          <Input
            placeholder={
              token.searchPlaceholder ?? 'Search by name or token address'
            }
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <Dialog open={isOpened} onOpenChange={setDialogStatus}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dict?.token?.inputTokenInfo ?? ''}</DialogTitle>
              <DialogDescription>
                {dict?.token?.createTokenInfo ?? ''}
              </DialogDescription>
              <div className="gap-4">
                {tokenCreationFields.map((field) => (
                  <Input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="my-2"
                    onChange={handleChange}
                    type={field.type}
                    min={field.type ? '0' : undefined}
                    step={field.type ? '0.1' : undefined}
                  />
                ))}
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button className="mt-5" onClick={handleCreateToken}>
                {dict?.token?.confirm ?? ''}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TokenTable
          communityTokenInfo={pagedCommunityTokenInfo}
          tokens={tokens}
          dict={dict}
          colSpan={colSpan}
          balance={balance as bigint}
          exchangeRates={exchangeRates}
          swapAmount={swapAmount}
          transferAmount={transferAmount}
          transferAddress={transferAddress}
          setSwapAmount={setSwapAmount}
          setTransferAmount={setTransferAmount}
          setTransferAddress={setTransferAddress}
          handleSwap={handleSwap}
          handleSwapFromLocalToken={handleSwapFromLocalToken}
          handleSwapToLocalToken={handleSwapToLocalToken}
          handleTransfer={handleTransfer}
        />
        {filteredCommunityTokenInfo.length > tokenPageSize && (
          <div className="flex items-center justify-between gap-2 mt-3">
            <span className="text-xs text-muted-foreground">
              Page {tokenSafePage} of {tokenTotalPages}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={tokenSafePage <= 1}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={tokenSafePage >= tokenTotalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      <LoadingOverlay isLoading={isTokenLoading} />
    </div>
  )
}
