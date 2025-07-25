import { useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/custom/button'
import { ethers } from 'ethers'
import AddDynamicInputFields from '~/components/custom/AddDynamicInputFields'
import { CAMPAIGN } from '~/i18n/types'
import { displayError } from '~/components/custom/displayError'

export const AddWhitelistModal = ({
  isOpen,
  onClose,
  onSubmit,
  campaignData,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  campaignData: CAMPAIGN[]
}) => {
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
      const campaign = campaignData.find(
        (campaign) => campaign.campaignId == Number(value)
      )
      if (campaign) {
        setIsVerifySignature(campaign.validateSignatures)
      } else {
        displayError(new Error('Campaign not found'))
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (form.id.length == 0) {
      displayError(new Error('Campaign ID is required'))
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
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight mt-6">Add Winners</h2>

        <Input
          type="text"
          name="id"
          placeholder="Campaign ID"
          value={form.id}
          onChange={handleChange}
        />
        <AddDynamicInputFields
          inputs={form.data}
          setInputs={(data) => setForm({ ...form, data })}
          isVerifySignature={isVerifySignature}
        />
        <Button onClick={handleSubmit}>Add Winners</Button>
      </div>
    </Modal>
  )
}
