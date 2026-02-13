'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import {
  pceAddress,
  governorAddress,
  bountyAddress,
  defaultChainId,
} from '~/app/constants/constants'

import { formatString } from '~/components/utils'
import { BOUNTY_ABI } from '~/app/ABIs/Bounty'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { useEffect, useState } from 'react'
import { formatEther } from 'ethers'
import { useAccount, useReadContract } from 'wagmi'
import { createClient } from '~/utils/supabase/client'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { Spinner } from '~/components/ui/Spinner'

export default function ForUsersIndexPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { address, chainId } = useAccount()
  const [proposalStatus, setStatus] = useState<any[]>([])
  let [loading, setLoading] = useState(false)

  const supabase = createClient()

  const [proposals, setProposals] = useState<any[]>([])

  useEffect(() => {
    const fetchProposals = async () => {
      const { data: proposals } = await supabase
        .from('Proposal')
        .select('*')
        .eq('proposer', address)

      setProposals(proposals ?? [])
    }
    fetchProposals()
  }, [address, supabase])

  // Helper function to fetch DAO name from Supabase given daoId
  // Memoize DAO names to avoid repeated calls and make getDAOName synchronous for rendering
  const [daoNames, setDaoNames] = useState<{ [daoId: string]: string }>({})

  async function fetchAndSetDAOName(daoId: string) {
    if (!daoId || daoNames[daoId]) return
    try {
      const { data, error } = await supabase
        .from('DAO')
        .select('*')
        .eq('daoId', daoId)
        .single()

      if (error) {
        console.error('Error fetching DAO name:', error)
        return
      }

      const resolvedName = data?.daoName ?? data?.name
      if (resolvedName) {
        setDaoNames((prev) => ({ ...prev, [daoId]: resolvedName }))
      }
    } catch (error) {
      console.error('Error fetching DAO name:', error)
    }
  }

  function getDAOName(daoId: string): string {
    if (!daoId) return ''
    if (!daoNames[daoId]) {
      // Kick off the async fetch but don't block render
      fetchAndSetDAOName(daoId)
      return '' // Return empty string (or a placeholder) while loading
    }
    return daoNames[daoId]
  }

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

  const getWithdrawnAmount = (bountyInfo: unknown): string => {
    if (
      Array.isArray(bountyInfo) &&
      bountyInfo.length > 0 &&
      typeof bountyInfo[0] === 'bigint'
    ) {
      return formatEther(bountyInfo[1] as bigint)
    }
    return '0'
  }

  const { data: pceBalance, refetch: refetchBalance } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: contributorBounties, refetch: refetchContributorBounties } =
    useReadContract({
      address: bountyAddress[chainId || defaultChainId] as `0x${string}`,
      abi: BOUNTY_ABI,
      functionName: 'contributorBounties',
      args: [address],
    })

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress[chainId || defaultChainId] as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
      args: [],
    })

  const navigation = dict?.navigation ?? {}
  const dashboard = dict?.dashboard ?? {}
  const proposal = dict?.proposal ?? {}
  return (
    <>
      <div className="w-full">
        <div className="w-full mx-auto gap-4 flex flex-col">
          <PageHeaderSection title={navigation.dashboard ?? ''} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {dashboard.totalproposals ?? ''}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    d="M8 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{proposals.length}</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {dashboard.totalrevenue ?? ''}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 PCE</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {dashboard.pcebalance ?? ''}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pceBalance
                    ? formatString(formatEther(pceBalance as bigint))
                    : '0'}{' '}
                  PCE
                </div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{dashboard.recent ?? ''}</CardTitle>
                <CardDescription>
                  {dashboard.made ?? ''} {proposals.length}{' '}
                  {dashboard.proposal_success ?? ''}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{dashboard.tableNo ?? 'No.'}</TableHead>
                        <TableHead>
                          {dashboard.tableDaoName ?? 'DAO Name'}
                        </TableHead>
                        <TableHead>
                          {dashboard.tableDescription ?? 'Description'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals &&
                        proposals.map((proposal, index) => (
                          <TableRow
                            key={proposal.proposalId ?? proposal.id ?? index}
                          >
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {getDAOName(proposal.daoId) ?? ''}
                            </TableCell>
                            <TableCell className="font-medium">
                              {proposal.description}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>{proposals.length}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
            <Spinner show={true} size="large" />
          </div>
        )}
      </div>
    </>
  )
}
