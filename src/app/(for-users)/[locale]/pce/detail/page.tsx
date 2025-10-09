'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { getDict } from '~/i18n/get-dict'
import { formatEther } from 'viem'

export default function ForPCEDetailPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Try to get proposal from search params or session storage
  const [proposal, setProposal] = useState<any>(null)
  const [dict, setDict] = useState<Dictionary | null>(null)

  const localDict = dict?.pceDetail ?? {}

  useEffect(() => {
    // Try to get proposal data from sessionStorage if passed via state
    const proposalData = sessionStorage.getItem('currentProposal')
    if (proposalData) {
      setProposal(JSON.parse(proposalData))
    }
  }, [])

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

  return (
    <div className="flex flex-col w-full gap-8 p-8">
      {!proposal ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-gray-600 ">
            {localDict.proposalNotFound ?? 'Proposal not found'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* <h1 className="text-3xl font-bold">{proposal[9]}</h1> */}

          <div className="flex flex-row gap-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
              {localDict.transferTokens ?? 'Transfer tokens'}
            </span>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-600">
                  {localDict.voteFor ?? 'Vote For'}
                </span>
                <span className="text-sm text-gray-500">
                  {localDict.forDescription ?? 'Votes in favor of the proposal'}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  {Number(formatEther(proposal[5] || 0)).toLocaleString()}{' '}
                  {localDict.votes ?? 'votes'}
                </span>
                <span className="text-sm text-gray-500">
                  (
                  {proposal[5] && proposal[6] !== undefined
                    ? proposal[6] === 0 && proposal[5] > 0
                      ? '100'
                      : (
                          (Number(formatEther(proposal[5])) /
                            (Number(formatEther(proposal[5])) +
                              Number(formatEther(proposal[6])))) *
                          100
                        ).toFixed(2)
                    : '0'}
                  % {localDict.ofTotalVotes ?? '% of total votes'}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-600">
                  {localDict.voteAgainst ?? 'Vote Against'}
                </span>
                <span className="text-sm text-gray-500">
                  {localDict.againstDescription ?? 'Votes against the proposal'}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  {Number(formatEther(proposal[6] || 0)).toLocaleString()}{' '}
                  {localDict.votes ?? 'votes'}
                </span>
                <span className="text-sm text-gray-500">
                  (
                  {proposal[5] && proposal[6] !== undefined
                    ? proposal[5] === 0 && proposal[6] > 0
                      ? '100'
                      : (
                          (Number(formatEther(proposal[6])) /
                            (Number(formatEther(proposal[5])) +
                              Number(formatEther(proposal[6])))) *
                          100
                        ).toFixed(2)
                    : '0'}
                  % {localDict.ofTotalVotes ?? '% of total votes'})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              {localDict.description ?? 'Description'}
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">{proposal[9]}</p>
          </div>
        </div>
      )}
    </div>
  )
}