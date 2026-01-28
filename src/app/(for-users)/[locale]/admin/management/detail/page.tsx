'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount, useReadContract } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'
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
import { Env } from '~/env'
import { daoStudioAddress, defaultChainId } from '~/app/constants/constants'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'

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
  rawContract?: {
    value?: string
    decimal?: string
  }
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
  const { chainId } = useAccount()

  const [members, setMembers] = useState<MemberRow[]>([])
  const [memberStats, setMemberStats] = useState<Record<string, MemberStats>>(
    {}
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isStatsLoading, setIsStatsLoading] = useState(false)

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
    const fetchMembers = async () => {
      if (!daoId) {
        setMembers([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const { data } = await supabase
        .from('Members')
        .select('id, userAddr, created_at')
        .eq('daoId', daoId)
        .order('created_at', { ascending: true })

      setMembers((data as MemberRow[]) || [])
      setIsLoading(false)
    }

    fetchMembers()
  }, [daoId, supabase])

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
      const transfers: AlchemyTransfer[] = []
      let pageKey: string | undefined

      do {
        const requestParams: Record<string, unknown> = {
          fromBlock: '0x0',
          toBlock: 'latest',
          excludeZeroValue: false,
          withMetadata: false,
          category: ['erc20'],
          contractAddresses: [communityTokenAddress],
          ...params,
        }

        if (pageKey) {
          requestParams.pageKey = pageKey
        }

        console.log("reXXXs")

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

        console.log(response, "res")

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

      return transfers
    }

    const fetchMemberStats = async (memberAddr: string) => {
      const address = memberAddr.toLowerCase()
      const [sent, received] = await Promise.all([
        fetchAllTransfers({ fromAddress: address }),
        fetchAllTransfers({ toAddress: address }),
      ])

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
        (transfer) => transfer.from?.toLowerCase() === address
      )
      const receivedTransfers = received.filter(
        (transfer) => transfer.to?.toLowerCase() === address
      )

      const receiveAmount = receivedTransfers.reduce(
        (sum, transfer) => sum + parseTransferValue(transfer),
        BigInt(0)
      )
      const sendAmount = sentTransfers.reduce(
        (sum, transfer) => sum + parseTransferValue(transfer),
        BigInt(0)
      )

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
  }, [communityTokenAddress, members])

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <PageHeaderSection title="Management Detail" />
        <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
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
              ) : members.length > 0 ? (
                members.map((member, index) => {
                  const stats = memberStats[member.userAddr.toLowerCase()]
                  const isStatsPending = isStatsLoading && !stats
                  const receiveCount = stats?.receiveCount ?? 0
                  const sendAmount = stats?.sendAmount ?? BigInt(0)
                  const receiveAmount = stats?.receiveAmount ?? BigInt(0)

                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-bold">{index + 1}</TableCell>
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
                        {isStatsPending ? 'Loading...' : formatAmount(sendAmount)}
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
                    No members found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
