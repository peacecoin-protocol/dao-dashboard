'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ActionInfo, Dictionary, Locale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import { appDeploymentEnv, EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { shortenAddress } from '../utils'
import { Env } from '~/env'
import { createClient } from '~/utils/supabase/client'
import { formatEther } from 'ethers'
import CopyIcon from '../../../public/svg/copy'
import { useToast } from '~/hooks/use-toast'
export interface SBTInfo {
  tokenId: string
  creator: string
  address: string
  daoId: string
  balance: number
  votingPower: string
  isRevoked: boolean
  isSBT: boolean
  description: string
  name: string
  image: string
  created_at: string
  updated_at: string
}

interface SBTTableProps {
  sbtInfo: SBTInfo[]
  totalCount?: number
  action?: ActionInfo
  onRevoke?: (token: SBTInfo) => void
}

export function SBTTableComponent({
  sbtInfo,
  totalCount,
  action,
  onRevoke,
}: SBTTableProps) {
  const [daoNames, setDaoNames] = useState<Record<string, string>>({})
  const [dict, setDict] = useState<Dictionary | null>(null)
  const supabase = createClient()
  const pathname = usePathname()
  const { toast } = useToast()

  // Extract locale from pathname
  const locale: Locale =
    (pathname?.match(/^\/([a-z]{2})(\/|$)/)?.[1] as Locale) || 'en'

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

  useEffect(() => {
    const fetchDaoNames = async () => {
      if (!sbtInfo || sbtInfo.length === 0) return

      // Get unique DAO IDs
      const uniqueDaoIds = [...new Set(sbtInfo.map((sbt) => sbt.daoId))]

      // Fetch DAO names for all unique DAO IDs
      try {
        const { data, error } = await supabase
          .from('DAO')
          .select('daoId, daoName')
          .in('daoId', uniqueDaoIds)
          .eq('environment', appDeploymentEnv)
        if (error) {
          console.error('Error fetching DAO names:', error)
          return
        }

        // Create a map of daoId -> daoName
        const daoNameMap: Record<string, string> = {}
        if (data) {
          data.forEach((dao) => {
            daoNameMap[dao.daoId] = dao.daoName
          })
        }
        setDaoNames(daoNameMap)
      } catch (error) {
        console.error('Error fetching DAO names:', error)
      }
    }

    fetchDaoNames()
  }, [sbtInfo, supabase])

  const handleRevoke = (token: SBTInfo) => {
    onRevoke?.(token)
  }

  const getImageSrc = (image?: string) => {
    if (!image) return EMPTY_NFT_IMAGE
    return `${Env.PINATA_GATEWAY_URL}/ipfs/${image}`
  }

  const getDaoDisplay = (daoId: string) => {
    const daoName = daoNames[daoId]
    if (daoName) {
      return `${daoName} (${shortenAddress(daoId)})`
    }
    return shortenAddress(daoId)
  }

  const totalValue =
    typeof totalCount === 'number' ? totalCount : (sbtInfo?.length ?? 0)
  return (
    <div className="w-full space-y-6">
      {/* Mobile/Tablet View - Card layout for all screens */}
      <div className="space-y-4">
        {sbtInfo && sbtInfo.length > 0 ? (
          sbtInfo.map((sbt, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-4 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={getImageSrc(sbt.image)}
                        alt={sbt.name || ''}
                        width={96}
                        height={96}
                        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover aspect-square"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                      />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                        {sbt.isSBT
                          ? dict?.sbt?.sbt || 'SBT'
                          : dict?.sbt?.nft || 'NFT'}
                      </span>
                      <p className="text-base font-semibold text-gray-900 dark:text-white break-words">
                        {sbt.name}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 break-words">
                        {sbt.description}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.tokenId || 'Token ID:'}
                      </dt>
                      <dd className="break-all">{sbt.tokenId}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.balance || 'Balance:'}
                      </dt>
                      <dd>{sbt.balance.toString()}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.votingPower || 'Voting Power:'}
                      </dt>
                      <dd>{formatEther(sbt.votingPower || '0')}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.dao || 'DAO:'}
                      </dt>
                      <dd className="break-words">
                        {getDaoDisplay(sbt.daoId)}
                      </dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.address || 'Address:'}
                      </dt>
                      <dd className="break-words flex items-center gap-0">
                        {shortenAddress(sbt.address)}
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(sbt.address)
                            toast({
                              title: 'Address copied!',
                            })
                          }}
                        >
                          <CopyIcon className="h-4 w-4 text-gray-400" />
                        </Button>
                      </dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        {dict?.sbt?.createdAt || 'Created At:'}
                      </dt>
                      <dd className="break-words">
                        {sbt.created_at
                          ? new Date(sbt.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )
                          : '-'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {action && (
                  <div className="flex md:items-center md:justify-end">
                    <Button
                      onClick={() => handleRevoke(sbt)}
                      className="w-full md:w-auto whitespace-nowrap"
                    >
                      {sbt.isRevoked
                        ? action.title.unrevoke
                        : action.title.revoke}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-6 text-center text-sm text-muted-foreground">
            {dict?.sbt?.noTokensAvailable || 'No tokens available'}
          </div>
        )}
      </div>

      {/* Total Footer */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/70 p-4 text-center font-medium text-sm text-gray-900 dark:text-white">
        {dict?.sbt?.total || 'Total:'} {totalValue}
      </div>
    </div>
  )
}
