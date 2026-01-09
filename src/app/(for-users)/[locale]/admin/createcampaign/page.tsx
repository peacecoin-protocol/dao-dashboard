'use client'

import { useEffect, useState } from 'react'
import { ethers, parseEther, ZeroAddress } from 'ethers'
import { useToast } from '~/hooks/use-toast'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  type BaseError,
  useReadContract,
} from 'wagmi'
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { CAMPAIGN } from '~/i18n/types'

import { Button } from '~/components/ui/button'
import {
  campaignAddress,
  defaultChainId,
  campaignTableHeaders,
  GAS_LIMIT,
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary, SupabaseDao } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { Spinner } from '~/components/ui/Spinner'
import { CreateCampaignModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/createCampaignModal'
import { AddWhitelistModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/addWhitelistModal'
import { TableComponent } from '~/components/custom/tableComponent'
import { erc20Abi } from 'viem'
import { createClient } from '~/utils/supabase/client'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'

// Constants
const DEFAULT_CAMPAIGN_ID = -1

// Types
interface DialogState {
  isOpen: boolean
  isCreateOpen: boolean
  isAddWinnersOpen: boolean
  campaignId: number
}

// Main component
export default function ForCampaignPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const campaign = dict?.campaign ?? {}
  const { address, chainId } = useAccount()
  const { chains, switchChain } = useSwitchChain()
  const { toast } = useToast()
  const [allDAOs, setAllDAOs] = useState<SupabaseDao[]>([])
  const [allTokens, setAllTokens] = useState<SBTInfo[]>([])

  const supabase = createClient()

  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])
  const [refetchCampaignData, setRefetchCampaignData] = useState(false)

  useEffect(() => {
    const fetchCampaignData = async () => {
      const { data: campaignData } = await supabase
        .from('Campaign')
        .select()
        .eq('creator', address as `0x${string}`)
        .order('campaignId', { ascending: true })

      if (campaignData && campaignData.length > 0) {
        const _tokenData = await Promise.all(
          campaignData.map(async (campaign, index) => {
            const { data } = await supabase
              .from('Token')
              .select()
              .eq('tokenId', campaign.sbtId.toString())
              .eq('isSBT', campaign.tokenType == 1 ? true : false)
              .eq('daoId', campaign.daoId)

            campaignData[index].daoId = data?.[0]?.daoId
            campaignData[index].image = data?.[0]?.image
          })
        )

        setCampaignData(campaignData as CAMPAIGN[])
      }
    }
    fetchCampaignData()
  }, [address, supabase, refetchCampaignData])

  useEffect(() => {
    const fetchAllDAOs = async () => {
      const { data: daos } = await supabase
        .from('DAO')
        .select()
        .eq('creator', address as `0x${string}`)
      setAllDAOs(daos as SupabaseDao[])
    }
    fetchAllDAOs()
  }, [supabase, address])

  useEffect(() => {
    const fetchAllTokens = async () => {
      const { data: tokens } = await supabase.from('Token').select()
      setAllTokens(tokens as SBTInfo[])
    }
    fetchAllTokens()
  }, [supabase, address])

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    isCreateOpen: false,
    isAddWinnersOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [isInvalidToken, setIsInvalidToken] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<
    number | undefined
  >(undefined)

  // Contract hooks
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

  // Effects
  useEffect(() => {
    const switchChainAndReload = async () => {
      if (!chainId || !chains.some((chain) => chain.id === chainId)) {
        switchChain({ chainId: defaultChainId })
      }
    }
    switchChainAndReload()
  }, [chainId, chains, switchChain])

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {}
    }
    fetchDict()
  }, [locale])

  useEffect(() => {
    if (!dialogState.isOpen) {
      setDialogState((prev) => ({ ...prev, campaignId: DEFAULT_CAMPAIGN_ID }))
    }
  }, [dialogState.isOpen])

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction Succeeded!' })
    } else if (isConfirming) {
      toast({ title: 'Transaction Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, toast])

  const handleAddWhitelist = async (formData: any) => {
    setLoading(true)
    try {
      const encodedGists = formData.data.map(
        (item: { address: string; git: string }, index: number) =>
          ethers.keccak256(ethers.toUtf8Bytes(item.git.trim()))
      )
      let addresses = formData.data.map(
        (item: { address: string }) => item.address
      )

      const isVerifySignature = campaignData.find(
        (campaign) => campaign.campaignId === formData.id
      )?.validateSignatures

      if (isVerifySignature) {
        addresses = [ZeroAddress]
      }

      console.log('encodedGists', encodedGists)
      console.log('addresses', addresses)
      console.log('formData.id', formData.id)

      // Make sure formData.id, addresses, and encodedGists are all defined before simulating
      if (
        typeof formData.id === 'undefined' ||
        !Array.isArray(addresses) ||
        typeof encodedGists === 'undefined'
      ) {
        throw new Error('Invalid arguments for addCampWinners')
      }
      const simulateResult = await simulateContract(config, {
        abi: CAMPAIGN_ABI,
        address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'addCampWinners',
        args: [formData.id, addresses, encodedGists],
      })
      console.log('simulatedTx', simulateResult)

      const tx = await writeContractAsync({
        abi: CAMPAIGN_ABI,
        address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'addCampWinners',
        args: [formData.id, addresses, encodedGists],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      toast({
        title: 'Winners added successfully',
      })
    } catch (error) {
      console.error('Error adding whitelist:', error)
      toast({
        title: 'Failed to add whitelist',
      })
    } finally {
      setLoading(false)
    }
  }

  const { data: campaignId, refetch: refetchCampaignId } = useReadContract({
    abi: CAMPAIGN_ABI,
    address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
    functionName: 'campaignId',
  })

  const handleCreateCampaign = async (formData: any) => {
    if (isInvalidToken) {
      toast({
        title: 'Invalid token',
      })
      setDialogState((prev) => ({
        ...prev,
        isCreateOpen: false,
      }))
      setIsInvalidToken(false)
      return
    }

    setDialogState((prev) => ({
      ...prev,
      isCreateOpen: false,
      isAddWinnersOpen: false,
    }))
    setLoading(true)

    try {
      if (formData.tokenType == 0) {
        const _allowance = await readContract(config, {
          abi: erc20Abi,
          address: formData.tokenAddress as `0x${string}`,
          functionName: 'allowance',
          args: [
            address as `0x${string}`,
            campaignAddress[chainId || defaultChainId] as `0x${string}`,
          ],
        })
        if (_allowance < parseEther(formData.totalAmount)) {
          const hash = await writeContractAsync({
            abi: erc20Abi,
            address: formData.tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [
              campaignAddress[chainId || defaultChainId] as `0x${string}`,
              parseEther(formData.totalAmount),
            ],
          })

          await waitForTransactionReceipt(config, {
            hash: hash,
            confirmations: 1,
          })
        }
      }

      const startDateTimestamp = Math.floor(
        new Date(formData.startDate).getTime() / 1000
      )
      const endDateTimestamp = Math.floor(
        new Date(formData.endDate).getTime() / 1000
      )

      const campaign = {
        daoId: formData.daoId,
        sbtId: formData.sbtId,
        title: formData.title,
        description: formData.description,
        token: formData.tokenType != 0 ? ZeroAddress : formData.tokenAddress,
        tokenType: formData.tokenType,
        claimAmount:
          formData.tokenType !== 0
            ? formData.claimAmount
            : parseEther(formData.claimAmount),
        totalAmount:
          formData.tokenType !== 0
            ? formData.totalAmount
            : parseEther(formData.totalAmount),
        startDate: String(startDateTimestamp),
        endDate: String(endDateTimestamp),
        validateSignatures: formData.isVerifySignature,
        creator: address as `0x${string}`,
      }

      try {
        const simulateResult = await simulateContract(config, {
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'createCampaign',
          args: [campaign],
        })

        const tx = await writeContractAsync({
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'createCampaign',
          args: [campaign],
          gas: BigInt(GAS_LIMIT),
        })

        const receipt = await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })

        if (receipt.status == 'success') {
          await supabase.from('Campaign').insert({
            ...campaign,
            created_at: new Date().toISOString(),
            campaignId: (Number(campaignId) || 0) + 1,
          })
        }
      } catch (error) {
        console.error('Error creating campaign:', error)
        toast({
          title: 'Failed to create campaign',
        })
      }

      setRefetchCampaignData(!refetchCampaignData)
      toast({
        title: 'Campaign created successfully',
      })
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: 'Failed to create campaign',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
          <Spinner show={true} size="large" />
        </div>
      )}

      <div className="w-full mx-auto space-y-4">
        {/* Header Section */}
        <PageHeaderSection
          title={campaign.title ?? ''}
          description={campaign.description ?? ''}
        />

        {/* Modals */}
        <CreateCampaignModal
          isOpen={dialogState.isCreateOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isCreateOpen: false }))
          }
          onSubmit={handleCreateCampaign}
          setIsInvalidToken={setIsInvalidToken}
          campaign={campaign}
          allDAOs={allDAOs}
          allTokens={allTokens}
        />

        <AddWhitelistModal
          isOpen={dialogState.isAddWinnersOpen}
          onClose={() => {
            setDialogState((prev) => ({ ...prev, isAddWinnersOpen: false }))
            setSelectedCampaignId(undefined)
          }}
          campaignData={campaignData}
          onSubmit={handleAddWhitelist}
          campaign={campaign}
          initialCampaignId={selectedCampaignId}
        />

        {/* Campaigns Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              <Button
                onClick={() =>
                  setDialogState((prev) => ({ ...prev, isCreateOpen: true }))
                }
                className="w-full sm:w-auto"
              >
                {campaign.createCampaign ?? 'Create Campaign'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TableComponent
        headers={campaignTableHeaders}
        campaignInfo={campaignData}
        onCellClick={(campaignId) => {
          setSelectedCampaignId(campaignId)
          setDialogState((prev) => ({ ...prev, isAddWinnersOpen: true }))
        }}
      />
    </div>
  )
}
