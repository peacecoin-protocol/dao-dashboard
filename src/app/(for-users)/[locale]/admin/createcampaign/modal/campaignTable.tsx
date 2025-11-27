import { Card, CardContent } from '~/components/ui/card'
import { CAMPAIGN } from '~/i18n/types'
import { formatEther, parseEther } from 'ethers'
import { timestampToDate } from '~/components/utils'
import { Badge } from '~/components/ui/badge'

// Mobile Campaign Card Component
const CampaignCard = ({
  campaign,

  onCampaignClick,
  totalClaimed,
  index,
  campaignDict,
}: {
  campaign: CAMPAIGN

  onCampaignClick: (index: number) => void
  totalClaimed: { campaignId: number; totalClaimed: string }[]
  index: number
  campaignDict: any
}) => {
  const claimedAmount =
    totalClaimed.find((t) => t.campaignId === campaign.campaignId)
      ?.totalClaimed ?? '0'

  return (
    <Card
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onCampaignClick(index)}
    >
      <CardContent className="p-4 space-y-4">
        {/* Header with Image and Basic Info */}
        <div className="flex items-start gap-4">
          {/* <Image
            src={
              campaign.tokenType == 1
                ? sbtMetadata?.find((m) => m.token_id == campaign.sbtId)
                    ?.image || EMPTY_NFT_IMAGE
                : campaign.tokenType == 2
                  ? nftMetadata?.find((m) => m.token_id == campaign.sbtId)
                      ?.image || EMPTY_NFT_IMAGE
                  : PCE_LOGO
            }
            alt={`Campaign ${campaign.campaignId}`}
            width={64}
            height={64}
          /> */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {campaign.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {campaign.description}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <Badge variant="secondary" className="flex-shrink-0">
                  #{campaign.campaignId}
                </Badge>
                <Badge
                  variant={
                    parseInt(campaign.endDate) < Date.now() / 1000
                      ? 'destructive'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {parseInt(campaign.endDate) < Date.now() / 1000
                    ? (campaignDict.ended ?? 'Ended')
                    : (campaignDict.active ?? 'Active')}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.sbtIdHeader ?? 'SBT ID'}:
            </span>
            <span className="ml-2">{campaign.sbtId}</span>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.typeHeader ?? 'Type'}:
            </span>
            <span className="ml-2">
              {campaign.validateSignatures
                ? (campaignDict.whitelistVerifySignature ??
                  'Whitelist + Verify Signature')
                : (campaignDict.whitelist ?? 'Whitelist')}
            </span>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.rewardType ?? 'Reward Type'}:
            </span>
            <span className="ml-2">
              {campaign.tokenType == 1
                ? (campaignDict.sbt ?? 'SBT')
                : campaign.tokenType == 2
                  ? (campaignDict.nft ?? 'NFT')
                  : (campaignDict.pce ?? 'PCE')}
            </span>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.claimAmountHeader ?? 'Claim Amount'}:
            </span>
            <span className="ml-2">
              {campaign.tokenType == 0
                ? formatEther(parseEther(campaign.claimAmount as string))
                : campaign.claimAmount}
            </span>
          </div>
        </div>

        {/* Amount Information */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm">
            <span className="font-medium text-muted-foreground">
              {campaignDict.totalClaimed ?? 'Total Claimed / Total Amount'}:
            </span>
            <div className="mt-1 font-mono text-xs">
              {campaign.tokenType == 1
                ? `${claimedAmount} / ${campaign.totalAmount} SBTs`
                : campaign.tokenType == 2
                  ? `${claimedAmount} / ${campaign.totalAmount} NFTs`
                  : `${formatEther(claimedAmount)} / ${formatEther(campaign.totalAmount ?? '0')} PCE`}
            </div>
          </div>
        </div>

        {/* Time Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.startTimeHeader ?? 'Start'}:
            </span>
            <div className="text-xs mt-1">
              {timestampToDate(parseInt(campaign.startDate))}
            </div>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">
              {campaignDict.endTimeHeader ?? 'End'}:
            </span>
            <div className="text-xs mt-1">
              {timestampToDate(parseInt(campaign.endDate))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const CampaignsTable = ({
  campaigns,
  onCampaignClick,
  totalClaimed,
  campaign,
}: {
  campaigns: CAMPAIGN[]
  onCampaignClick: (index: number) => void
  totalClaimed: { campaignId: number; totalClaimed: string }[]
  campaign: any
}) => {
  return (
    <div className="space-y-6">
      {/* Mobile View - Cards */}
      <div className="gap-4">
        {campaigns.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">
                {campaign.noCampaigns ?? 'No Campaigns at the moment'}
              </div>
            </CardContent>
          </Card>
        ) : (
          campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
              onCampaignClick={onCampaignClick}
              totalClaimed={totalClaimed}
              index={index}
              campaignDict={campaign}
            />
          ))
        )}
      </div>
    </div>
  )
}
