'use client'

import { useEffect, useMemo, useState } from 'react'
import { ethers, parseEther, ZeroAddress } from 'ethers'
import { useToast } from '~/hooks/use-toast'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { CAMPAIGN } from '~/i18n/types'

import { Button } from '~/components/ui/button'
import {
  campaignAddress,
  campaignTableHeaders,
  GAS_LIMIT,
  appDeploymentEnv,
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, SupabaseDao } from '~/i18n/types'
import { CreateCampaignModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/createCampaignModal'
import { AddWhitelistModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/addWhitelistModal'
import { TableComponent } from '~/components/custom/tableComponent'
import { erc20Abi } from 'viem'
import { createClient } from '~/utils/supabase/client'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { LoadingOverlay } from '~/components/ui/loading-overlay'
import { useDictionary } from '~/hooks/use-dictionary'
import { useEnsureSupportedChain } from '~/hooks/use-ensure-supported-chain'
import { useTransactionToast } from '~/hooks/use-transaction-toast'
import { fetchCampaignsWithMetadata } from '~/lib/campaigns'
import { resolveAddress } from '~/lib/utils'

// Main component
export default function ForCampaignPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const dict = useDictionary(locale)
  const campaign = dict?.campaign ?? {}
  const { address, chainId } = useAccount()
  const { toast } = useToast()
  const [allDAOs, setAllDAOs] = useState<SupabaseDao[]>([])

  const supabase = useMemo(() => createClient(), [])
  useEnsureSupportedChain()

  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])
  const [refetchCampaignData, setRefetchCampaignData] = useState(false)

  useEffect(() => {
    const fetchCampaignData = async () => {
      setIsFetchingCampaigns(true)
      try {
        if (!address) {
          setCampaignData([])
          return
        }

        setCampaignData(
          await fetchCampaignsWithMetadata(supabase, {
            creator: address,
          })
        )
      } finally {
        setIsFetchingCampaigns(false)
      }
    }
    fetchCampaignData()
  }, [address, supabase, refetchCampaignData])

  useEffect(() => {
    const fetchAllDAOs = async () => {
      setIsFetchingDaos(true)
      try {
        if (!address) {
          setAllDAOs([])
          return
        }

        const { data: daos } = await supabase
          .from('DAO')
          .select()
          .eq('creator', address as `0x${string}`)
          .eq('environment', appDeploymentEnv)
        setAllDAOs(daos as SupabaseDao[])
      } finally {
        setIsFetchingDaos(false)
      }
    }
    fetchAllDAOs()
  }, [supabase, address])

  // State
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false)
  const [isAddWhitelistOpen, setIsAddWhitelistOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isFetchingCampaigns, setIsFetchingCampaigns] = useState(true)
  const [isFetchingDaos, setIsFetchingDaos] = useState(true)
  const [isInvalidToken, setIsInvalidToken] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<
    number | undefined
  >(undefined)

  // Contract hooks
  const { data: hash, error, writeContractAsync } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  useTransactionToast({
    error,
    isConfirmed,
    isConfirming,
  })

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

      if (
        typeof formData.id === 'undefined' ||
        !Array.isArray(addresses) ||
        typeof encodedGists === 'undefined'
      ) {
        throw new Error('Invalid arguments for addCampWinners')
      }

      const tx = await writeContractAsync({
        abi: CAMPAIGN_ABI,
        address: resolveAddress(campaignAddress, chainId),
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

  const { data: campaignId } = useReadContract({
    abi: CAMPAIGN_ABI,
    address: resolveAddress(campaignAddress, chainId),
    functionName: 'campaignId',
  })

  const handleCreateCampaign = async (formData: any) => {
    if (isInvalidToken) {
      toast({
        title: 'Invalid token',
      })
      setIsCreateCampaignOpen(false)
      setIsInvalidToken(false)
      return
    }

    setIsCreateCampaignOpen(false)
    setIsAddWhitelistOpen(false)
    setLoading(true)

    try {
      if (formData.tokenType == 0) {
        const _allowance = await readContract(config, {
          abi: erc20Abi,
          address: formData.tokenAddress as `0x${string}`,
          functionName: 'allowance',
          args: [
            address as `0x${string}`,
            resolveAddress(campaignAddress, chainId),
          ],
        })
        if (_allowance < parseEther(formData.totalAmount)) {
          const hash = await writeContractAsync({
            abi: erc20Abi,
            address: formData.tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [
              resolveAddress(campaignAddress, chainId),
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
        const tx = await writeContractAsync({
          abi: CAMPAIGN_ABI,
          address: resolveAddress(campaignAddress, chainId),
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
            environment: appDeploymentEnv,
          })
        }

        toast({
          title: 'Campaign created successfully',
        })
      } catch (error) {
        console.error('Error creating campaign:', error)
        toast({
          title: 'Failed to create campaign',
        })
      }

      setRefetchCampaignData((prev) => !prev)
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
      <LoadingOverlay
        isLoading={loading || isFetchingCampaigns || isFetchingDaos}
      />

      <div className="w-full mx-auto space-y-4">
        {/* Header Section */}
        <PageHeaderSection
          title={campaign.title ?? ''}
          description={campaign.description ?? ''}
        />

        {/* Modals */}
        <CreateCampaignModal
          isOpen={isCreateCampaignOpen}
          onClose={() => setIsCreateCampaignOpen(false)}
          onSubmit={handleCreateCampaign}
          setIsInvalidToken={setIsInvalidToken}
          campaign={campaign}
          allDAOs={allDAOs}
        />

        <AddWhitelistModal
          isOpen={isAddWhitelistOpen}
          onClose={() => {
            setIsAddWhitelistOpen(false)
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
                onClick={() => setIsCreateCampaignOpen(true)}
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
          setIsAddWhitelistOpen(true)
        }}
      />
    </div>
  )
}
