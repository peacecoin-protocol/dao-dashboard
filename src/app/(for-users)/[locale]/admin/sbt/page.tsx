'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { config } from '~/lib/config'

import { SBT_ABI } from '~/app/ABIs/SBT'
import {
  NFTAddress,
  PCE_SBT_ADDRESS,
  NFT_SUBGRAPH_URL,
  SBT_SUBGRAPH_URL,
  defaultChainId,
  sbtTableHeaders,
} from '~/app/constants/constants'
import { Button } from '~/components/custom/button'
import { getDict } from '~/i18n/get-dict'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
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
} from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { ChevronsUpDown, Plus, Image as ImageIcon } from 'lucide-react'
import {
  SBTInfo,
  SBTTableComponent,
} from '~/components/custom/sbt-tableComponent'
import { Env } from '~/env'
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

// Types
interface CardFormState {
  name: string
  description: string
  votingPower: string
  isSBT: boolean
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

// const TokenTable = ({
//   cardData,
//   filter,
//   onViewMetadata,
//   onRevoke,
//   labels,
// }: {
//   cardData: SBTInfo[]
//   filter: string
//   onViewMetadata: (metadata: string) => void
//   onRevoke: (tokenId: string, isRevoked: boolean) => void
//   labels: Record<string, string>
// }) => {
//   const filteredData = useMemo(() => {
//     if (filter == 'all') return cardData
//     if (filter == 'revoked') return cardData.filter((token) => token.isRevoked)
//     if (filter == 'unrevoked')
//       return cardData.filter((token) => !token.isRevoked)

//     return []
//   }, [cardData, filter])

//   if (filteredData.length === 0) {
//     return (
//       <div className="overflow-x-auto rounded-xl bg-white shadow-lg w-full">
//         <div className="py-8 px-4 text-center text-gray-400 text-lg">
//           {labels.noTokensFound}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl bg-white shadow-lg w-full">
//       <Table className="w-full">
//         <TableHeader>
//           <TableRow className="hidden md:table-row bg-gray-100">
//             <TableHead className="font-bold w-8 text-gray-700 text-center">
//               #
//             </TableHead>
//             <TableHead className="font-bold text-gray-700 text-center">
//               {labels.name}
//             </TableHead>
//             <TableHead className="font-bold text-gray-700 text-center">
//               {labels.description}
//             </TableHead>
//             <TableHead className="font-bold text-gray-700 text-center">
//               Voting Power
//             </TableHead>
//             <TableHead className="font-bold text-gray-700 text-center">
//               {labels.image}
//             </TableHead>
//             <TableHead className="font-bold text-gray-700 text-center">
//               {labels.createdAt}
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredData.map((token, index) => (
//             <TableRow
//               key={token.tokenId}
//               className="hover:bg-gray-50 transition md:table-row flex flex-col md:flex-row md:items-center border-b last:border-b-0"
//             >
//               {/* Mobile Card Header */}
//               <TableCell className="md:hidden flex flex-row items-center gap-2 py-2 bg-gray-100 rounded-t-lg text-center justify-center">
//                 <span className="font-bold text-gray-500 text-center">
//                   #{index + 1}
//                 </span>
//                 <span className="font-bold">{token.name}</span>
//               </TableCell>

//               {/* Desktop Index */}
//               <TableCell className="hidden md:table-cell text-gray-700 font-medium text-center">
//                 {index + 1}
//               </TableCell>

//               {/* Name */}
//               <TableCell className="hidden md:table-cell flex-1 md:flex-none break-words text-gray-900 text-center">
//                 <span className="md:hidden font-semibold text-gray-500 text-center">
//                   {labels.name}:{' '}
//                 </span>
//                 {token.name}
//               </TableCell>

//               <TableCell className="hidden md:table-cell flex-1 md:flex-none break-words text-gray-900 text-center">
//                 {token.description}
//               </TableCell>
//               {/* Name */}
//               <TableCell className="hidden md:table-cell flex-1 md:flex-none break-words text-gray-900 text-center">
//                 {token.votingPower}
//               </TableCell>
//               {/* Image */}
//               <TableCell className="md:table-cell flex-1 md:flex-none text-center">
//                 <div className="flex items-center justify-center">
//                   <Image
//                     src={token.image}
//                     className="object-cover"
//                     alt={token.name}
//                     onError={(e) => {
//                       e.currentTarget.src = '/images/empty-nft.svg'
//                     }}
//                     width={96}
//                     height={96}
//                   />
//                 </div>
//               </TableCell>

//               {/* Created At */}
//               <TableCell className="md:table-cell flex-1 md:flex-none text-gray-700 text-center">
//                 <span className="md:hidden font-semibold text-gray-500">
//                   {labels.createdAt}:{' '}
//                 </span>
//                 {token.createdAt ? (
//                   <div className="flex items-center justify-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     {new Date(token.createdAt).toLocaleDateString()}
//                   </div>
//                 ) : (
//                   '-'
//                 )}
//               </TableCell>

//               {/* Actions */}
//               <TableCell className="md:table-cell gap-4 flex flex-row items-center justify-center text-center">
//                 <Button
//                   variant="outline"
//                   className="w-full md:w-auto"
//                   // onClick={() => onViewMetadata(token.metadata)}
//                 >
//                   <span className="flex items-center gap-1">
//                     <Eye className="w-4 h-4" />
//                     {labels.viewMetadata}
//                   </span>
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   className="w-full ml-2 md:w-auto bg-red-600 hover:bg-red-700 text-white"
//                   onClick={() => onRevoke(token.tokenId, token.isRevoked)}
//                 >
//                   <span className="flex items-center gap-1">
//                     <X className="w-4 h-4" />
//                     {token.isRevoked ? labels.unrevoke : labels.revoke}
//                   </span>
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <SBTTableComponent
//         headers={[...sbtTableHeaders, labels.action || 'Action']}
//         sbtInfo={cardData}
//         action={{ title: labels.revoke ?? 'Revoke' }}
//         onRevoke={(index) => {
//           onRevoke(
//             cardData[index]?.tokenId ?? '',
//             cardData[index]?.isRevoked ?? false
//           )
//         }}
//       />
//     </div>
//   )
// }

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
  disabled,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  form: CardFormState
  onFormChange: (field: keyof CardFormState, value: string) => void
  onImageSelect: () => void
  croppedImage: string | null
  selectedImage: string | null
  isCropModalOpen: boolean
  onCropComplete: (cropped: string) => void
  onCloseCropModal: () => void
  labels: Record<string, string>
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
              onFormChange('isSBT', e.target.value === 'sbt' ? 'true' : 'false')
            }}
          >
            <option value="sbt">{labels.sbt}</option>
            <option value="nft">{labels.nft}</option>
          </select>
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
  const [cardForm, setCardForm] = useState<CardFormState>({
    name: '',
    description: '',
    votingPower: '',
    isSBT: true,
  })

