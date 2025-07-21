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
}: {
  campaigns: CAMPAIGN[]
  metadata: Metadata[]
  onCampaignClick: (index: number) => void
}) => (
  <Card>
    <CardContent>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>SBT ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
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
                <TableCell>{campaign.campaignId}</TableCell>
                <TableCell>
                  <Image
                    src={
                      metadata.find((m) => m.token_id == campaign.campaignId)
                        ?.image || EMPTY_NFT_IMAGE
                    }
                    alt={`NFT #${index}`}
                    className="rounded-lg object-contain"
                    width={120}
                    height={120}
                  />
                </TableCell>
                <TableCell>{campaign.sbtId}</TableCell>
                <TableCell>{campaign.title}</TableCell>
                <TableCell>
                  {campaign.validateSignatures
                    ? 'Verify Signature'
                    : 'Whitelist'}
                </TableCell>
                <TableCell>
                  {campaign.isNFT
                    ? campaign.amount
                    : formatEther(campaign.amount ?? '0')}
                </TableCell>
                <TableCell>{campaign.isNFT ? 'SBT' : 'PCE'}</TableCell>
                <TableCell>
                  {timestampToDate(parseInt(campaign.startDate))}
                </TableCell>
                <TableCell>
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
