'use client'

import { useCallback, useEffect, useState } from 'react'

import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
import { v4 as uuidv4 } from 'uuid'
import { SBT_ABI } from '~/app/ABIs/SBT'
import { PCE_SBT_ADDRESS } from '~/app/constants/constants'
import { Button } from '~/components/custom/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useToast } from '~/components/ui/use-toast'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import ImageCropModal from '~/components/ui/ImageCropModal'
import { Input } from '~/components/ui/input'
import { DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Dialog } from '~/components/ui/dialog'
import { Env } from '~/env'
import {
  addFilesToGroupPublic,
  createFile,
  JSON_GROUP_ID,
  SBT_GROUP_ID,
} from '~/app/pinata/pinataAPI'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'
import { config, localhost } from '~/lib/config'
type SBTFormState = {
  name: string
  description: string
  votingPower: string
}

export default function SBTBuilderPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const localDict = dict?.daoInfo ?? {}
  const { toast } = useToast()

  let [loading, setLoading] = useState(false)
  const { address, chainId } = useAccount()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [sbtFiles, setSBTs] = useState<any[]>([])
  const [allSBTs, setAllSBTs] = useState<any[]>([])
  const [sbtForm, setSBTForm] = useState<SBTFormState>({
    name: '',
    description: '',
    votingPower: '',
  })

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  const { data: currentTokenId, refetch: refetchCurrentTokenId } =
    useReadContract({
      address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
      abi: SBT_ABI,
      functionName: 'currentTokenId',
      args: [],
    })

  const { data: baseURI, refetch: refetchBaseURI } = useReadContract({
    address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
    abi: SBT_ABI,
    functionName: 'uri_',
    args: [],
  })

  const { data: allTokenLength, refetch: refetchAllTokenLength } =
    useReadContract({
      address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
      abi: SBT_ABI,
      functionName: 'getAllTokenLength',
      args: [],
    })

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast({
          title: 'Transaction Succeed!',
        })
      } else if (isConfirming) {
        toast({ title: 'TX is Pending, Please Wait...' })
      } else if (error) {
        toast({ title: (error as BaseError).shortMessage })
      }
    }

    notify()
  }, [isConfirmed, isConfirming, error, hash])

  const getTokenURI = useCallback(async (tokenId: number) => {
    const _tokenURI = (await readContract(config, {
      abi: SBT_ABI,
      address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
      functionName: 'uri',
      args: [tokenId],
    })) as string

    return _tokenURI
  }, [])

  const isRevoked = useCallback(async (tokenId: number) => {
    try {
      const _isRevoked = (await readContract(config, {
        abi: SBT_ABI,
        address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
        functionName: 'isRevoked',
        args: [tokenId],
      })) as boolean

      return _isRevoked
    } catch (err) {
      console.error('Error checking revoked status:', err)
      return false
    }
  }, [])

  const fetchAllSBTData = async () => {
    const allSBTs = []
    for (let i = 1; i < Number(currentTokenId as string); i++) {
      const tokenURI = await getTokenURI(i)

      const isTokenRevoked = await isRevoked(i)
      let tokenData
      let tokenDataJson
      try {
        tokenData = await fetch(tokenURI)
        tokenDataJson = await tokenData.json()
      } catch (error) {}

      allSBTs.push({
        ...tokenDataJson,
        isRevoked: isTokenRevoked,
        tokenId: i,
        metadata: tokenURI,
      })
    }

    setAllSBTs(allSBTs)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllSBTData()
    }
    fetchData()
  }, [currentTokenId])

  const uploadImage = async () => {
    setIsCreateModalOpen(false)

    if (!croppedImage) return
    try {
      toast({ title: localDict.updatingImage ?? 'Updating image...' })

      const timestamp = Date.now()
      const imageName = `${uuidv4()}-${timestamp}.png`

      const file = await createFile(croppedImage as string, imageName)
      const uploadImage = await addFilesToGroupPublic(file, SBT_GROUP_ID)

      // Create a JSON file with SBT info and upload as sbtname-timestamp.json
      const sbtInfo = {
        name: sbtForm.name,
        description: sbtForm.description,
        votingPower: sbtForm.votingPower,
        image: uploadImage?.cid
          ? `${Env.PINATA_GATEWAY_URL}/ipfs/${uploadImage.cid}`
          : null,
        timestamp,
      }
      const jsonBlob = new Blob([JSON.stringify(sbtInfo, null, 2)], {
        type: 'application/json',
      })
      const jsonFile = new File([jsonBlob], `${uploadImage?.cid}`, {
        type: 'application/json',
      })
      const _uploadJSON = await addFilesToGroupPublic(jsonFile, JSON_GROUP_ID)

      await writeContractAsync({
        abi: SBT_ABI,
        address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
        functionName: 'mint',
        args: [address, 0, 1],
      })

      if (_uploadJSON && _uploadJSON.cid) {
        await writeContractAsync({
          abi: SBT_ABI,
          address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
          functionName: 'setTokenURI',
          args: [currentTokenId, `${_uploadJSON.cid}`, sbtForm.votingPower],
        })
      }

      setCroppedImage(null)
      setSelectedImage(null)
      setSBTForm({
        name: '',
        description: '',
        votingPower: '',
      })

      toast({
        title: 'Image updated successfully',
      })

      await refetchCurrentTokenId()

      await fetchAllSBTData()
    } catch (error) {
      toast({ title: 'Image updated failed' })
    }
  }

  const updateSBTForm = (field: keyof SBTFormState, value: string) => {
    setSBTForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setSelectedImage(reader.result as string)
          setIsCropModalOpen(true)
        }
      }
    }
  }

  const handleRevokeSBT = async (tokenId: string, isRevoked: boolean) => {
    toast({
      title:
        localDict.revokingSBT ??
        `${isRevoked ? 'Unrevoking' : 'Revoking'} SBT...`,
    })
    await writeContractAsync({
      abi: SBT_ABI,
      address: PCE_SBT_ADDRESS[chainId || localhost.id] as `0x${string}`,
      functionName: 'revoke',
      args: [tokenId, !isRevoked],
    })
    toast({
      title:
        localDict.sbtRevokedSuccessfully ??
        `${isRevoked ? 'Unrevoked' : 'Revoked'} SBT successfully`,
    })

    await fetchAllSBTData()
  }

  function handleImageSelect() {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.onchange = (e) => {
      setCroppedImage(null)
      const event = e as unknown as React.ChangeEvent<HTMLInputElement>
      handleFileChange(event)
    }
    fileInput.click()
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-8 md:px-20 md:py-16">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {localDict.sbtList ?? 'SBT List'}
          </h2>
          <Button
            variant="default"
            className="w-full md:w-auto"
            onClick={() => {
              setSelectedImage(null)
              setCroppedImage(null)
              setIsCreateModalOpen(true)
            }}
          >
            <span className="font-semibold flex items-center gap-2">
              <svg width="20" height="20" fill="none" className="inline-block">
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10 6v8M6 10h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {localDict.createSBT ?? 'Create SBT'}
            </span>
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl bg-white shadow-lg w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hidden md:table-row bg-gray-100">
                <TableHead className="font-bold w-8 text-gray-700 text-center">
                  #
                </TableHead>
                <TableHead className="font-bold text-gray-700 text-center">
                  {localDict.name ?? 'Name'}
                </TableHead>
                <TableHead className="font-bold text-gray-700 text-center">
                  {localDict.image ?? 'Image'}
                </TableHead>
                <TableHead className="font-bold text-gray-700 text-center">
                  {localDict.createdAt ?? 'Created At'}
                </TableHead>
                <TableHead className="font-bold text-gray-700 text-center">
                  {localDict.actions ?? 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSBTs && allSBTs.length > 0 ? (
                allSBTs.map((sbt: any, index: number) => (
                  <TableRow
                    key={sbt.id}
                    className="hover:bg-gray-50 transition md:table-row flex flex-col md:flex-row md:items-center border-b last:border-b-0"
                  >
                    {/* Mobile Card Header */}
                    <TableCell className="md:hidden flex flex-row items-center gap-2 py-2 bg-gray-100 rounded-t-lg text-center justify-center">
                      <span className="font-bold text-gray-500 text-center">
                        #{index + 1}
                      </span>
                      <span className="font-bold">{sbt.name || '-'}</span>
                    </TableCell>
                    {/* Desktop Index */}
                    <TableCell className="hidden md:table-cell text-gray-700 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    {/* Name */}
                    <TableCell className="hidden md:table-cell flex-1 md:flex-none break-words text-gray-900 text-center">
                      <span className="md:hidden font-semibold text-gray-500 text-center">
                        {localDict.name ?? 'Name'}:{' '}
                      </span>
                      {sbt.name || '-'}
                    </TableCell>

                    {/* Image */}
                    <TableCell className="md:table-cell flex-1 md:flex-none text-center">
                      <div className="flex items-center justify-center">
                        <img
                          src={sbt.image}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                          alt={sbt.name}
                          onError={(e) =>
                            (e.currentTarget.src = '/placeholder-image.png')
                          }
                        />
                      </div>
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="md:table-cell flex-1 md:flex-none text-gray-700 text-center">
                      <span className="md:hidden font-semibold text-gray-500">
                        {localDict.createdAt ?? 'Created At'}:{' '}
                      </span>
                      {sbt.timestamp
                        ? new Date(sbt.timestamp).toLocaleString()
                        : '-'}
                    </TableCell>
                    {/* Actions */}
                    <TableCell className="md:table-cell gap-4 flex flex-row items-center justify-center text-center">
                      <Button
                        variant="outline"
                        className="w-full md:w-auto"
                        onClick={() => {
                          window.open(sbt.metadata, '_blank')
                        }}
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            className="inline-block"
                          >
                            <path
                              d="M8 3v10M3 8h10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          {localDict.view ?? 'View Metadata'}
                        </span>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full ml-2 md:w-auto bg-red-600 hover:bg-red-700 text-white"
                        onClick={() =>
                          handleRevokeSBT(sbt.tokenId, sbt.isRevoked)
                        }
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            className="inline-block"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M4 4l8 8M12 4l-8 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          {sbt.isRevoked ? 'Unrevoke' : 'Revoke'}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 px-4 text-center text-gray-400 text-lg"
                  >
                    {localDict.noSBTsFound ?? 'No SBTs found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Create SBT Modal */}
        <Dialog
          open={isCreateModalOpen}
          onOpenChange={() => setIsCreateModalOpen(false)}
        >
          <DialogContent className="flex flex-col gap-4 max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6">
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
              {localDict.createSBT ?? 'Create SBT'}
            </DialogTitle>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                {localDict.name ?? 'Name'}
                <Input
                  className="mt-1"
                  placeholder={localDict.name ?? 'Name'}
                  onChange={(e) => updateSBTForm('name', e.target.value)}
                  value={sbtForm.name}
                  maxLength={64}
                  autoFocus
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                {localDict.description ?? 'Description'}
                <Input
                  className="mt-1"
                  placeholder={localDict.description ?? 'Description'}
                  onChange={(e) => updateSBTForm('description', e.target.value)}
                  value={sbtForm.description}
                  maxLength={256}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                {localDict.votingPower ?? 'Voting Power'}
                <Input
                  className="mt-1"
                  placeholder={localDict.votingPower ?? 'Voting Power'}
                  onChange={(e) => updateSBTForm('votingPower', e.target.value)}
                  value={sbtForm.votingPower}
                  type="number"
                  min={0}
                  max={1000000}
                />
              </label>
            </div>

            {/* Image Crop Modal */}
            {selectedImage && isCropModalOpen && (
              <ImageCropModal
                localDict={localDict}
                imageSrc={selectedImage}
                onClose={() => setIsCropModalOpen(false)}
                onCropComplete={(cropped) => setCroppedImage(cropped)}
              />
            )}

            {/* Preview Cropped Image */}
            {croppedImage && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-500">
                  {localDict.preview ?? 'Preview'}
                </span>
                <img
                  src={croppedImage}
                  className="contain rounded-lg border border-gray-200 max-h-48"
                  alt="Selected"
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleImageSelect}
              >
                <span className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    className="inline-block"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="12"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 8v2M8 6h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {localDict.selectImage ?? 'Select Image'}
                </span>
              </Button>
              <Button
                variant="default"
                className="flex-1"
                disabled={
                  !croppedImage ||
                  !sbtForm.name ||
                  !sbtForm.description ||
                  !sbtForm.votingPower
                }
                onClick={uploadImage}
              >
                <span className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    className="inline-block"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 5v6M5 8h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {localDict.createSBT ?? 'Create SBT'}
                </span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <RingLoader
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
        color={'#000000'}
        loading={loading}
        cssOverride={ringStyle}
        size={50}
      />
    </div>
  )
}
