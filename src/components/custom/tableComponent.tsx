'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { CAMPAIGN } from '~/i18n/types'
import { timestampToDate } from '../utils'
import { formatEther } from 'ethers'
import Image from 'next/image'
import { Env } from '~/env'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { shortenAddress } from '../utils'
import { Badge } from '~/components/ui/badge'

interface CampaignTableProps {
  headers: string[]
  campaignInfo: CAMPAIGN[]
  onCampaignClick?: (campaignId: string) => void
}

export function TableComponent({
  headers,
  campaignInfo,
  onCampaignClick,
}: CampaignTableProps) {
  const hasCampaigns = campaignInfo && campaignInfo.length > 0

  const getRewardType = (tokenType: number) => {
    if (tokenType === 1) return 'SBT'
    if (tokenType === 2) return 'NFT'
    return 'ERC20'
  }

  const getAccessType = (campaign: CAMPAIGN) =>
    campaign.validateSignatures ? 'Whitelist + Signature' : 'Whitelist'

  return (
    <div className="w-full space-y-6">
      <div className="hidden overflow-x-auto rounded-xl border lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="whitespace-nowrap text-center"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasCampaigns ? (
              campaignInfo.map((campaign, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    onCampaignClick?.(campaign.campaignId.toString())
                  }
                >
                  <TableCell className="text-center">
                    {campaign.campaignId}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Image
                        src={
                          campaign.image
                            ? `${Env.PINATA_GATEWAY_URL}/ipfs/${campaign.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
                            : EMPTY_NFT_IMAGE
                        }
                        alt={campaign.title || ''}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {campaign.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {getAccessType(campaign)}
                  </TableCell>
                  <TableCell className="text-center">
                    {campaign.tokenType != 0
                      ? (campaign.claimedAmount ?? '0')
                      : formatEther(campaign.totalClaimed ?? '0')}{' '}
                    /{' '}
                    {campaign.tokenType != 0
                      ? campaign.totalAmount
                      : formatEther(campaign.totalAmount ?? '0')}
                  </TableCell>

                  <TableCell className="text-center">
                    {campaign.tokenType != 0
                      ? campaign.claimAmount
                      : formatEther(campaign.claimAmount ?? '0')}
                  </TableCell>
                  <TableCell className="text-center">
                    {getRewardType(campaign.tokenType ?? 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {campaign.sbtId}
                  </TableCell>
                  <TableCell className="text-center">
                    {shortenAddress(campaign.daoId || '')}
                  </TableCell>
                  <TableCell className="text-center">
                    {timestampToDate(Number(campaign.startDate))}
                  </TableCell>
                  <TableCell className="text-center">
                    {timestampToDate(Number(campaign.endDate))}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          Number(campaign.endDate) < new Date().getTime() / 1000
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {Number(campaign.endDate) < new Date().getTime() / 1000
                          ? 'Ended'
                          : 'Active'}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="text-center text-sm text-muted-foreground"
                >
                  No campaigns found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center font-medium"
              >
                Total: {(campaignInfo && campaignInfo.length) ?? '0'}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="space-y-4 lg:hidden">
        {hasCampaigns ? (
          campaignInfo.map((campaign, index) => {
            const rewardType = getRewardType(campaign.tokenType ?? 0)
            const isEnded =
              Number(campaign.endDate) < new Date().getTime() / 1000

            return (
              <button
                key={index}
                type="button"
                onClick={() =>
                  onCampaignClick?.(campaign.campaignId.toString())
                }
                className="w-full rounded-2xl border border-gray-200 bg-white/90 p-4 text-left shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={
                            campaign.image
                              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${campaign.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
                              : EMPTY_NFT_IMAGE
                          }
                          alt={campaign.title || ''}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
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
                    <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Status
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                          isEnded ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      >
                        {isEnded ? 'Ended' : 'Active'}
                      </span>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div>
                      <dt className="font-medium text-foreground">
                        Campaign ID
                      </dt>
                      <dd>{campaign.campaignId}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Access</dt>
                      <dd>{getAccessType(campaign)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Reward</dt>
                      <dd>
                        {campaign.tokenType != 0
                          ? campaign.claimAmount
                          : formatEther(campaign.claimAmount ?? '0')}{' '}
                        per claim
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Claimed</dt>
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
                    <div>
                      <dt className="font-medium text-foreground">DAO</dt>
                      <dd>{shortenAddress(campaign.daoId || '')}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">
                        SBT/NFT ID
                      </dt>
                      <dd>{campaign.sbtId}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Start</dt>
                      <dd>{timestampToDate(Number(campaign.startDate))}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">End</dt>
                      <dd>{timestampToDate(Number(campaign.endDate))}</dd>
                    </div>
                  </dl>
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
    </div>
  )
}
