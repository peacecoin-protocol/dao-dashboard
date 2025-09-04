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
import Image from 'next/image'
import { timestampToDate } from '../utils'

export interface CampaignInfo {
  id: string
  image: string
  tokenId: string
  title: string
  description: string
  isValidateSignatures: boolean
  totalClaimAmount: string
  claimedAmount: string
  claimAmount: string
  totalClaimedAmount: string
  tokenType: string
  startTime: string
  endTime: string
  isEnded: boolean
}

interface CampaignTableProps {
  headers: string[]
  campaignInfo: CampaignInfo[]
}

export function TableComponent({ headers, campaignInfo }: CampaignTableProps) {
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
            campaignInfo.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {campaign.tokenId}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
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
                  {campaign.isValidateSignatures
                    ? 'Whitelist + Verify Signature'
                    : 'Whitelist'}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.totalClaimAmount}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.claimAmount}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.tokenType}
                </TableCell>
                <TableCell className="text-center">
                  {timestampToDate(Number(campaign.startTime))}
                </TableCell>
                <TableCell className="text-center">
                  {timestampToDate(Number(campaign.endTime))}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        campaign.isEnded
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {campaign.isEnded ? 'Ended' : 'Active'}
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
