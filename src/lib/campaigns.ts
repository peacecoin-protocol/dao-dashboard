import { readContract } from '@wagmi/core'
import { SBT_ABI } from '~/app/ABIs/SBT'
import { appDeploymentEnv } from '~/app/constants/constants'
import { type CAMPAIGN, type SBTInfo } from '~/i18n/types'
import { config } from '~/lib/config'
import { createClient } from '~/utils/supabase/client'

type SupabaseClient = ReturnType<typeof createClient>

type CampaignFilters = {
  creator?: `0x${string}`
}

type TokenLookup = Pick<SBTInfo, 'daoId' | 'image' | 'isSBT' | 'tokenId'>

const createTokenLookupKey = ({
  daoId,
  tokenId,
  isSBT,
}: {
  daoId: string
  tokenId: string
  isSBT: boolean
}) => `${daoId}:${tokenId}:${isSBT ? 'sbt' : 'nft'}`

export async function fetchDaoNamesByIds(
  supabase: SupabaseClient,
  daoIds: string[]
) {
  const uniqueDaoIds = Array.from(new Set(daoIds.filter(Boolean)))

  if (uniqueDaoIds.length === 0) {
    return {}
  }

  const { data, error } = await supabase
    .from('DAO')
    .select('daoId, daoName')
    .in('daoId', uniqueDaoIds)
    .eq('environment', appDeploymentEnv)

  if (error || !data) {
    if (error) {
      console.error('Error fetching DAO names:', error)
    }
    return {}
  }

  return data.reduce<Record<string, string>>((acc, dao) => {
    acc[dao.daoId] = dao.daoName
    return acc
  }, {})
}

export async function fetchCampaignsWithMetadata(
  supabase: SupabaseClient,
  filters: CampaignFilters = {}
) {
  let query = supabase
    .from('Campaign')
    .select()
    .eq('environment', appDeploymentEnv)
    .order('campaignId', { ascending: true })

  if (filters.creator) {
    query = query.eq('creator', filters.creator)
  }

  const { data: campaigns } = await query

  if (!campaigns?.length) {
    return [] as CAMPAIGN[]
  }

  const uniqueDaoIds = Array.from(new Set(campaigns.map((c) => c.daoId).filter(Boolean)))

  const { data: tokens } = await supabase
    .from('Token')
    .select('daoId, tokenId, isSBT, image')
    .eq('environment', appDeploymentEnv)
    .in('daoId', uniqueDaoIds)

  const tokenLookup = new Map(
    ((tokens ?? []) as TokenLookup[]).map((token) => [
      createTokenLookupKey(token),
      token,
    ])
  )

  return (campaigns as CAMPAIGN[]).map((campaign) => {
    const token = tokenLookup.get(
      createTokenLookupKey({
        daoId: campaign.daoId,
        tokenId: String(campaign.sbtId),
        isSBT: campaign.tokenType === 1,
      })
    )

    return {
      ...campaign,
      daoId: token?.daoId ?? campaign.daoId,
      image: token?.image ?? campaign.image,
    }
  })
}

interface FetchOwnedTokenBalancesOptions {
  account?: `0x${string}`
  daoId?: string
  supabase: SupabaseClient
}

export async function fetchOwnedTokenBalances({
  account,
  daoId,
  supabase,
}: FetchOwnedTokenBalancesOptions) {
  if (!account) {
    return [] as SBTInfo[]
  }

  let query = supabase
    .from('Token')
    .select()
    .eq('environment', appDeploymentEnv)

  if (daoId) {
    query = query.eq('daoId', daoId)
  }

  const { data: tokens } = await query

  if (!tokens?.length) {
    return [] as SBTInfo[]
  }

  const balances = await Promise.all(
    (tokens as SBTInfo[]).map(async (token) => {
      try {
        return (await readContract(config, {
          abi: SBT_ABI,
          address: token.address as `0x${string}`,
          functionName: 'balanceOf',
          args: [account, token.tokenId],
        })) as number
      } catch (error) {
        console.error('Error fetching token balance:', error)
        return 0
      }
    })
  )

  return (tokens as SBTInfo[])
    .map((token, index) => ({
      ...token,
      balance: balances[index] ?? 0,
    }))
    .filter((token) => Number(token.balance) > 0)
}
