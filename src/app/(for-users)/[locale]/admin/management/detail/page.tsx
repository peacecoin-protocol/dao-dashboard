'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { formatUnits, parseUnits } from 'viem'
import { formatEther } from 'ethers'
import { createClient } from '~/utils/supabase/client'
import { PagePropsWithLocale } from '~/i18n/types'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import Modal from '~/components/custom/Modal'
import { Env } from '~/env'
import {
  daoStudioAddress,
  defaultChainId,
  EMPTY_NFT_IMAGE,
} from '~/app/constants/constants'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'
import { COMMUNITY_TOKEN_ABI } from '~/app/ABIs/CommunityToken'
import { SBT_ABI } from '~/app/ABIs/SBT'

import { config } from '~/lib/config'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'
import { useToast } from '~/hooks/use-toast'
import { shortenAddress } from '~/components/utils'
import CopyIcon from '../../../../../../../public/svg/copy'
import { EmptyState } from '~/components/custom/empty-state'

type MemberRow = {
  id: string
  userAddr: string
  created_at: string
}

type MemberStats = {
  sendCount: number
  receiveCount: number
  sendAmount: bigint
  receiveAmount: bigint
}

type AlchemyTransfer = {
  value?: number | string
  hash?: string
  from?: string
  to?: string
  blockTimestamp?: string
  metadata?: {
    blockTimestamp?: string
  }
  rawContract?: {
    value?: string
    decimal?: string
  }
}

type MoralisOwner = {
  owner_address?: string
  ownerAddress?: string
}

type DistributeHistoryRow = {
  id: number
  created_at: string
  daoId: string
  startTime: string | null
  endTime: string | null
  metric: string | null
  topX: number | null
  minValue: number | null
}