  const [sbtData, setSBTData] = useState<any[]>([])
  const [nftData, setNFTData] = useState<any[]>([])
  const [tokenData, setTokenData] = useState<any[]>([])

  const [refetchNFTData, setRefetchNFTData] = useState(false)
  const [refetchSBTData, setRefetchSBTData] = useState(false)
  const [loading, setLoading] = useState(false)

  const sbtClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: SBT_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })
  const nftClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: NFT_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })
  const { data: hash, error, writeContractAsync } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  // Effects
  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDict(locale)
      setDict(dictionary)
    }
    loadDictionary()
  }, [locale])

  const fetchSBTStatus = useCallback(
    async (_sbtData: SBTInfo[]) => {
      if (!chainId || !address || !_sbtData.length) return
      try {
        const statuses = await Promise.all(
          _sbtData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'isRevoked',
              args: [token.tokenId],
            })) as boolean
          })
        )

        const balances = await Promise.all(
          _sbtData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as BigInt
          })
        )

        setSBTData(
          _sbtData.map((token: SBTInfo, index: number) => ({
            ...token,
            isRevoked: statuses[index] || false,
            balance: balances[index]?.toString() || '0',
          }))
        )
      } catch (error) {
        console.error('Error fetching SBT status:', error)
      }
    },
    [chainId, address, sbtData]
  )

  const fetchNFTStatus = useCallback(
    async (_nftData: SBTInfo[]) => {
      if (!chainId || !address || !_nftData.length) return
      try {
        const statuses = await Promise.all(
          _nftData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'isRevoked',
              args: [token.tokenId],
            })) as boolean
          })
        )

        const balances = await Promise.all(
          _nftData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: NFTAddress[chainId || defaultChainId] as `0x${string}`,
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as BigInt
          })
        )

        setNFTData(
          _nftData.map((token: SBTInfo, index: number) => ({
            ...token,
            isRevoked: statuses[index] || false,
            balance: balances[index]?.toString() || '0',
          }))
        )
      } catch (error) {
        console.error('Error fetching SBT status:', error)
      }
    },
    [chainId, address, sbtData]
  )

  const fetchMetadata = async (tokenURI: string) => {
    const response = await fetch(tokenURI)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    const filteredSbtData: SBTInfo[] = sbtData.filter(
      (token: SBTInfo) => token.tokenId !== '1'
    )
    const filteredNftData: SBTInfo[] = nftData.filter(
      (token: SBTInfo) => token.tokenId !== '1'
    )
    setTokenData([...filteredSbtData, ...filteredNftData])
  }, [sbtData, nftData])

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        setLoading(true)
        const { data } = await nftClient.query({
          query: gql`
            query getNFTData {
              createdTokens(first: 10, orderDirection: desc, where: {}) {
                tokenId
                timestamp_
                tokenURI
                votingPower
              }
            }
          `,
        })

        let _nftData: SBTInfo[] = []
        for (const token of data.createdTokens) {
          let _metadata: any = {}
          try {
            _metadata = await fetchMetadata(
              `${Env.PINATA_GATEWAY_URL}/ipfs/${token.tokenURI}`
            )
          } catch (error) {
            console.error('Error fetching NFT data:', error)
          }

          _nftData.push({
            tokenId: token.tokenId,
            createdAt: Number(token.timestamp_).toString(),
            image: _metadata.image
              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${_metadata.image}`
              : EMPTY_NFT_IMAGE,
            name: _metadata.name,
            description: _metadata.description,
            balance: '0',
            votingPower: token.votingPower,
            isRevoked: false,
            isSBT: false,
          })
        }

        setNFTData([..._nftData])
        await fetchNFTStatus(_nftData)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error:', error)
      }
    }
    fetchNFTData()
  }, [refetchNFTData])

  useEffect(() => {
    const fetchSBTData = async () => {
      try {
        setLoading(true)
        const { data } = await sbtClient.query({
          query: gql`
            query getSBTData {
              createdTokens(first: 10, orderDirection: desc, where: {}) {
                tokenId
                timestamp_
                tokenURI
                votingPower
              }
            }
          `,
        })

        let _sbtData: SBTInfo[] = []
        for (const token of data.createdTokens) {
          let _metadata: any = {}
          try {
            _metadata = await fetchMetadata(
              `${Env.PINATA_GATEWAY_URL}/ipfs/${token.tokenURI}`
            )
          } catch (error) {
            console.error('Error fetching SBT data:', error)
          }

          _sbtData.push({
            tokenId: token.tokenId,
            createdAt: Number(token.timestamp_).toString(),
            image: _metadata.image
              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${_metadata.image}`
              : EMPTY_NFT_IMAGE,
            name: _metadata.name,
            description: _metadata.description,
            balance: '0',
            votingPower: token.votingPower,
            isRevoked: false,
            isSBT: true,
          })
        }

        setSBTData([..._sbtData])
        await fetchSBTStatus(_sbtData)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error:', error)
      }
    }
    fetchSBTData()
  }, [refetchSBTData])

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
    (field: keyof CardFormState, value: string) => {
      setCardForm((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const uploadImage = useCallback(async () => {
    if (!croppedImage || !address) return

    setIsCreateModalOpen(false)

    const contractAddress =
      cardForm.isSBT == true
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
      cardForm.isSBT == true ? SBT_GROUP_ID : NFT_GROUP_ID
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
          args: [jsonUploadResult?.cid, cardForm.votingPower],
        })
        await waitForTransactionReceipt(config, {
          hash: createTokenTx,
          confirmations: 1,
        })
        toast({ title: 'Token created successfully!' })

        if (cardForm.isSBT.toString() === 'true') {
          setRefetchSBTData(!refetchSBTData)
        } else {
          setRefetchNFTData(!refetchNFTData)
        }
      } catch (error) {
        console.error('Error creating token:', error)
        toast({ title: 'Failed to create token' })
      } finally {
        setCroppedImage(null)
        setSelectedImage(null)
        setCardForm({ name: '', description: '', votingPower: '', isSBT: true })
        setIsTokenTypeOpen(false)
        setIsFilterOpen(false)
      }
    }
  }, [croppedImage, address, cardForm, chainId, writeContractAsync, toast])

  const handleViewMetadata = useCallback((metadata: string) => {
    window.open(metadata, '_blank')
  }, [])

  const handleCreateModalOpen = useCallback(() => {
    setSelectedImage(null)
    setCroppedImage(null)
    setIsCreateModalOpen(true)
  }, [])

  const handleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false)
    setCardForm({ name: '', description: '', votingPower: '', isSBT: true })
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
    address
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

        toast({
          title: token.isRevoked
            ? 'Token unrevoked successfully'
            : 'Token revoked successfully',
        })
        await fetchSBTStatus(sbtData)
      } catch (error) {
        console.error('Error revoking token:', error)
        toast({ title: 'Failed to revoke token' })
      }
    },
    [address, writeContractAsync, chainId, toast, sbtData, fetchSBTStatus]
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
          sbtInfo={tokenData}
          action={{ title: 'Revoke' }}
          onRevoke={(token: SBTInfo) => {
            handleRevokeToken(token)
          }}
        />

        {/* <TokenTable
          cardData={
            tokenType == 'sbt'
              ? sbtData
              : tokenType == 'nft'
                ? nftData
                : [...sbtData, ...nftData]
          }
          filter={filter}
          onViewMetadata={handleViewMetadata}
          onRevoke={handleRevokeToken}
          labels={currentLabels}
        /> */}
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
        />
      </div>
    </div>
  )
}
