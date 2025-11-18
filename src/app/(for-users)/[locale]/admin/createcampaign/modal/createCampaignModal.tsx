import { useEffect, useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'

import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useAccount } from 'wagmi'
import { createClient } from '~/utils/supabase/client'
import { Env } from '~/env'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import Image from 'next/image'

export const CreateCampaignModal = ({
  isOpen,
  onClose,
  onSubmit,
  campaign,
  setIsInvalidToken,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  campaign: any
  setIsInvalidToken: (value: boolean) => void
}) => {
  const { toast } = useToast()
  const { address } = useAccount()
  const supabase = createClient()
  const [tokenInfo, setTokenInfo] = useState<SBTInfo | null>(null)
  const [form, setForm] = useState({
    sbtId: 0,
    title: '',
    description: '',
    totalAmount: '',
    claimAmount: '',
    startDate: '',
    endDate: '',
    isVerifySignature: true,
    tokenType: 0,
    tokenAddress: '',
  })

  useEffect(() => {
    const fetchTokenData = async () => {
      const { data } = await supabase
        .from('Token')
        .select()
        .eq('isSBT', form.tokenType == 1 ? true : false)
        .eq('tokenId', form.sbtId.toString())

      if (data && data.length > 0) {
        setTokenInfo(data[0])
      } else {
        setTokenInfo(null)
      }
    }
    fetchTokenData()
  }, [address, form.tokenType, form.sbtId, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'sbtId' && value == '0' && form.tokenType == 1) {
      toast({
        title: 'SBT ID must be greater than 0',
      })
      return
    } else if (name === 'sbtId' && value == '0' && form.tokenType == 2) {
      toast({
        title: 'NFT ID must be greater than 0',
      })
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (
      (form.sbtId == 0 && form.tokenAddress == '') ||
      form.title === '' ||
      form.description === '' ||
      form.totalAmount === '' ||
      form.claimAmount === '' ||
      form.startDate === '' ||
      form.endDate === ''
    ) {
      toast({
        title: 'Please fill in all fields',
        variant: 'destructive',
      })
      return
    }

    if (Number(form.totalAmount) == 0) {
      toast({
        title: 'Total Amount must be greater than 0',
      })
      return
    }

    if (Number(form.claimAmount) == 0) {
      toast({
        title: 'Claim Amount must be greater than 0',
      })
      return
    }

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      toast({
        title: 'Start date must be before end date',
      })
      return
    }

    onSubmit(form)
    setForm({
      sbtId: 0,
      title: '',
      description: '',
      totalAmount: '',
      claimAmount: '',
      startDate: '',
      endDate: '',
      isVerifySignature: true,
      tokenType: 0,
      tokenAddress: '',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {campaign.createCampaign ?? 'Create Campaign'}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Campaign Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="campaign-type">
              {campaign.campaignType ?? 'Campaign Type'}
            </Label>
            <Select
              value={
                form.tokenType == 1
                  ? 'SBT'
                  : form.tokenType == 2
                    ? 'NFT'
                    : 'Token'
              }
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  tokenType: value === 'SBT' ? 1 : value === 'NFT' ? 2 : 0,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    campaign.selectCampaignType ?? 'Select campaign type'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SBT">{campaign.sbt ?? 'SBT'}</SelectItem>
                <SelectItem value="NFT">{campaign.nft ?? 'NFT'}</SelectItem>
                <SelectItem value="Token">
                  {campaign.token ?? 'Token'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SBT ID Input */}

          <div className="space-y-2">
            <Label htmlFor="sbt-id">
              {form.tokenType == 1
                ? 'SBT ID'
                : form.tokenType == 2
                  ? 'NFT ID'
                  : 'Token Address'}
            </Label>
            {form.tokenType != 0 && (
              <Input
                id="sbt-id"
                type="text"
                name="sbtId"
                placeholder={
                  form.tokenType == 2
                    ? (campaign.enterNftId ?? 'Enter NFT ID')
                    : (campaign.enterNftId ?? 'Enter SBT ID')
                }
                value={form.sbtId == 0 ? '' : form.sbtId.toString()}
                onChange={handleChange}
                className="w-full"
              />
            )}

            {form.tokenType == 0 && (
              <Input
                id="token-address"
                type="text"
                name="tokenAddress"
                placeholder={
                  campaign.enterTokenAddress ?? 'Enter Token Address'
                }
                value={form.tokenAddress}
                onChange={handleChange}
                className="w-full"
              />
            )}

            {form.tokenType != 0 &&
              form.sbtId != 0 &&
              (() => {
                const isOwner = tokenInfo?.creator == address
                setIsInvalidToken(!isOwner)

                return (
                  <div className="flex justify-center flex-col items-center">
                    <Image
                      src={
                        tokenInfo
                          ? `${Env.PINATA_GATEWAY_URL}/ipfs/${tokenInfo?.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
                          : EMPTY_NFT_IMAGE
                      }
                      alt={tokenInfo?.name || ''}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                    {!isOwner && tokenInfo && (
                      <span className="text-sm text-gray-500 mt-2">
                        You are not the owner of this Token
                      </span>
                    )}
                  </div>
                )
              })()}
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder={
                campaign.enterCampaignTitle ?? 'Enter campaign title'
              }
              value={form.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              name="description"
              placeholder={
                campaign.enterCampaignDescription ??
                'Enter campaign description'
              }
              value={form.description}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Amount Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total-amount">
                {campaign.totalAmount ?? 'Total Amount'}
              </Label>
              <Input
                id="total-amount"
                type="text"
                name="totalAmount"
                placeholder={campaign.enterTotalAmount ?? 'Enter total amount'}
                value={form.totalAmount}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claim-amount">
                {campaign.claimAmount ?? 'Claim Amount'}
              </Label>
              <Input
                id="claim-amount"
                type="text"
                name="claimAmount"
                placeholder={campaign.enterClaimAmount ?? 'Enter claim amount'}
                value={form.claimAmount}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Verification Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="verification-type">
              {campaign.verificationType ?? 'Verification Type'}
            </Label>
            <Select
              value={form.isVerifySignature ? 'verifySignature' : 'whitelist'}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  isVerifySignature: value === 'verifySignature',
                }))
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    campaign.selectVerificationType ??
                    'Select verification type'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verifySignature">
                  {campaign.whitelistVerifySignature ??
                    'Whitelist + Verify Signature'}
                </SelectItem>
                <SelectItem value="whitelist">
                  {campaign.whitelist ?? 'Whitelist'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">
                {campaign.startDateTime ?? 'Start Date & Time'}
              </Label>
              <Input
                id="start-date"
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">
                {campaign.endDateTime ?? 'End Date & Time'}
              </Label>
              <Input
                id="end-date"
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full">
            {campaign.createCampaign ?? 'Create Campaign'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