const ALCHEMY_URL = `https://eth-sepolia.g.alchemy.com/v2/${Env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
const roundAndTrim = (value: string) => {
  if (!value || value === '0') return '0'
  const [intPartRaw, fracPartRaw = ''] = value.split('.')
  let intPart = intPartRaw || '0'
  let fracPart = fracPartRaw

  if (fracPart.length > 2) {
    const digits = fracPart.split('')
    const shouldRoundUp = Number(digits[2] ?? '0') >= 5
    fracPart = digits.slice(0, 2).join('')

    if (shouldRoundUp) {
      let carry = 1
      const frac = fracPart.split('')
      for (let i = frac.length - 1; i >= 0; i -= 1) {
        const next = Number(frac[i]) + carry
        if (next >= 10) {
          frac[i] = '0'
          carry = 1
        } else {
          frac[i] = String(next)
          carry = 0
          break
        }
      }
      fracPart = frac.join('')
      if (carry) {
        const intDigits = intPart.split('')
        for (let i = intDigits.length - 1; i >= 0; i -= 1) {
          const next = Number(intDigits[i]) + carry
          if (next >= 10) {
            intDigits[i] = '0'
            carry = 1
          } else {
            intDigits[i] = String(next)
            carry = 0
            break
          }
        }
        if (carry) {
          intDigits.unshift('1')
        }
        intPart = intDigits.join('')
      }
    }
  }

  const trimmedFrac = fracPart.replace(/0+$/, '')
  return trimmedFrac.length > 0 ? `${intPart}.${trimmedFrac}` : intPart
}

const formatAmount = (amount: bigint) => {
  const formatted = formatUnits(amount, 18)
  return roundAndTrim(formatted)
}

export default function ManagementDetailPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const daoId = searchParams.get('daoId') ?? ''
  const { chainId, address } = useAccount()
  const { toast } = useToast()
  const { writeContractAsync } = useWriteContract()

  const [members, setMembers] = useState<MemberRow[]>([])
  const [memberStats, setMemberStats] = useState<Record<string, MemberStats>>(
    {}
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isStatsLoading, setIsStatsLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [topCount, setTopCount] = useState('')
  const [selectedMetric, setSelectedMetric] = useState<
    'send_count' | 'receive_count' | 'send_volume' | 'receive_volume'
  >('send_count')
  const [minMetricValue, setMinMetricValue] = useState('')
  const [isDistributeOpen, setIsDistributeOpen] = useState(false)
  const [daoTokens, setDaoTokens] = useState<SBTInfo[]>([])
  const [selectedTokenKey, setSelectedTokenKey] = useState('')
  const [isDistributing, setIsDistributing] = useState(false)
  const [memberPage, setMemberPage] = useState(1)
  const memberPageSize = 3
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [historyRows, setHistoryRows] = useState<DistributeHistoryRow[]>([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [historyPage, setHistoryPage] = useState(1)
  const historyPageSize = 3

  const { data: daoConfigs } = useReadContract({
    address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_STUDIO_ABI,
    functionName: 'daoConfigs',
    args: [daoId],
  }) as { data?: string[] }

  const communityTokenAddress = useMemo(() => {
    if (Array.isArray(daoConfigs) && daoConfigs.length === 8) {
      return daoConfigs[6]
    }
    return ''
  }, [daoConfigs])

  useEffect(() => {
    const fetchCommunityTokenUsers = async () => {
      if (!daoId || !communityTokenAddress) {
        setMembers([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const apiKey = Env.MORALIS_API_KEY
        if (!apiKey) {
          throw new Error('Missing Moralis API key')
        }

        const chain =
          (chainId || defaultChainId) === sepolia.id ? 'sepolia' : 'eth'
        const baseUrl = `https://deep-index.moralis.io/api/v2.2/erc20/${communityTokenAddress}/owners`

        const owners: string[] = []
        let cursor: string | null = null
        do {
          const url = new URL(baseUrl)
          url.searchParams.set('chain', chain)
          url.searchParams.set('order', 'DESC')
          if (cursor) url.searchParams.set('cursor', cursor)

          const res = await fetch(url.toString(), {
            headers: {
              accept: 'application/json',
              'X-API-Key': apiKey,
            },
          })
          if (!res.ok) throw new Error('Failed to fetch token holders')
          const data = await res.json()

          if (Array.isArray(data.result)) {
            data.result.forEach((row: MoralisOwner) => {
              const addr = row.owner_address || row.ownerAddress
              if (addr) owners.push(addr)
            })
          }

          cursor = data.cursor ?? null
        } while (cursor)

        const uniqueOwners = Array.from(new Set(owners)).filter(Boolean)
        const rows: MemberRow[] = uniqueOwners.map((addr) => ({
          id: addr,
          userAddr: addr,
          created_at: '',
        }))

        setMembers(rows)
      } catch (error) {
        console.error('Error fetching community token users:', error)
        setMembers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunityTokenUsers()
  }, [daoId, communityTokenAddress, chainId])

  useEffect(() => {
    const fetchDaoTokens = async () => {
      if (!daoId || !address) {
        setDaoTokens([])
        return
      }

      const { data } = await supabase
        .from('Token')
        .select()
        .eq('creator', address)
        .eq('daoId', daoId)
        .order('created_at', { ascending: false })

      setDaoTokens((data as SBTInfo[]) || [])
    }

    fetchDaoTokens()
  }, [daoId, address, supabase])

  useEffect(() => {
    const fetchHistory = async () => {
      if (!daoId || !isHistoryOpen) return

      setIsHistoryLoading(true)
      const { data } = await supabase
        .from('Distributes')
        .select(
          'id, created_at, daoId, startTime, endTime, metric, topX, minValue'
        )
        .eq('daoId', daoId)
        .order('created_at', { ascending: false })

      setHistoryRows((data as DistributeHistoryRow[]) || [])
      setIsHistoryLoading(false)
    }

    fetchHistory()
  }, [daoId, isHistoryOpen, supabase])

  useEffect(() => {
    if (!isHistoryOpen) {
      setHistoryPage(1)
    }
  }, [isHistoryOpen])

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(historyRows.length / historyPageSize)
    )
    if (historyPage > totalPages) {
      setHistoryPage(totalPages)
    }
  }, [historyRows.length, historyPage, historyPageSize])

  useEffect(() => {
    setMemberPage(1)
  }, [startDate, endDate, topCount, selectedMetric, minMetricValue])

  useEffect(() => {
    if (daoTokens.length === 0) {
      setSelectedTokenKey('')
      return
    }
    if (!selectedTokenKey) {
      const firstToken = daoTokens[0]
      if (firstToken) {
        setSelectedTokenKey(`${firstToken.address}-${firstToken.tokenId}`)
      }
    }
  }, [daoTokens, selectedTokenKey])

  useEffect(() => {
    let isCancelled = false

    const parseTransferValue = (transfer: AlchemyTransfer) => {
      const rawValue = transfer.rawContract?.value
      if (rawValue) {
        try {
          return BigInt(rawValue)
        } catch {
          return BigInt(0)
        }
      }
      if (typeof transfer.value === 'number') {
        try {
          return parseUnits(transfer.value.toString(), 18)
        } catch {
          return BigInt(0)
        }
      }
      if (typeof transfer.value === 'string') {
        try {
          return parseUnits(transfer.value, 18)
        } catch {
          return BigInt(0)
        }
      }
      return BigInt(0)
    }

    const fetchAllTransfers = async (params: {
      fromAddress?: string
      toAddress?: string
    }) => {
      setIsLoading(true)

      const transfers: AlchemyTransfer[] = []
      let pageKey: string | undefined

      do {
        const requestParams: Record<string, unknown> = {
          fromBlock: '0x0',
          toBlock: 'latest',
          excludeZeroValue: false,
          withMetadata: true,
          category: ['erc20'],
          contractAddresses: [communityTokenAddress],
          ...params,
        }

        if (pageKey) {
          requestParams.pageKey = pageKey
        }

        const response = await fetch(ALCHEMY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: '1',
            method: 'alchemy_getAssetTransfers',
            params: [requestParams],
          }),
        })

        if (!response.ok) {
          throw new Error(`Alchemy error: ${response.statusText}`)
        }

        const data = await response.json()
        const result = data?.result
        if (!result) {
          break
        }

        transfers.push(...(result.transfers ?? []))
        pageKey = result.pageKey || undefined
      } while (pageKey)

      setIsLoading(false)
      return transfers
    }

    const fetchMemberStats = async (memberAddr: string) => {
      const address = memberAddr.toLowerCase()
      const [sent, received] = await Promise.all([
        fetchAllTransfers({ fromAddress: address }),
        fetchAllTransfers({ toAddress: address }),
      ])

      const startTime = startDate ? new Date(startDate).getTime() : null
      const endTime = endDate ? new Date(endDate).getTime() : null
      const inDateRange = (transfer: AlchemyTransfer) => {
        if (!startTime && !endTime) return true
        const timestamp =
          transfer.metadata?.blockTimestamp ?? transfer.blockTimestamp
        const transferTime = timestamp ? new Date(timestamp).getTime() : null
        if (!transferTime) return false
        if (startTime && transferTime < startTime) return false
        if (endTime && transferTime > endTime) return false
        return true
      }

      const uniqueTransferCount = (transfers: AlchemyTransfer[]) => {
        const hashes = new Set<string>()
        transfers.forEach((transfer) => {
          if (transfer.hash) {
            hashes.add(transfer.hash.toLowerCase())
          }
        })
        return hashes.size || transfers.length
      }

      const sentTransfers = sent.filter(
        (transfer) =>
          transfer.from?.toLowerCase() === address && inDateRange(transfer)
      )
      const receivedTransfers = received.filter(
        (transfer) =>
          transfer.to?.toLowerCase() === address && inDateRange(transfer)
      )

      let currentFactor = (await readContract(config, {
        address: communityTokenAddress as `0x${string}`,
        abi: COMMUNITY_TOKEN_ABI,
        functionName: 'getCurrentFactor',
        args: [],
      })) as bigint

      if (currentFactor < BigInt(1)) {
        currentFactor = BigInt(1)
      }

      const receiveAmount =
        receivedTransfers.reduce(
          (sum, transfer) => sum + parseTransferValue(transfer),
          BigInt(0)
        ) / currentFactor
      const sendAmount =
        sentTransfers.reduce(
          (sum, transfer) => sum + parseTransferValue(transfer),
          BigInt(0)
        ) / currentFactor

      return {
        address,
        stats: {
          sendCount: uniqueTransferCount(sentTransfers),
          receiveCount: uniqueTransferCount(receivedTransfers),
          sendAmount,
          receiveAmount,
        },
      }
    }

    const loadStats = async () => {
      if (!communityTokenAddress || members.length === 0) {
        setMemberStats({})
        setIsStatsLoading(false)
        return
      }

      setIsStatsLoading(true)
      try {
        const statsEntries = await Promise.all(
          members.map((member) => fetchMemberStats(member.userAddr))
        )
        if (isCancelled) return

        const nextStats = statsEntries.reduce(
          (acc, entry) => {
            acc[entry.address] = entry.stats
            return acc
          },
          {} as Record<string, MemberStats>
        )

        setMemberStats(nextStats)
      } catch (error) {
        console.error('Error fetching token transfer stats:', error)
      } finally {
        if (!isCancelled) {
          setIsStatsLoading(false)
        }
      }
    }

    loadStats()

    return () => {
      isCancelled = true
    }
  }, [communityTokenAddress, members, startDate, endDate])

  const filteredMembers = useMemo(() => {
    const topCountValue = Number(topCount)
    const isCountMetric =
      selectedMetric === 'send_count' || selectedMetric === 'receive_count'

    const parseMinMetricValue = () => {
      if (!minMetricValue) return null
      if (isCountMetric) {
        const parsed = Number(minMetricValue)
        if (Number.isNaN(parsed) || parsed <= 0) return null
        return BigInt(Math.floor(parsed))
      }
      try {
        const parsed = parseUnits(minMetricValue, 18)
        return parsed > BigInt(0) ? parsed : null
      } catch {
        return null
      }
    }

    const minMetricValueParsed = parseMinMetricValue()

    const enriched = members.map((member) => {
      const stats = memberStats[member.userAddr.toLowerCase()]
      const sendCount = stats?.sendCount ?? 0
      const receiveCount = stats?.receiveCount ?? 0
      const sendAmount = stats?.sendAmount ?? BigInt(0)
      const receiveAmount = stats?.receiveAmount ?? BigInt(0)
      const metricValue = (() => {
        switch (selectedMetric) {
          case 'send_count':
            return BigInt(sendCount)
          case 'receive_count':
            return BigInt(receiveCount)
          case 'send_volume':
            return sendAmount
          case 'receive_volume':
            return receiveAmount
          default:
            return BigInt(0)
        }
      })()
      return { member, stats, metricValue }
    })

    let filtered = enriched
    if (minMetricValueParsed !== null) {
      filtered = filtered.filter(
        (entry) => entry.metricValue >= minMetricValueParsed
      )
    }
    if (!Number.isNaN(topCountValue) && topCountValue > 0) {
      filtered = [...filtered]
        .sort((a, b) =>
          a.metricValue === b.metricValue
            ? 0
            : a.metricValue > b.metricValue
              ? -1
              : 1
        )
        .slice(0, topCountValue)
    }

    return filtered
  }, [members, memberStats, minMetricValue, selectedMetric, topCount])

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredMembers.length / memberPageSize)
    )
    if (memberPage > totalPages) {
      setMemberPage(totalPages)
    }
  }, [filteredMembers.length, memberPage, memberPageSize])

  const pagedMembers = useMemo(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredMembers.length / memberPageSize)
    )
    const safePage = Math.min(memberPage, totalPages)
    const startIndex = (safePage - 1) * memberPageSize
    return filteredMembers.slice(startIndex, startIndex + memberPageSize)
  }, [filteredMembers, memberPage, memberPageSize])

  const selectedToken = useMemo(() => {
    if (!selectedTokenKey) return null
    return (
      daoTokens.find(
        (token) => `${token.address}-${token.tokenId}` === selectedTokenKey
      ) ?? null
    )
  }, [daoTokens, selectedTokenKey])

  const getTokenImage = (image?: string) => {
    if (!image) return EMPTY_NFT_IMAGE
    return `${Env.PINATA_GATEWAY_URL}/ipfs/${image}`
  }

  const trimTrailingZeros = (value: string) => {
    if (!value.includes('.')) return value
    const trimmed = value.replace(/\.?0+$/, '')
    return trimmed === '' ? '0' : trimmed
  }

  const formatVotingPower = (value?: string) => {
    if (!value) return '0'
    try {
      return trimTrailingZeros(formatEther(BigInt(value)))
    } catch {
      return '0'
    }
  }

  const handleDistribute = async () => {
    if (!address) {
      toast({ title: 'Please connect your wallet first.' })
      return
    }
    if (!selectedToken) {
      toast({ title: 'Please select an SBT/NFT to distribute.' })
      return
    }
    if (filteredMembers.length < 1) {
      toast({ title: 'Please filter more than 1 user to distribute.' })
      return
    }

    setIsDistributing(true)
    try {
      const toAddresses = filteredMembers.map(
        (entry) => entry.member.userAddr as `0x${string}`
      )
      const tokenIds = filteredMembers.map(() => BigInt(selectedToken.tokenId))
      const amounts = filteredMembers.map(() => BigInt(1))

      const simulateTx = await simulateContract(config, {
        abi: SBT_ABI,
        address: selectedToken.address as `0x${string}`,
        functionName: 'batchMint',
        args: [toAddresses, tokenIds, amounts],
      })

      const txHash = await writeContractAsync({
        abi: SBT_ABI,
        address: selectedToken.address as `0x${string}`,
        functionName: 'batchMint',
        args: [toAddresses, tokenIds, amounts],
      })

      await waitForTransactionReceipt(config, {
        hash: txHash,
        confirmations: 1,
      })

      await supabase.from('Distributes').insert({
        daoId,
        startTime: startDate || null,
        endTime: endDate || null,
        metric: selectedMetric,
        topX: topCount ? Number(topCount) : null,
        minValue: minMetricValue ? Number(minMetricValue) : null,
      })

      toast({ title: 'Distribution completed.' })
      setIsDistributeOpen(false)
    } catch (error) {
      console.error('Error distributing SBT/NFT:', error)
      toast({ title: 'Distribution failed.' })
    } finally {
      setIsDistributing(false)
    }
  }

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <PageHeaderSection title="Management Detail" />
        <div className="flex w-full flex-col gap-4 rounded-xl border p-4 sm:p-6 mt-4">
          <div className="w-full rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-col gap-4">
              <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="startDate">Start date/time</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endDate">End date/time</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="metricSelect">Metrics</Label>
                  <Select
                    value={selectedMetric}
                    onValueChange={(value) =>
                      setSelectedMetric(
                        value as
                          | 'send_count'
                          | 'receive_count'
                          | 'send_volume'
                          | 'receive_volume'
                      )
                    }
                  >
                    <SelectTrigger id="metricSelect">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="send_count">send_count</SelectItem>
                      <SelectItem value="receive_count">
                        receive_count
                      </SelectItem>
                      <SelectItem value="send_volume">send_volume</SelectItem>
                      <SelectItem value="receive_volume">
                        receive_volume
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="topCount">Top X by metric</Label>
                  <Input
                    id="topCount"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={topCount}
                    onChange={(event) => setTopCount(event.target.value)}
                    placeholder="e.g. 50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="minMetricValue">Min metric value</Label>
                  <Input
                    id="minMetricValue"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={minMetricValue}
                    onChange={(event) => setMinMetricValue(event.target.value)}
                    placeholder="e.g. 0"
                  />
                </div>

                <div className="flex flex-col gap-2 justify-end">
                  <Label className="invisible">Spacer</Label>

                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="w-full sm:w-48"
                    onClick={() => {
                      setStartDate('')
                      setEndDate('')
                      setTopCount('')
                      setSelectedMetric('send_count')
                      setMinMetricValue('')
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Filters apply to transfer stats shown below.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden w-full md:block">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">No</TableHead>
                    <TableHead className="font-bold">address</TableHead>
                    <TableHead className="font-bold">send_count</TableHead>
                    <TableHead className="font-bold">receive_count</TableHead>
                    <TableHead className="font-bold">send_volume</TableHead>
                    <TableHead className="font-bold">receive_volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : pagedMembers.length > 0 ? (
                    pagedMembers.map((entry, index) => {
                      const member = entry.member
                      const stats = entry.stats
                      const isStatsPending = isStatsLoading && !stats
                      const receiveCount = stats?.receiveCount ?? 0
                      const sendAmount = stats?.sendAmount ?? BigInt(0)
                      const receiveAmount = stats?.receiveAmount ?? BigInt(0)

                      return (
                        <TableRow key={member.id}>
                          <TableCell className="font-bold">
                            {(memberPage - 1) * memberPageSize + index + 1}
                          </TableCell>
                          <TableCell className="font-bold">
                            {member.userAddr}
                          </TableCell>
                          <TableCell className="font-bold">
                            {isStatsPending
                              ? 'Loading...'
                              : (stats?.sendCount ?? 0)}
                          </TableCell>
                          <TableCell className="font-bold">
                            {isStatsPending ? 'Loading...' : receiveCount}
                          </TableCell>
                          <TableCell className="font-bold">
                            {isStatsPending
                              ? 'Loading...'
                              : formatAmount(sendAmount)}
                          </TableCell>
                          <TableCell className="font-bold">
                            {isStatsPending
                              ? 'Loading...'
                              : formatAmount(receiveAmount)}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        <EmptyState title="No members found" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredMembers.length > memberPageSize && (
              <div className="flex items-center justify-between gap-2 mt-3">
                <span className="text-xs text-muted-foreground">
                  Page {memberPage} of{' '}
                  {Math.max(
                    1,
                    Math.ceil(filteredMembers.length / memberPageSize)
                  )}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMemberPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={memberPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMemberPage((prev) =>
                        Math.min(
                          Math.max(
                            1,
                            Math.ceil(filteredMembers.length / memberPageSize)
                          ),
                          prev + 1
                        )
                      )
                    }
                    disabled={
                      memberPage >=
                      Math.max(
                        1,
                        Math.ceil(filteredMembers.length / memberPageSize)
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 md:hidden">
            {isLoading ? (
              <div className="rounded-lg border px-4 py-6 text-center text-sm">
                Loading...
              </div>
            ) : pagedMembers.length > 0 ? (
              pagedMembers.map((entry, index) => {
                const member = entry.member
                const stats = entry.stats
                const isStatsPending = isStatsLoading && !stats
                const receiveCount = stats?.receiveCount ?? 0
                const sendAmount = stats?.sendAmount ?? BigInt(0)
                const receiveAmount = stats?.receiveAmount ?? BigInt(0)

                return (
                  <div
                    key={member.id}
                    className="rounded-lg border p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Member</span>
                        <span>
                          #{(memberPage - 1) * memberPageSize + index + 1}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground break-all">
                        {member.userAddr}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            send_count
                          </span>
                          <span className="font-semibold">
                            {isStatsPending
                              ? 'Loading...'
                              : (stats?.sendCount ?? 0)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            receive_count
                          </span>
                          <span className="font-semibold">
                            {isStatsPending ? 'Loading...' : receiveCount}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            send_volume
                          </span>
                          <span className="font-semibold">
                            {isStatsPending
                              ? 'Loading...'
                              : formatAmount(sendAmount)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            receive_volume
                          </span>
                          <span className="font-semibold">
                            {isStatsPending
                              ? 'Loading...'
                              : formatAmount(receiveAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <EmptyState title="No members found" />
            )}

            {filteredMembers.length > memberPageSize && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Page {memberPage} of{' '}
                  {Math.max(
                    1,
                    Math.ceil(filteredMembers.length / memberPageSize)
                  )}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMemberPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={memberPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setMemberPage((prev) =>
                        Math.min(
                          Math.max(
                            1,
                            Math.ceil(filteredMembers.length / memberPageSize)
                          ),
                          prev + 1
                        )
                      )
                    }
                    disabled={
                      memberPage >=
                      Math.max(
                        1,
                        Math.ceil(filteredMembers.length / memberPageSize)
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-48"
            onClick={() => setIsHistoryOpen(true)}
          >
            History
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full sm:w-48"
            onClick={() => setIsDistributeOpen(true)}
          >
            Distribute
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isHistoryOpen}
        onClose={() => {
          setIsHistoryOpen(false)
        }}
      >
        <div className="w-full max-w-2xl mx-auto p-2 sm:p-3 space-y-4">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Distribute History
            </h2>
          </div>

          {(() => {
            const totalPages = Math.max(
              1,
              Math.ceil(historyRows.length / historyPageSize)
            )
            const safePage = Math.min(historyPage, totalPages)
            const startIndex = (safePage - 1) * historyPageSize
            const pageRows = historyRows.slice(
              startIndex,
              startIndex + historyPageSize
            )

            return (
              <>
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Date</TableHead>
                        <TableHead className="font-bold">Start</TableHead>
                        <TableHead className="font-bold">End</TableHead>
                        <TableHead className="font-bold">Metric</TableHead>
                        <TableHead className="font-bold">Top X</TableHead>
                        <TableHead className="font-bold">Min</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isHistoryLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : pageRows.length > 0 ? (
                        pageRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="text-xs">
                              {row.created_at
                                ? new Date(row.created_at).toLocaleString()
                                : '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {row.startTime || '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {row.endTime || '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {row.metric || '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {row.topX ?? '-'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {row.minValue ?? '-'}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            No history found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {historyRows.length > historyPageSize && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      Page {safePage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setHistoryPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={safePage <= 1}
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setHistoryPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={safePage >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </Modal>
      <Modal
        isOpen={isDistributeOpen}
        onClose={() => {
          setIsDistributeOpen(false)
        }}
      >
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-2 sm:p-3 space-y-4">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Distribute SBT/NFT
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select one token and distribute to filtered users.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokenSelect">SBT/NFT</Label>
            <Select
              value={selectedTokenKey}
              onValueChange={(value) => setSelectedTokenKey(value)}
            >
              <SelectTrigger id="tokenSelect" className="w-full">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {daoTokens.length > 0 ? (
                  daoTokens.map((token) => (
                    <SelectItem
                      key={`${token.address}-${token.tokenId}`}
                      value={`${token.address}-${token.tokenId}`}
                    >
                      {token.name || 'Token'} #{token.tokenId} ·{' '}
                      {token.isSBT ? 'SBT' : 'NFT'}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No tokens found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedToken && (
            <div className="rounded-lg border p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={getTokenImage(selectedToken.image)}
                    alt={selectedToken.name || 'Token'}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {selectedToken.name || 'Token'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    #{selectedToken.tokenId} ·{' '}
                    {selectedToken.isSBT ? 'SBT' : 'NFT'}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedToken.description || 'No description'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">
                    Voting Power:
                  </span>{' '}
                  {formatVotingPower(selectedToken.votingPower)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    Token Address:
                  </span>
                  <span>{shortenAddress(selectedToken.address)}</span>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedToken.address)
                      toast({ title: 'Token address copied!' })
                    }}
                    title="Copy token address"
                  >
                    <CopyIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">DAO ID:</span>
                  <span>{shortenAddress(selectedToken.daoId)}</span>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedToken.daoId)
                      toast({ title: 'DAO ID copied!' })
                    }}
                    title="Copy DAO ID"
                  >
                    <CopyIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <div>
                  <span className="font-medium text-foreground">Created:</span>{' '}
                  {selectedToken.created_at
                    ? new Date(selectedToken.created_at).toLocaleString()
                    : '-'}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <span>Filtered users: {filteredMembers.length}</span>
            <span>
              Distribution is enabled when filtered users are more than 1.
            </span>
          </div>

          <Button
            className="w-full"
            onClick={handleDistribute}
            disabled={
              isDistributing || !selectedToken || filteredMembers.length < 1
            }
          >
            {isDistributing ? 'Distributing...' : 'Distribute'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
