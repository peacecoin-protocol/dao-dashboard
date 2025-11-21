'use client'

import { timestampToDate } from '../utils'
import Image from 'next/image'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { Env } from '~/env'

export interface SBTInfo {
  tokenId: string
  name: string
  description: string
  votingPower: string
  image: string
  createdAt: string
  isRevoked: boolean
  isSBT: boolean
}

interface SBTTableProps {
  headers: string[]
  sbtInfo: SBTInfo[]
}

export function SBTTableComponent({ headers, sbtInfo }: SBTTableProps) {
  const getImageSrc = (image?: string) => {
    if (!image) return EMPTY_NFT_IMAGE
    return `${Env.PINATA_GATEWAY_URL}/ipfs/${image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        {sbtInfo && sbtInfo.length > 0 ? (
          sbtInfo.map((sbt, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={getImageSrc(sbt.image)}
                    alt={sbt.name || ''}
                    width={96}
                    height={96}
                    className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover aspect-square"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                    {sbt.isSBT ? 'SBT' : 'NFT'}
                  </span>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white break-words">
                    {sbt.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 sm:line-clamp-3 break-words">
                    {sbt.description}
                  </p>
                </div>
              </div>

              <dl className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Token ID:
                  </dt>
                  <dd className="break-all">{sbt.tokenId}</dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Voting Power:
                  </dt>
                  <dd>{sbt.votingPower}</dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2 md:col-span-2">
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Created At:
                  </dt>
                  <dd className="break-words">
                    {timestampToDate(Number(sbt.createdAt))}
                  </dd>
                </div>
              </dl>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 text-center text-sm text-gray-600 dark:text-gray-300">
            No tokens available
          </div>
        )}
      </div>

      {/* Total Footer */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-4 text-center font-medium text-sm text-gray-900 dark:text-white">
        Total: {(sbtInfo && sbtInfo.length) ?? '0'}
      </div>
    </div>
  )
}
