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

interface CampaignTableProps {
  headers: string[]
  campaignInfo: CAMPAIGN[]
  onCampaignClick?: (campaignId: string) => void
  searchTerm?: string
}

export function TableComponent({
  headers,
  campaignInfo,
  onCampaignClick,
  searchTerm,
}: CampaignTableProps) {
  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="whitespace-nowrap text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaignInfo &&
            campaignInfo.length > 0 &&
            campaignInfo.map((campaign, index) => (
              <TableRow
                key={index}
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
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">{campaign.title}</TableCell>
                <TableCell className="text-center">
                  {campaign.description}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.validateSignatures
                    ? 'Whitelist + Verify Signature'
                    : 'Whitelist'}
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
                  {campaign.tokenType == 1
                    ? 'SBT'
                    : campaign.tokenType == 2
                      ? 'NFT'
                      : 'ERC20'}
                </TableCell>
                <TableCell className="text-center">{campaign.sbtId}</TableCell>
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
            ))}
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
  )
}
