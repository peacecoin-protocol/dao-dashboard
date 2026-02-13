'use client'

import React, { useEffect, useMemo, useState, ChangeEvent } from 'react'
import { formatEther, parseEther } from 'ethers'
import { readContract } from '@wagmi/core'
import { useToast } from '~/hooks/use-toast'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
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

import { pceAddress } from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { COMMUNITY_TOKEN_ABI } from '~/app/ABIs/CommunityToken'

import { config } from '~/lib/config'
import { defaultChainId } from '~/app/constants/constants'

import { TOKEN } from '~/i18n/types'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { Spinner } from '~/components/ui/Spinner'

export default function ForTokenPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const { toast } = useToast()
  const [dict, setDict] = useState<Dictionary | null>(null)
  const width = useWindowWidth()
  const colSpan = width < 1280

  const { address, chainId } = useAccount()
  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const [isOpened, setDialogStatus] = useState(false)
  const [tokenInfo, setTokenInfo] = useState<any>()
  const [exchangeRates, setExchangeRate] = useState<Record<string, bigint>>({})
  const [tokens, setTokens] = useState<any[]>([])
  const [swapAmount, setSwapAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferAddress, setTransferAddress] = useState('')
  const [tokenPage, setTokenPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isTokenLoading, setIsTokenLoading] = useState(true)
  const tokenPageSize = 5

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

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

  const { data: lastModifiedFactor, refetch: refetchLastModifiedFactor } =
    useReadContract({
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

  const { data: INITIAL_FACTOR, refetch: refetchINITIAL_FACTOR } =
    useReadContract({
      address: pceAddress[chainId || defaultChainId] as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'INITIAL_FACTOR',
      args: [],
    })

  const {
    data: swapableToPCEIndividualRate,
    refetch: refetchSwapableToPCEIndividualRate,
  } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'swapableToPCEIndividualRate',
    args: [],
  })

  const fetchExchangeRate = async (_tokens: string[]) => {
    if (!_tokens || _tokens.length == 0) return
    if (!pceAddress[chainId || defaultChainId]) return

    const _exchangeRates: Record<string, bigint> = {}

    for (let i = 0; i < _tokens.length; i++) {
      try {
        const tokenAddress = _tokens[i]
        if (!tokenAddress) continue // Skip if undefined

        const exchangeRate = await readContract(config, {
          address: pceAddress[chainId || defaultChainId] as `0x${string}`,
          abi: PCE_ABI,
          functionName: 'getExchangeRate',
          args: [tokenAddress],
        })

        _exchangeRates[tokenAddress] = exchangeRate as bigint
      } catch (error) {
        console.error('Error getting exchange rate:', error)
      }
    }

    setExchangeRate(_exchangeRates)
  }

  useEffect(() => {
    if (tokens) {
      fetchExchangeRate(tokens as [])
    }
  }, [tokens])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    let _tokenInfo = tokenInfo || {}

    switch (name) {
      case 'name':
        _tokenInfo.name = value
        break
      case 'symbol':
        _tokenInfo.symbol = value
        break
      case 'amountToExchange':
        _tokenInfo.amountToExchange =
          value == '0' || value == '' ? '0' : parseEther(value).toString()
        break
      case 'dilutionFactor':
        _tokenInfo.dilutionFactor =
          value == '0' || value == '' ? '0' : parseEther(value).toString()
        break
      case 'decreaseIntervalDays':
        _tokenInfo.decreaseIntervalDays = value
        break
      case 'afterDecreaseBp':
        _tokenInfo.afterDecreaseBp = value
        break
      case 'maxIncreaseOfTotalSupplyBp':
        _tokenInfo.maxIncreaseOfTotalSupplyBp = value
        break
      case 'maxIncreaseBp':
        _tokenInfo.maxIncreaseBp = value
        break
      case 'maxUsageBp':
        _tokenInfo.maxUsageBp = value
        break
      case 'changeBp':
        _tokenInfo.changeBp = value
        break
    }

    _tokenInfo.incomeExchangeAllowMethod = 3
    _tokenInfo.outgoExchangeAllowMethod = 3
    _tokenInfo.incomeTargetTokens = []
    _tokenInfo.outgoTargetTokens = []
    setTokenInfo(_tokenInfo)
  }

  const [communityTokenInfo, setCommunityTokenInfo] = useState<TOKEN[]>([])

  const getCommunityTokenInfo = React.useCallback(
    async (tokenAddress: string) => {
      if (!tokenAddress || !tokenAddress.startsWith('0x')) return
      try {
        const name = (await readContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: PCE_ABI,
          functionName: 'name',
          args: [],
        })) as string

        const symbol = (await readContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: PCE_ABI,
          functionName: 'symbol',
          args: [],
        })) as string

        const balance = (await readContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: PCE_ABI,
          functionName: 'balanceOf',
          args: [address],
        })) as bigint

        const swappableBalanceToday = (await readContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: COMMUNITY_TOKEN_ABI,
          functionName: 'getTodaySwapableToPCEBalance',
          args: [],
        })) as string

        const swappableBalanceForIndividual = (await readContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: COMMUNITY_TOKEN_ABI,
          functionName: 'getTodaySwapableToPCEBalanceForIndividual',
          args: [address],
        })) as string

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
    [config, address]
  )

  useEffect(() => {
    if (_tokens === undefined) {
      setIsTokenLoading(true)
      return
    }

    const nextTokens = Array.isArray(_tokens) ? (_tokens as string[]) : []
    setTokens(nextTokens as [])

    if (nextTokens.length === 0) {
      setIsTokenLoading(false)
      return
    }

    const uniqueTokens = Array.from(new Set(nextTokens.filter(Boolean)))
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

  useEffect(() => {
    setTokenPage(1)
  }, [communityTokenInfo.length, searchQuery])

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
    const totalPages = Math.max(
      1,
      Math.ceil(filteredCommunityTokenInfo.length / tokenPageSize)
    )
    if (tokenPage > totalPages) {
      setTokenPage(totalPages)
    }
  }, [filteredCommunityTokenInfo.length, tokenPage, tokenPageSize])

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: 'Transaction Succeed!',
      })
      refetchBalance()
      refetchTokens()
    } else if (isConfirming) {
      toast({ title: 'TX is Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, hash, refetchBalance])

  const handleSwap = async (fromToken: TOKEN, toToken: TOKEN) => {
    const allowance = (await readContract(config, {
      abi: COMMUNITY_TOKEN_ABI,
      address: fromToken.address as `0x${string}`,
      functionName: 'allowance',
      args: [address, toToken.address as `0x${string}`],
    })) as bigint

    try {
      if (allowance < parseEther(swapAmount)) {
        const hash = await writeContractAsync({
          abi: COMMUNITY_TOKEN_ABI,
          address: fromToken.address as `0x${string}`,
          functionName: 'approve',
          args: [toToken.address as `0x${string}`, parseEther(swapAmount)],
        })

        await waitForTransactionReceipt(config, {
          hash: hash,
          confirmations: 1,
        })
      }
    } catch (error) {
      toast({ title: (error as BaseError).shortMessage })
      return
    }

    try {
      const hash = await writeContractAsync({
        abi: COMMUNITY_TOKEN_ABI,
        address: fromToken.address as `0x${string}`,
        functionName: 'swapTokens',
        args: [toToken.address as `0x${string}`, parseEther(swapAmount)],
      })

      await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      })

      await getCommunityTokenInfo(toToken.address as `0x${string}`)
      await getCommunityTokenInfo(fromToken.address as `0x${string}`)
    } catch (error) {
      console.error('Error swapping tokens:', error)
    }
  }

  const handleSwapFromLocalToken = async (token: any) => {
    if (!token || !INITIAL_FACTOR || !lastModifiedFactor) return

    const allowance = (await readContract(config, {
      abi: COMMUNITY_TOKEN_ABI,
      address: token,
      functionName: 'allowance',
      args: [address, pceAddress[chainId || defaultChainId] as `0x${string}`],
    })) as bigint

    try {
      if (allowance < parseEther(swapAmount)) {
        const hash = await writeContractAsync({
          abi: COMMUNITY_TOKEN_ABI,
          address: token,
          functionName: 'approve',
          args: [
            pceAddress[chainId || defaultChainId] as `0x${string}`,
            parseEther(swapAmount),
          ],
        })

        await waitForTransactionReceipt(config, {
          hash: hash,
          confirmations: 1,
        })
      }
    } catch (error) {
      console.error('Error swapping from local token:', error)
    }

    try {
      const hash = await writeContractAsync({
        abi: PCE_ABI,
        address: pceAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'swapFromLocalToken',
        args: [token, parseEther(swapAmount)],
      })

      await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      })

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

      await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      })

      await getCommunityTokenInfo(token)
    } catch (error) {
      console.error('Error transferring tokens:', error)
    }
  }

  const handleSwapToLocalToken = async (tokenAddress: string) => {
    let hash
    try {
      hash = await writeContractAsync({
        abi: PCE_ABI,
        address: pceAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'swapToLocalToken',
        args: [tokenAddress, parseEther(swapAmount)],
      })

      await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error swapping to local token:', error)
    }

    await getCommunityTokenInfo(tokenAddress)
  }

  const handleCreateToken = async () => {
    setDialogStatus(!isOpened)

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

      await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error creating token:', error)
    }
  }

  const token = dict?.token ?? {}
  const tokenTotalPages = Math.max(
    1,
    Math.ceil(filteredCommunityTokenInfo.length / tokenPageSize)
  )
  const tokenSafePage = Math.min(tokenPage, tokenTotalPages)
  const tokenStartIndex = (tokenSafePage - 1) * tokenPageSize
  const pagedCommunityTokenInfo = filteredCommunityTokenInfo.slice(
    tokenStartIndex,
    tokenStartIndex + tokenPageSize
  )

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
        <Dialog
          open={isOpened}
          onOpenChange={() => {
            setDialogStatus(!isOpened)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dict?.token?.inputTokenInfo ?? ''}</DialogTitle>
              <DialogDescription>
                {dict?.token?.createTokenInfo ?? ''}
              </DialogDescription>
              <div className="gap-4">
                <Input
                  name="name"
                  placeholder="Name - PeaceCoin, Ethereum, Bitcoin, etc."
                  className="my-2"
                  onChange={handleChange}
                ></Input>
                <Input
                  name="symbol"
                  placeholder="Symbol - PCE, ETH, BTC, etc."
                  className="my-2"
                  onChange={handleChange}
                ></Input>
                <Input
                  name="amountToExchange"
                  placeholder="amountToExchange - 100"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="dilutionFactor"
                  placeholder="dilutionFactor - 1"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="decreaseIntervalDays"
                  placeholder="decreaseIntervalDays - 7"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="afterDecreaseBp"
                  placeholder="afterDecreaseBp - 9980"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="maxIncreaseOfTotalSupplyBp"
                  placeholder="maxIncreaseOfTotalSupplyBp - 20"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="maxIncreaseBp"
                  placeholder="maxIncreaseBp - 2000"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="maxUsageBp"
                  placeholder="maxUsageBp - 3000"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
                <Input
                  name="changeBp"
                  placeholder="changeBp - 3000"
                  className="my-2"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  step="0.1"
                ></Input>
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
                onClick={() => setTokenPage((prev) => Math.max(1, prev - 1))}
                disabled={tokenSafePage <= 1}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setTokenPage((prev) => Math.min(tokenTotalPages, prev + 1))
                }
                disabled={tokenSafePage >= tokenTotalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      {isTokenLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
          <Spinner show={true} size="large" />
        </div>
      )}
    </div>
  )
}
