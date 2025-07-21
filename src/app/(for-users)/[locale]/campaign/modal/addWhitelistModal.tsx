import { useEffect, useState } from 'react'
import Modal from '~/components/custom/Modal'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/custom/button'
import { ethers } from 'ethers'
import AddDynamicInputFields from '~/components/custom/AddDynamicInputFields'

export const AddWhitelistModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}) => {
  const [form, setForm] = useState({
    id: '',
    data: [{ address: '', git: '' }],
  })

  // web3 keccak value
  // Example: encode all gists as keccak256 hashes
  const encodedGists = (gist: string) =>
    ethers.keccak256(ethers.toUtf8Bytes(gist))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'addresses' || name === 'gists') {
      setForm((prev) => ({
        ...prev,
        [name]: value.includes(',')
          ? value.split(',').map((item) => item.trim())
          : [value],
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = () => {
    onSubmit(form)
    setForm({
      id: '',
      data: [{ address: '', git: '' }],
    })
    onClose()
  }

  useEffect(() => {
    console.log(form)
  }, [form])

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
        />
        <Button onClick={handleSubmit}>Add Winners</Button>
      </div>
    </Modal>
  )
}
