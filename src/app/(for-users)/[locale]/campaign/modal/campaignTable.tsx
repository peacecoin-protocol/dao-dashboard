import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { CAMPAIGN, Metadata } from '~/i18n/types'
import { formatEther } from 'ethers'
import { timestampToDate } from '~/components/utils'
import Image from 'next/image'

const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

export const CampaignsTable = ({
  campaigns,
  metadata,
  onCampaignClick,
  totalClaimed,
}: {
  campaigns: CAMPAIGN[]
  metadata: Metadata[]
  onCampaignClick: (index: number) => void
  totalClaimed: { campaignId: number; totalClaimed: string }[]
}) => (
  <Card>
    <CardContent>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Campaign ID</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">SBT ID</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">
              Total Claimed Amount / Total Amount
            </TableHead>
            <TableHead className="text-center">Claim Amount</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Start Time</TableHead>
            <TableHead className="text-center">End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-gray-500 items-center justify-center"
              >
                No Campaigns at the moment
              </TableCell>
            </TableRow>
          ) : (
            campaigns.map((campaign, index) => (
              <TableRow
                key={index}
                onClick={() => onCampaignClick(index)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="text-center">
                  {campaign.campaignId}
                </TableCell>
                <TableCell className="items-center justify-center flex">
                  <Image
                    src={
                      metadata.find((m) => m.token_id == campaign.sbtId)
                        ?.image || EMPTY_NFT_IMAGE
                    }
                    alt={`NFT #${index}`}
                    className="rounded-lg object-contain"
                    width={120}
                    height={120}
                  />
                </TableCell>
                <TableCell className="text-center">{campaign.sbtId}</TableCell>
                <TableCell className="text-center">{campaign.title}</TableCell>
                <TableCell className="text-center">
                  {campaign.validateSignatures
                    ? 'Whitelist + Verify Signature'
                    : 'Whitelist'}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.isNFT
                    ? `${totalClaimed.find((t) => t.campaignId === campaign.campaignId)?.totalClaimed ?? '0'} / ${campaign.totalAmount}`
                    : `${formatEther(totalClaimed.find((t) => t.campaignId === campaign.campaignId)?.totalClaimed ?? '0') ?? '0'} / ${formatEther(campaign.totalAmount ?? '0')}`}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.claimAmount}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.isNFT ? 'SBT' : 'PCE'}
                </TableCell>
                <TableCell className="text-center">
                  {timestampToDate(parseInt(campaign.startDate))}
                </TableCell>
                <TableCell className="text-center">
                  {timestampToDate(parseInt(campaign.endDate))}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)
