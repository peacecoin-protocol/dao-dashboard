'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { config } from '~/lib/config'

import { SBT_ABI } from '~/app/ABIs/SBT'
import {
  NFTAddress,
  PCE_SBT_ADDRESS,
  defaultChainId,
  sbtTableHeaders,
} from '~/app/constants/constants'
import { SupabaseDao } from '~/i18n/types'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'

import { Button } from '~/components/ui/button'
import { getDict } from '~/i18n/get-dict'
import { useToast } from '~/hooks/use-toast'
import { Input } from '~/components/ui/input'
import { DialogContent, DialogTitle, Dialog } from '~/components/ui/dialog'
import { Spinner } from '~/components/ui/Spinner'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import ImageCropModal from '~/components/ui/ImageCropModal'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { createFile, JSON_GROUP_ID } from '~/app/pinata/pinataAPI'
import { SBT_GROUP_ID, NFT_GROUP_ID } from '~/app/pinata/pinataAPI'
import { v4 as uuidv4 } from 'uuid'
import { addFilesToGroupPublic } from '~/app/pinata/pinataAPI'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useReadContract,
} from 'wagmi'
import { ChevronsUpDown, Plus, Image as ImageIcon } from 'lucide-react'
import {
  SBTInfo,
  SBTTableComponent,
} from '~/components/custom/sbt-tableComponent'
import { shortenAddress } from '~/components/utils'

import { createClient } from '~/utils/supabase/client'

// Types
interface CardFormState {
  name: string
  daoSearch: string
  description: string
  votingPower: string
  isSBT: boolean
  daoId: string
}

interface FilterOption {
  value: string
  label: string
}

// Constants
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'revoked', label: 'Revoked' },
  { value: 'unrevoked', label: 'Unrevoked' },
]

const TOKEN_TYPE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'sbt', label: 'SBT' },
  { value: 'nft', label: 'NFT' },
]

const MAX_NAME_LENGTH = 64
const MAX_DESCRIPTION_LENGTH = 256
const MAX_VOTING_POWER = 10000

// Components
const LoadingOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
    <Spinner show={true} size="large" />
  </div>
)

const PageHeader = ({ title }: { title: string }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
    <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
  </div>
)

