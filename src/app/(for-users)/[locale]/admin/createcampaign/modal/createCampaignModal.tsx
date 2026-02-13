import { useEffect, useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DateTimePicker } from '~/components/ui/date-time-picker'
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
import { SupabaseDao } from '~/i18n/types'
import { DaoSearchSelect } from '~/components/custom/dao-search-select'

export const CreateCampaignModal = ({
  isOpen,
  onClose,
  onSubmit,
  campaign,
  setIsInvalidToken,
  allDAOs,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  campaign: any
  setIsInvalidToken: (value: boolean) => void
  allDAOs: SupabaseDao[]
  allTokens: SBTInfo[]
}) => {
  const { toast } = useToast()
  const { address } = useAccount()
  const supabase = createClient()
  const [tokenInfo, setTokenInfo] = useState<SBTInfo | null>(null)
  const [form, setForm] = useState({
    daoId: '',
    daoSearch: '',
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
        .eq('daoId', form.daoId)
        .eq('tokenId', form.sbtId.toString())

      if (data && data.length > 0) {
        setTokenInfo(data[0])
      } else {
        setTokenInfo(null)
      }
    }
    fetchTokenData()
  }, [address, form.tokenType, form.sbtId, supabase])

  const shouldValidateToken = form.tokenType != 0 && form.sbtId != 0
  const isOwner = tokenInfo?.creator == address

  useEffect(() => {
    if (!shouldValidateToken) {
      setIsInvalidToken(false)
      return
    }
    setIsInvalidToken(!isOwner)
  }, [shouldValidateToken, isOwner, setIsInvalidToken])

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

  const onFormChange = (name: string, value: any) => {
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
      daoId: '',
      daoSearch: '',
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

  const hasTokenIdentifier =
    form.tokenType === 0
      ? form.tokenAddress.trim().length > 0
      : Number(form.sbtId) > 0
  const isFormComplete = Boolean(
    form.daoId &&
      hasTokenIdentifier &&
      form.title.trim() &&
      form.description.trim() &&
      form.totalAmount.trim() &&
      form.claimAmount.trim() &&
      form.startDate &&
      form.endDate
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-2 sm:p-3 space-y-3">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            {campaign.createCampaign ?? 'Create Campaign'}
          </h2>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <DaoSearchSelect
              daoSearch={form.daoSearch}
              daoId={form.daoId}
              allDAOs={allDAOs}
              onDaoSearchChange={(value) => onFormChange('daoSearch', value)}
              onDaoIdChange={(value) => onFormChange('daoId', value)}
              labels={{
                dao: campaign.daoId ?? 'DAO ID',
                searchDao: campaign.searchDao,
                noDaoFound: campaign.noDaoFound,
              }}
              inputClassName="w-full h-8 text-sm mb-2"
            />
          </div>

          {/* Campaign Type Selection */}
          <div className="space-y-1">
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
              <SelectTrigger className="h-8 text-sm">
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

          <div className="space-y-1">
            <Label htmlFor="sbt-id">
              {form.tokenType == 1
                ? (campaign.sbtId ?? 'SBT ID')
                : form.tokenType == 2
                  ? (campaign.nftId ?? 'NFT ID')
                  : (campaign.tokenAddress ?? 'Token Address')}
            </Label>
            {form.tokenType != 0 && (
              <Input
                id="sbt-id"
                type="text"
                name="sbtId"
                placeholder={
                  form.tokenType == 2
                    ? (campaign.enterNftId ?? 'Enter NFT ID')
                    : (campaign.enterSbtId ?? 'Enter SBT ID')
                }
                value={form.sbtId == 0 ? '' : form.sbtId.toString()}
                onChange={handleChange}
                className="w-full h-8 text-sm"
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
                className="w-full h-8 text-sm"
              />
            )}

            {form.tokenType != 0 &&
              form.sbtId != 0 &&
              (
                <div className="flex justify-center flex-col items-center">
                  <Image
                    src={
                      tokenInfo
                        ? `${Env.PINATA_GATEWAY_URL}/ipfs/${tokenInfo?.image}`
                        : EMPTY_NFT_IMAGE
                    }
                    alt={tokenInfo?.name || ''}
                    width={56}
                    height={56}
                    className="object-cover h-14 w-14"
                  />
                  {!isOwner && tokenInfo && (
                    <span className="text-xs text-gray-500 mt-1">
                      {campaign.youAreNotTheOwnerOfThisToken ??
                        'You are not the owner of this Token'}
                    </span>
                  )}
                </div>
              )}
          </div>

          {/* Title Input */}
          <div className="space-y-1">
            <Label htmlFor="title">{campaign.titleLabel ?? 'Title'}</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder={
                campaign.enterCampaignTitle ?? 'Enter campaign title'
              }
              value={form.title}
              onChange={handleChange}
              className="w-full h-8 text-sm"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <Label htmlFor="description">
              {campaign.descriptionLabel ?? 'Description'}
            </Label>
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
              className="w-full h-8 text-sm"
            />
          </div>

          {/* Amount Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
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
                className="w-full h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
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
                className="w-full h-8 text-sm"
              />
            </div>
          </div>

          {/* Verification Type Selection */}
          <div className="space-y-1">
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
              <SelectTrigger className="h-8 text-sm">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="start-date">
                {campaign.startDateTime ?? 'Start Date & Time'}
              </Label>
              <DateTimePicker
                id="start-date"
                value={form.startDate}
                onChange={(value) => onFormChange('startDate', value)}
                placeholder={campaign.selectDateTime ?? 'Select date & time'}
                dateLabel={campaign.dateLabel ?? 'Date'}
                timeLabel={campaign.timeLabel ?? 'Time'}
                okLabel={campaign.confirm ?? 'OK'}
                cancelLabel={campaign.cancel ?? 'Cancel'}
                className="h-8 text-sm"
                portalled={false}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-date">
                {campaign.endDateTime ?? 'End Date & Time'}
              </Label>
              <DateTimePicker
                id="end-date"
                value={form.endDate}
                onChange={(value) => onFormChange('endDate', value)}
                placeholder={campaign.selectDateTime ?? 'Select date & time'}
                dateLabel={campaign.dateLabel ?? 'Date'}
                timeLabel={campaign.timeLabel ?? 'Time'}
                okLabel={campaign.confirm ?? 'OK'}
                cancelLabel={campaign.cancel ?? 'Cancel'}
                className="h-8 text-sm"
                portalled={false}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-9 text-sm"
            disabled={!isFormComplete}
          >
            {campaign.createCampaign ?? 'Create Campaign'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
