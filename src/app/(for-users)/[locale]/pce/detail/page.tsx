'use client'

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { useBlockNumber, useBlock } from 'wagmi'
import { formatEther } from 'ethers'
export default function ForPCEDetailPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const navigate = useNavigate()
  const { proposal } = useLocation().state || { proposal: undefined }
  const [dict, setDict] = useState<Dictionary | null>(null)

  const { data: blockNumber } = useBlockNumber()
  const { data: block } = useBlock({
    blockNumber,
  })

  return (
    <div className="flex flex-col w-full gap-8 p-8">
      {!proposal ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-gray-600 ">Proposal not found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* <h1 className="text-3xl font-bold">{proposal[9]}</h1> */}

          <div className="flex flex-row gap-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
              Transfer tokens
            </span>
          </div>

          <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-600">For</span>
                <span className="text-sm text-gray-500">
                  Votes in favor of the proposal
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  {Number(formatEther(proposal[5] || 0)).toLocaleString()} votes
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
                  % of total votes)
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-600">Against</span>
                <span className="text-sm text-gray-500">
                  Votes against the proposal
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  {Number(formatEther(proposal[6] || 0)).toLocaleString()} votes
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
                  % of total votes)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{proposal[9]}</p>
          </div>
        </div>
      )}
    </div>
  )
}
