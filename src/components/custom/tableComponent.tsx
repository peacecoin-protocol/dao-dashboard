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
import { shortenAddress, timestampToDate } from '../utils'
import { formatEther } from 'ethers'
import { Metadata } from '~/i18n/types'
import Image from 'next/image'

const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

// export interface CampaignInfo {
//   id: string
//   image: string
//   tokenId: string
//   title: string
//   description: string
//   isValidateSignatures: boolean
//   totalClaimAmount: string
//   claimedAmount: string
//   claimAmount: string
//   totalClaimedAmount: string
//   tokenType: string
//   startTime: string
//   endTime: string
//   isEnded: boolean
// }

interface CampaignTableProps {
  headers: string[]
  campaignInfo: CAMPAIGN[]
  onCampaignClick?: (campaignId: string) => void
  nftMetadata: Metadata[]
  sbtMetadata: Metadata[]
}

export function TableComponent({
  headers,
  campaignInfo,
  onCampaignClick,
  nftMetadata,
  sbtMetadata,
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
          {campaignInfo.length > 0 &&
            sbtMetadata &&
            nftMetadata &&
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
                        campaign.tokenType == 1
                          ? sbtMetadata.find(
                              (m) => m.tokenId == campaign.sbtId.toString()
                            )?.image || EMPTY_NFT_IMAGE
                          : campaign.tokenType == 2
                            ? nftMetadata.find(
                                (m) => m.tokenId == campaign.sbtId.toString()
                              )?.image || EMPTY_NFT_IMAGE
                            : EMPTY_NFT_IMAGE
                      }
                      alt={
                        campaign.tokenType == 1
                          ? sbtMetadata.find(
                              (m) => m.tokenId == campaign.sbtId.toString()
                            )?.name || ''
                          : campaign.tokenType == 2
                            ? nftMetadata.find(
                                (m) => m.tokenId == campaign.sbtId.toString()
                              )?.name || ''
                            : ''
                      }
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
                    ? (campaign.totalClaimed ?? '0')
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
                  {shortenAddress(
                    campaign.tokenType == 1
                      ? sbtMetadata.find(
                          (m) => m.tokenId == campaign.sbtId.toString()
                        )?.daoId || ''
                      : campaign.tokenType == 2
                        ? nftMetadata.find(
                            (m) => m.tokenId == campaign.sbtId.toString()
                          )?.daoId || ''
                        : ''
                  )}
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
