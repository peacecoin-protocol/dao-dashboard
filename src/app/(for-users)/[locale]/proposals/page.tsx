'use client'

import React, { useState, useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import { useAccount, useReadContract } from 'wagmi'
import { Link } from '~/i18n/link'
import { Button } from '~/components/ui/button'
import { PagePropsWithLocale } from '~/i18n/types'
import { pceAddress } from '~/app/constants/constants'
import { formatEther } from 'ethers'

import { getDict } from '~/i18n/get-dict'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

export default function ForProposalPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<any>(null)

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

  const { address, chainId } = useAccount()
  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'getVotes',
    args: [address],
    chainId: chainId,
  })
  return (
    <div>
      <div className="links flex flex-row gap-10 items-center justify-center h-[50vh]">
        <Button className="w-40 py-6" variant="outline" asChild>
          <Link className="py-4" locale={locale} href="/pending">
            {dict ? dict.vote.pending : ''}
          </Link>
        </Button>
        <Button className="w-40 py-6" variant="outline" asChild>
          <Link locale={locale} href="/closed">
            {dict ? dict.vote.close : ''}
          </Link>
        </Button>
        <Button className="w-40 py-6" variant="outline" asChild>
          <Link locale={locale} href="/submit">
            {dict ? dict.vote.submit : ''}
          </Link>
        </Button>

        <Button className="w-40 py-6" variant="outline" asChild>
          <Link className="text-center" locale={locale} href="/delegate">
            {dict ? dict.vote.delegate : ''}
            {<br></br>} {votes ? formatEther(BigInt(votes as string)) : '0'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