const FilterDropdown = ({
  filter,
  onFilterChange,
  isOpen,
  onOpenChange,
  filterOptions,
  labels,
}: {
  filter: string
  onFilterChange: (value: string) => void
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  filterOptions: FilterOption[]
  labels: Record<string, string>
}) => (
  <Popover open={isOpen} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className="w-[200px] justify-between bg-white"
      >
        {filterOptions.find((option) => option.value === filter)?.label ||
          labels.all}
        <ChevronsUpDown className="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandList>
          <CommandGroup>
            {filterOptions.map((option, index) => (
              <CommandItem
                key={index}
                value={option.value}
                onSelect={() => {
                  onFilterChange(option.value)
                  onOpenChange(false)
                }}
              >
                {labels[option.value] || option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
)

const CreateButton = ({
  onClick,
  label,
  disabled = false,
}: {
  onClick: () => void
  label: string
  disabled?: boolean
}) => (
  <Button
    variant="default"
    className="flex ml-auto w-60"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="font-semibold flex items-center gap-2">
      <Plus className="w-5 h-5" />
      {label}
    </span>
  </Button>
)

const CreateTokenModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  onFormChange,
  onImageSelect,
  croppedImage,
  selectedImage,
  isCropModalOpen,
  onCropComplete,
  onCloseCropModal,
  labels,
  allDAOs,
  disabled,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  form: CardFormState
  onFormChange: (field: keyof CardFormState, value: string | boolean) => void
  onImageSelect: () => void
  croppedImage: string | null
  selectedImage: string | null
  isCropModalOpen: boolean
  onCropComplete: (cropped: string) => void
  onCloseCropModal: () => void
  labels: Record<string, string>
  allDAOs: { daoId: string; daoName: string }[]
  disabled: boolean
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex flex-col gap-4 max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6">
      <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
        {labels.createToken}
      </DialogTitle>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">
          {labels.name}
          <Input
            className="mt-1"
            placeholder={labels.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            value={form.name}
            maxLength={MAX_NAME_LENGTH}
            autoFocus
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          {labels.tokenType || 'Token Type'}
          <select
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.isSBT == true ? 'sbt' : 'nft'}
            onChange={(e) => {
              onFormChange('isSBT', e.target.value == 'sbt' ? true : false)
            }}
          >
            <option value="sbt">{labels.sbt}</option>
            <option value="nft">{labels.nft}</option>
          </select>
        </label>
        {/* DAO select with search bar */}
        <label className="text-sm font-medium text-gray-700 flex flex-col gap-1">
          {labels.dao || 'DAO'}
          <div className="flex flex-col gap-2">
            {/* Custom DAO dropdown with search box */}
            <div className="relative">
              <Input
                className="mb-2"
                type="text"
                placeholder={labels.searchDao || 'Search DAO...'}
                value={form.daoSearch || ''}
                onChange={(e) => {
                  // Clear selected DAO when new search starts
                  if (form.daoSearch !== e.target.value) {
                    onFormChange('daoId', '')
                  }
                  onFormChange('daoSearch', e.target.value)
                }}
              />
              {/* When searching, show dropdown; when not searching, don't show anything */}
              {form.daoSearch !== '' && !form.daoId && (
                <div className="border border-gray-300 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
                  {allDAOs &&
                  allDAOs.length > 0 &&
                  allDAOs.filter(
                    (dao: { daoName: string; daoId: string }) =>
                      dao.daoName
                        .toLowerCase()
                        .includes(form.daoSearch.toLowerCase()) ||
                      dao.daoId
                        .toLowerCase()
                        .includes(form.daoSearch.toLowerCase())
                  ).length > 0 ? (
                    allDAOs
                      .filter(
                        (dao: { daoName: string; daoId: string }) =>
                          dao.daoName
                            .toLowerCase()
                            .includes(form.daoSearch.toLowerCase()) ||
                          dao.daoId
                            .toLowerCase()
                            .includes(form.daoSearch.toLowerCase())
                      )
                      .map((dao: { daoId: string; daoName: string }) => (
                        <div
                          key={dao.daoId}
                          className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                            form.daoId === dao.daoId
                              ? 'bg-blue-50 font-semibold'
                              : ''
                          }`}
                          onClick={() => {
                            onFormChange('daoId', dao.daoId)
                            onFormChange('daoSearch', '') // Hide the dropdown after selecting
                          }}
                        >
                          {dao.daoName} &nbsp;|&nbsp;{' '}
                          {shortenAddress(dao.daoId)}
                        </div>
                      ))
                  ) : (
                    <div className="px-3 py-2 text-blue-600">
                      {labels.noDaoFound || 'No DAO found'}
                    </div>
                  )}
                </div>
              )}
              {/* Only display the selected DAO if not currently searching */}
              {form.daoId && (
                <div className="mt-1 text-sm text-blue-600">
                  {(() => {
                    const selected = allDAOs.find(
                      (dao) => dao.daoId === form.daoId
                    )
                    if (selected) {
                      return `${selected.daoName} | ${shortenAddress(selected.daoId)}`
                    } else {
                      return ''
                    }
                  })()}
                </div>
              )}
            </div>
          </div>
        </label>
        <label className="text-sm font-medium text-gray-700">
          {labels.description}
          <Input
            className="mt-1"
            placeholder={labels.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            value={form.description}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          {labels.votingPower}
          <Input
            className="mt-1"
            placeholder={labels.votingPower}
            onChange={(e) => onFormChange('votingPower', e.target.value)}
            value={form.votingPower}
            type="number"
            min={0}
            max={MAX_VOTING_POWER}
          />
        </label>
      </div>

      {/* Image Crop Modal */}
      {selectedImage && isCropModalOpen && (
        <ImageCropModal
          localDict={labels}
          imageSrc={selectedImage}
          onClose={onCloseCropModal}
          onCropComplete={onCropComplete}
        />
      )}

      {/* Preview Cropped Image */}
      {croppedImage && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">{labels.preview}</span>
          <Image
            src={croppedImage}
            className="contain border border-gray-200 max-h-48"
            alt="Selected"
            width={100}
            height={100}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <Button variant="secondary" className="flex-1" onClick={onImageSelect}>
          <span className="flex items-center gap-1">
            <ImageIcon className="w-4 h-4" />
            {labels.selectImage}
          </span>
        </Button>
        <Button
          variant="default"
          className="flex-1"
          disabled={disabled}
          onClick={onSubmit}
        >
          <span className="flex items-center gap-1">
            <Plus className="w-4 h-4" />
            {labels.createToken}
          </span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)

// Main Component
export default function SBTBuilderPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { toast } = useToast()
  const { address, chainId } = useAccount()

  // State
  const [filter, setFilter] = useState('all')
  const [tokenType, setTokenType] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isTokenTypeOpen, setIsTokenTypeOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<number[]>([])
  const supabase = createClient()

  const [cardForm, setCardForm] = useState<CardFormState>({
    name: '',
    daoSearch: '',
    description: '',
    votingPower: '',
    isSBT: true,
    daoId: '',
  })

  const [tokenData, setTokenData] = useState<SBTInfo[]>([])
  const [filteredTokenData, setFilteredTokenData] = useState<SBTInfo[]>([])

  const [allDAOs, setAllDAOs] = useState<SupabaseDao[]>([])
  const [refetchTokenData, setRefetchTokenData] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: hash, error, writeContractAsync } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  useEffect(() => {
    const fetchAllDAOs = async () => {
      const { data: daos } = await supabase.from('DAO').select()
      setAllDAOs(daos as SupabaseDao[])
    }
    fetchAllDAOs()
  }, [supabase])

  // Effects
  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDict(locale)
      setDict(dictionary)
    }
    loadDictionary()
  }, [locale])

  useEffect(() => {
    const filteredData: SBTInfo[] = []

    if (tokenType == 'all') {
      filteredData.push(...tokenData)
    } else if (tokenType == 'sbt') {
      filteredData.push(...tokenData.filter((token: SBTInfo) => token.isSBT))
    } else if (tokenType == 'nft') {
      filteredData.push(...tokenData.filter((token: SBTInfo) => !token.isSBT))
    }

    if (filter == 'all') {
      setFilteredTokenData(filteredData)
    } else if (filter == 'revoked') {
      setFilteredTokenData([
        ...filteredData.filter((token: SBTInfo) => token.isRevoked),
      ])
    } else if (filter == 'unrevoked') {
      setFilteredTokenData([
        ...filteredData.filter((token: SBTInfo) => !token.isRevoked),
      ])
    }
  }, [tokenData, filter, tokenType])

  const { data: sbtCurrentTokenId, refetch: refetchSbtCurrentTokenId } =
    useReadContract({
      abi: SBT_ABI,
      address: PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      functionName: 'numberOfTokens',
      args: [],
    })

  const { data: nftCurrentTokenId, refetch: refetchNftCurrentTokenId } =
    useReadContract({
      abi: SBT_ABI,
      address: NFTAddress[chainId || defaultChainId] as `0x${string}`,
      functionName: 'numberOfTokens',
      args: [],
    })

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true)
        const { data: tokens } = await supabase
          .from('Token')
          .select()
          .eq('creator', address as string)

        const _tokenData = tokens as SBTInfo[]

        const tokenBalances = await Promise.all(
          _tokenData.map(async (token: SBTInfo) => {
            const balance = (await readContract(config, {
              abi: SBT_ABI,
              address: token.isSBT
                ? (PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`)
                : (NFTAddress[chainId || defaultChainId] as `0x${string}`),
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as number
            return balance
          })
        )

        _tokenData.forEach((token: SBTInfo, index: number) => {
          token.balance = tokenBalances[index]?.toString() ?? '0'
        })
        setTokenData(_tokenData)
      } catch (error) {
        console.error('Error fetching token data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase, chainId])

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction Succeeded!' })
    } else if (isConfirming) {
      toast({ title: 'Transaction Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, toast])

  // Handlers
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setSelectedImage(reader.result as string)
          setIsCropModalOpen(true)
        }
      }
    },
    []
  )

  const handleImageSelect = useCallback(() => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = (e) => {
      setCroppedImage(null)
      const event = e as unknown as React.ChangeEvent<HTMLInputElement>
      handleFileChange(event)
    }
    fileInput.click()
  }, [handleFileChange])

  const updateCardForm = useCallback(
    (field: keyof CardFormState, value: string | boolean) => {
      setCardForm((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const uploadImage = useCallback(async () => {
    if (!croppedImage || !address) return

    setIsCreateModalOpen(false)

    const contractAddress = cardForm.isSBT
      ? PCE_SBT_ADDRESS[chainId || defaultChainId]
      : NFTAddress[chainId || defaultChainId]

    // try {
    toast({ title: 'Uploading image...' })

    const timestamp = Date.now()
    const imageName = `${uuidv4()}-${timestamp}.png`

    // Upload image
    const file = await createFile(croppedImage, imageName)
    const uploadResult = await addFilesToGroupPublic(
      file,
      cardForm.isSBT ? SBT_GROUP_ID : NFT_GROUP_ID
    )

    const jsonFile = new File(
      [
        JSON.stringify({
          name: cardForm.name,
          description: cardForm.description,
          votingPower: cardForm.votingPower,
          image: uploadResult?.cid,
        }),
      ],
      uploadResult?.cid + '.json',
      { type: 'application/json' }
    )

    const jsonUploadResult = await addFilesToGroupPublic(
      jsonFile,
      JSON_GROUP_ID
    )

    if (!jsonUploadResult?.cid) {
      throw new Error('Failed to upload metadata')
    } else {
      toast({ title: 'Creating token...' })
      try {
        const createTokenTx = await writeContractAsync({
          abi: SBT_ABI,
          address: contractAddress as `0x${string}`,
          functionName: 'createToken',
          args: [jsonUploadResult?.cid, cardForm.votingPower, cardForm.daoId],
        })
        await waitForTransactionReceipt(config, {
          hash: createTokenTx,
          confirmations: 1,
        })

        if (cardForm.isSBT == true) {
          await refetchSbtCurrentTokenId()
        } else {
          await refetchNftCurrentTokenId()
        }
        const currentTokenId = cardForm.isSBT
          ? sbtCurrentTokenId
          : nftCurrentTokenId
        const tokenId = currentTokenId ? currentTokenId.toString() : '0'

        await supabase.from('Token').insert({
          tokenId: tokenId,
          name: cardForm.name,
          description: cardForm.description,
          votingPower: cardForm.votingPower,
          image: uploadResult?.cid,
          creator: address,
          daoId: cardForm.daoId,
          isSBT: cardForm.isSBT,
        })

        setRefetchTokenData(!refetchTokenData)

        toast({ title: 'Token created successfully!' })
      } catch (error) {
        console.error('Error creating token:', error)
        toast({ title: 'Failed to create token' })
      } finally {
        setCroppedImage(null)
        setSelectedImage(null)
        setCardForm({
          name: '',
          daoSearch: '',
          description: '',
          votingPower: '',
          isSBT: true,
          daoId: '',
        })
        setIsTokenTypeOpen(false)
        setIsFilterOpen(false)
      }
    }
  }, [
    croppedImage,
    address,
    cardForm,
    chainId,
    writeContractAsync,
    toast,
    sbtCurrentTokenId,
    nftCurrentTokenId,
    supabase,
    refetchTokenData,
    refetchSbtCurrentTokenId,
    refetchNftCurrentTokenId,
  ])

  const handleCreateModalOpen = useCallback(() => {
    setSelectedImage(null)
    setCroppedImage(null)
    setIsCreateModalOpen(true)
  }, [])

  const handleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false)
    setCardForm({
      name: '',
      daoSearch: '',
      description: '',
      votingPower: '',
      isSBT: true,
      daoId: '',
    })
    setSelectedImage(null)
    setCroppedImage(null)
  }, [])

  const handleCropComplete = useCallback((cropped: string) => {
    setCroppedImage(cropped)
    setIsCropModalOpen(false)
  }, [])

  // Computed values
  const localDict = dict?.sbt ?? {}
  const isFormValid =
    croppedImage &&
    cardForm.name &&
    cardForm.description &&
    cardForm.votingPower &&
    address &&
    cardForm.daoId

  const currentLabels = {
    sbtList: localDict.sbtList ?? 'Token List',
    sbt: localDict.sbt ?? 'SBT',
    nft: localDict.nft ?? 'NFT',
    all: localDict.all ?? 'All',
    revoked: localDict.revoked ?? 'Revoked',
    unrevoked: localDict.unrevoked ?? 'Unrevoked',
    name: localDict.name ?? 'Name',
    image: localDict.image ?? 'Image',
    createdAt: localDict.createdAt ?? 'Created At',
    actions: localDict.actions ?? 'Actions',
    viewMetadata: localDict.viewMetadata ?? 'View Metadata',
    revoke: localDict.revoke ?? 'Revoke',
    unrevoke: localDict.unrevoke ?? 'Unrevoke',
    noTokensFound:
      tokenType === 'sbt'
        ? (localDict.noSBTsFound ?? 'No SBTs found.')
        : tokenType === 'nft'
          ? (localDict.noNFTsFound ?? 'No NFTs found.')
          : (localDict.noTokensFound ?? 'No CARDs found.'),
    createSBT_NFT: localDict.createSBT_NFT ?? 'Create Token',
    createNFT: localDict.createNFT ?? 'Create NFT',
    createCard: localDict.createCard ?? 'Create SBT/NFT',
    description: localDict.description ?? 'Description',
    votingPower: localDict.votingPower ?? 'Voting Power',
    preview: localDict.preview ?? 'Preview',
    selectImage: localDict.selectImage ?? 'Select Image',
    createToken: localDict.createSBT_NFT ?? 'Create SBT/NFT',
  }

  const handleRevokeToken = useCallback(
    async (token: SBTInfo) => {
      if (!address) return

      try {
        toast({
          title: token.isRevoked ? 'Unrevoking token...' : 'Revoking token...',
        })

        const revokeTx = await writeContractAsync({
          abi: SBT_ABI,
          address: token.isSBT
            ? (PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`)
            : (NFTAddress[chainId || defaultChainId] as `0x${string}`),
          functionName: 'revoke',
          args: [token.tokenId, !token.isRevoked],
        })

        await waitForTransactionReceipt(config, {
          hash: revokeTx,
          confirmations: 1,
        })

        await supabase
          .from('Token')
          .update({
            isRevoked: !token.isRevoked,
          })
          .eq('tokenId', token.tokenId)
          .eq('isSBT', token.isSBT)

        toast({
          title: token.isRevoked
            ? 'Token unrevoked successfully'
            : 'Token revoked successfully',
        })

        setRefetchTokenData(!refetchTokenData)
      } catch (error) {
        console.error('Error revoking token:', error)
        toast({ title: 'Failed to revoke token' })
      }
    },
    [address, writeContractAsync, chainId, toast, refetchTokenData]
  )

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-8 md:px-20 md:py-16 gap-4">
      {loading && <LoadingOverlay />}

      <div className="w-full gap-4 flex flex-col">
        <PageHeader title={currentLabels.sbtList} />
        <div className="flex flex-row gap-4">
          <CreateButton
            onClick={handleCreateModalOpen}
            label={currentLabels.createCard}
          />
          <div className="flex flex-row mb-4 justify-end w-full gap-4">
            <FilterDropdown
              filter={filter}
              onFilterChange={setFilter}
              isOpen={isFilterOpen}
              onOpenChange={setIsFilterOpen}
              filterOptions={FILTER_OPTIONS}
              labels={currentLabels}
            />

            <FilterDropdown
              filter={tokenType}
              onFilterChange={setTokenType}
              isOpen={isTokenTypeOpen}
              onOpenChange={setIsTokenTypeOpen}
              filterOptions={TOKEN_TYPE_OPTIONS}
              labels={currentLabels}
            />
          </div>
        </div>

        <SBTTableComponent
          headers={[...sbtTableHeaders, 'Action']}
          sbtInfo={filteredTokenData}
          action={{ title: 'Revoke' }}
          onRevoke={(token: SBTInfo) => {
            handleRevokeToken(token)
          }}
        />

        <CreateTokenModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={uploadImage}
          form={cardForm}
          onFormChange={updateCardForm}
          onImageSelect={handleImageSelect}
          croppedImage={croppedImage}
          selectedImage={selectedImage}
          isCropModalOpen={isCropModalOpen}
          onCropComplete={handleCropComplete}
          onCloseCropModal={() => setIsCropModalOpen(false)}
          labels={currentLabels}
          disabled={!isFormValid}
          allDAOs={allDAOs}
        />
      </div>
    </div>
  )
}
