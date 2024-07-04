'use client'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

import 'react-toastify/dist/ReactToastify.css'
import { useAccount, useReadContract } from 'wagmi'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { PagePropsWithLocale } from '~/i18n/types'
import { pceAddress } from '~/app/constants/constants'
import { formatEther } from 'ethers'

export default function ForProposalPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
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
            Pending Proposals
          </Link>
        </Button>
        <Button className="w-40 py-6" variant="outline" asChild>
          <Link locale={locale} href="/closed">
            Closed Proposals
          </Link>
        </Button>
        <Button className="w-40 py-6" variant="outline" asChild>
          <Link locale={locale} href="/submit">
            Submit Proposals
          </Link>
        </Button>

        <Button className="w-40 py-6" variant="outline" asChild>
          <Link className="text-center" locale={locale} href="/delegate">
            Delegate Votes {<br></br>}{' '}
            {votes ? formatEther(BigInt(votes as string)) : '0'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
