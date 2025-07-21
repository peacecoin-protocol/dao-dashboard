import { useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/custom/button'
import { toast } from 'sonner'
import { Metadata } from '~/i18n/types'
import Image from 'next/image'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'

export const CreateCampaignModal = ({
  isOpen,
  onClose,
  onSubmit,
  nftMetadata,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  nftMetadata: Metadata[]
}) => {
  const [form, setForm] = useState({
    sbtId: '',
    title: '',
    description: '',
    amount: '',
    startDate: '',
    endDate: '',
    isVerifySignature: true,
    isSBT: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'sbtId' && value == '0') {
      toast.error('SBT ID must be greater than 0')
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (
      form.sbtId === '' ||
      form.title === '' ||
      form.description === '' ||
      form.amount === '' ||
      form.startDate === '' ||
      form.endDate === ''
    ) {
      toast.error('Please fill in all fields')
      return
    }

    if (Number(form.amount) == 0) {
      toast.error('Amount must be greater than 0')
      return
    }

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      toast.error('Start date must be before end date')
      return
    }

    if (new Date(form.startDate) < new Date()) {
      toast.error('Start date must be in the future')
      return
    }

    onSubmit(form)
    setForm({
      sbtId: '',
      title: '',
      description: '',
      amount: '',
      startDate: '',
      endDate: '',
      isVerifySignature: true,
      isSBT: true,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          Create Campaign
        </h2>
        <Input
          type="text"
          name="sbtId"
          placeholder="SBT ID"
          value={form.sbtId}
          onChange={handleChange}
        />
        <div className="flex items-center justify-center w-full">
          <Image
            src={
              form.sbtId != '0' && form.sbtId != ''
                ? (nftMetadata.find((m) => m.token_id == Number(form.sbtId))
                    ?.image as string) || EMPTY_NFT_IMAGE
                : EMPTY_NFT_IMAGE
            }
            alt="SBT Image"
            width={100}
            height={100}
          />
        </div>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select
          name="isVerifySignature"
          value={form.isVerifySignature ? 'verifySignature' : 'whitelist'}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isVerifySignature: e.target.value === 'verifySignature',
            }))
          }
          className="border rounded p-2 text-gray-500"
        >
          <option value="verifySignature">Verify Signature</option>
          <option value="whitelist">Whitelist</option>
        </select>

        <select
          name="isSBT"
          value={form.isSBT ? 'SBT' : 'Token'}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isSBT: e.target.value === 'SBT',
            }))
          }
          className="border rounded p-2 text-gray-500"
        >
          <option value="SBT">SBT</option>
          <option value="Token">Token</option>
        </select>
        <Input
          type="datetime-local"
          name="startDate"
          className="border rounded p-2 text-gray-500"
          placeholder="Start Date and Time"
          value={form.startDate}
          onChange={handleChange}
        />
        <Input
          type="datetime-local"
          name="endDate"
          className="border rounded p-2 text-gray-500"
          placeholder="End Date and Time"
          value={form.endDate}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Create Campaign</Button>
      </div>
    </Modal>
  )
}
