import { useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { ethers } from 'ethers'
import AddDynamicInputFields from '~/components/custom/AddDynamicInputFields'
import { CAMPAIGN } from '~/i18n/types'
import { Label } from '~/components/ui/label'
import { useToast } from '~/hooks/use-toast'

export const AddWhitelistModal = ({
  isOpen,
  onClose,
  onSubmit,
  campaignData,
  campaign,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  campaignData: CAMPAIGN[]
  campaign: any
}) => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    id: '',
    data: [{ address: '', git: '' }],
  })
  const [isVerifySignature, setIsVerifySignature] = useState(false)

  // web3 keccak value
  // Example: encode all gists as keccak256 hashes
  const encodedGists = (gist: string) =>
    ethers.keccak256(ethers.toUtf8Bytes(gist))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'id') {
      if (value.length == 0) return

      const campaign = campaignData.find(
        (campaign) => campaign.campaignId == Number(value)
      )
      if (campaign) {
        setIsVerifySignature(campaign.validateSignatures)
      } else {
        toast({
          title: 'Campaign not found',
        })
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (form.id.length == 0) {
      toast({
        title: 'Campaign ID is required',
      })
      return
    }
    onSubmit(form)
    setForm({
      id: '',
      data: [{ address: '', git: '' }],
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {campaign.addWinners ?? 'Add Winners'}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Campaign ID Input */}
          <div className="space-y-2">
            <Label htmlFor="campaign-id">
              {campaign.campaignId ?? 'Campaign ID'}
            </Label>
            <Input
              id="campaign-id"
              type="text"
              name="id"
              placeholder={campaign.enterCampaignId ?? 'Enter campaign ID'}
              value={form.id}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Dynamic Input Fields */}
          <div className="space-y-4">
            <Label>{campaign.winnerInformation ?? 'Winner Information'}</Label>
            <AddDynamicInputFields
              inputs={form.data}
              setInputs={(data) => setForm({ ...form, data })}
              isVerifySignature={isVerifySignature}
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full">
            {campaign.addWinners ?? 'Add Winners'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
