'use client'

import { useEffect, useState } from 'react'
import { CAMPAIGN } from '~/i18n/types'
import { timestampToDate } from '../utils'
import { formatEther } from 'ethers'
import Image from 'next/image'
import { Env } from '~/env'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { shortenAddress } from '../utils'
import { Badge } from '~/components/ui/badge'
import { createClient } from '~/utils/supabase/client'
import { Button } from '~/components/ui/button'

interface CampaignTableProps {
  headers: string[]
  campaignInfo: CAMPAIGN[]
  onCampaignClick?: (campaignId: string) => void
  onCellClick?: (campaignId: number) => void
}

export function TableComponent({
  headers,
  campaignInfo,
  onCampaignClick,
  onCellClick,
}: CampaignTableProps) {
  const [daoNames, setDaoNames] = useState<Record<string, string>>({})
  const supabase = createClient()
  const hasCampaigns = campaignInfo && campaignInfo.length > 0

  useEffect(() => {
    const fetchDaoNames = async () => {
      if (!campaignInfo || campaignInfo.length === 0) return

      // Get unique DAO IDs
      const uniqueDaoIds = [
        ...new Set(
          campaignInfo.map((campaign) => campaign.daoId).filter(Boolean)
        ),
      ]

      if (uniqueDaoIds.length === 0) return

      // Fetch DAO names for all unique DAO IDs
      try {
        const { data, error } = await supabase
          .from('DAO')
          .select('daoId, daoName')
          .in('daoId', uniqueDaoIds)

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
  }, [campaignInfo, supabase])

  const getRewardType = (tokenType: number) => {
    if (tokenType === 1) return 'SBT'
    if (tokenType === 2) return 'NFT'
    return 'ERC20'
  }

  const getAccessType = (campaign: CAMPAIGN) =>
    campaign.validateSignatures ? 'Whitelist + Signature' : 'Whitelist'

  const getDaoDisplay = (daoId: string) => {
    if (!daoId) return '-'
    const daoName = daoNames[daoId]
    if (daoName) {
      return `${daoName} (${shortenAddress(daoId)})`
    }
    return shortenAddress(daoId)
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        {hasCampaigns ? (
          campaignInfo.map((campaign, index) => {
            const rewardType = getRewardType(campaign.tokenType ?? 0)
            const isEnded =
              Number(campaign.endDate) < new Date().getTime() / 1000

            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onCampaignClick?.(campaign.campaignId.toString())
                  onCellClick?.(campaign.campaignId)
                }}
                className="w-full rounded-2xl border border-gray-200 bg-white/90 p-4 text-left shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={
                            campaign.image
                              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${campaign.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
                              : EMPTY_NFT_IMAGE
                          }
                          alt={campaign.title || ''}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                          sizes="(max-width: 640px) 80px, 96px"
                        />
                      </div>
                      <div className="space-y-1">
                        <Badge
                          variant="outline"
                          className="w-fit text-xs font-semibold uppercase tracking-wide"
                        >
                          {rewardType}
                        </Badge>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {campaign.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {campaign.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 sm:flex-col sm:items-center sm:gap-1 sm:ml-auto">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                          isEnded ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      >
                        {isEnded ? 'Ended' : 'Active'}
                      </span>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        Campaign ID:
                      </dt>
                      <dd>{campaign.campaignId}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">Access:</dt>
                      <dd>{getAccessType(campaign)}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">Reward:</dt>
                      <dd>
                        {campaign.tokenType != 0
                          ? campaign.claimAmount
                          : formatEther(campaign.claimAmount ?? '0')}{' '}
                        per claim
                      </dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">Claimed:</dt>
                      <dd>
                        {campaign.tokenType != 0
                          ? (campaign.claimedAmount ?? '0')
                          : formatEther(campaign.totalClaimed ?? '0')}
                        {' / '}
                        {campaign.tokenType != 0
                          ? campaign.totalAmount
                          : formatEther(campaign.totalAmount ?? '0')}
                      </dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">DAO:</dt>
                      <dd>{getDaoDisplay(campaign.daoId || '')}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">
                        SBT/NFT ID:
                      </dt>
                      <dd>{campaign.sbtId}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">Start:</dt>
                      <dd>{timestampToDate(Number(campaign.startDate))}</dd>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <dt className="font-medium text-foreground">End:</dt>
                      <dd>{timestampToDate(Number(campaign.endDate))}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onCellClick?.(campaign.campaignId)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Whitelist
                    </Button>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-muted-foreground dark:border-gray-700 dark:bg-gray-900/40">
            No campaigns found
          </div>
        )}
      </div>

      {/* Total Footer */}
      <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 text-center font-medium text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-900/70 dark:text-white">
        Total: {(campaignInfo && campaignInfo.length) ?? '0'}
      </div>
    </div>
  )
}
