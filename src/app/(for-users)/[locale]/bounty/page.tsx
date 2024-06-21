'use client'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  pceAddress,
  bountyAddress,
  POLY_SCAN_TX,
} from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { BOUNTY_ABI } from '~/app/ABIs/Bounty'

import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'
import { parseEther, createClient } from 'viem'
import { polygonAmoy } from '@wagmi/core/chains'
import { http, createConfig } from '@wagmi/core'

import Link from 'next/link'
import { ethers, formatEther } from 'ethers'

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

const provider = new ethers.JsonRpcProvider(
  'https://polygon-amoy.blockpi.network/v1/rpc/public'
)

export default function ForBountyPage() {
  const { address, chainId } = useAccount()
  const { data: hash, error, writeContractAsync } = useWriteContract()

  // const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [bountyAmount, setBountyAmount] = useState('')
  const [contributorAddr, setContributorAddr] = useState('')
  const [proposalId, setProposalId] = useState('')
  const [claimableBounty, setClaimableBounty] = useState('')

  const { data: pceBalance, refetch: refetchBalance } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: chainId,
  })

  const { data: contributorBounties, refetch: refetchContributorBounties } =
    useReadContract({
      address: bountyAddress,
      abi: BOUNTY_ABI,
      functionName: 'contributorBounties',
      args: [address],
      chainId: chainId,
    })

  const { data: _amount, refetch: refetchBountyAmount } = useReadContract({
    address: bountyAddress,
    abi: BOUNTY_ABI,
    functionName: 'bountyAmount',
    args: [],
    chainId: chainId,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    if (name === 'bountyAmount') {
      setBountyAmount(value)
    } else if (name === 'contributorAddr') {
      setContributorAddr(value)
    } else if (name === 'proposalId') {
      setProposalId(value)
    }
  }

  const handleClaimProposalBounty = async () => {
    try {
      const claimProposalBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'claimProposalBounty',
        args: [proposalId],
      })

      const txReceipt = await provider.waitForTransaction(claimProposalBountyTX)

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const handleClaimContributorBounty = async () => {
    try {
      const claimContributorBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'claimContributorBounty',
        args: [],
      })

      const txReceipt = await provider.waitForTransaction(
        claimContributorBountyTX
      )

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const getProposalBounty = async () => {
    try {
      const bountyInfo = await readContract(config, {
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'proposalBounties',
        args: [proposalId],
      })

      if (
        Array.isArray(bountyInfo) &&
        bountyInfo.length > 0 &&
        typeof bountyInfo[0] === 'bigint'
      ) {
        const claimable = formatEther(
          (bountyInfo[0] - bountyInfo[1] + (_amount as bigint)) as bigint
        )
        setClaimableBounty(claimable)
      }
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
      setClaimableBounty('0')
    }
  }

  const handleAddProposalBounty = async () => {
    try {
      const allowance = await readContract(config, {
        abi: PCE_ABI,
        address: pceAddress,
        functionName: 'allowance',
        args: [address, bountyAddress],
      })

      if ((BigInt(allowance as string) as bigint) <= parseEther(bountyAmount)) {
        const tx = await writeContractAsync(
          {
            abi: PCE_ABI,
            address: pceAddress,
            functionName: 'approve',
            args: [bountyAddress, parseEther(bountyAmount)],
          },
          {
            onSuccess: (data) => {},
            onError: (error) => {
              console.error('Transaction error:', error)
            },
          }
        )
        const transactionReceipt = await provider.waitForTransaction(tx)
      }
      const addProposalBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'addProposalBounty',
        args: [proposalId, parseEther(bountyAmount)],
      })

      const txReceipt = await provider.waitForTransaction(addProposalBountyTX)

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const handleAddContributorBounty = async () => {
    try {
      const allowance = await readContract(config, {
        abi: PCE_ABI,
        address: pceAddress,
        functionName: 'allowance',
        args: [address, bountyAddress],
      })

      if ((BigInt(allowance as string) as bigint) <= parseEther(bountyAmount)) {
        const tx = await writeContractAsync(
          {
            abi: PCE_ABI,
            address: pceAddress,
            functionName: 'approve',
            args: [bountyAddress, parseEther(bountyAmount)],
          },
          {
            onSuccess: (data) => {},
            onError: (error) => {
              console.error('Transaction error:', error)
            },
          }
        )
        const transactionReceipt = await provider.waitForTransaction(tx)
      }
      const addContributorBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'addContributorBounty',
        args: [contributorAddr, parseEther(bountyAmount)],
      })

      const txReceipt = await provider.waitForTransaction(
        addContributorBountyTX
      )

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      toast.success(
        <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
          Claim Success, View TX
        </Link>
      )
    } else if (isConfirming) {
      toast.info(<div className="disabled">TX is Pending, Please Wait...</div>)
    } else if (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }, [isConfirmed, isConfirming, error, hash])

  const getBountyAmount = (bountyInfo: unknown): string => {
    if (
      Array.isArray(bountyInfo) &&
      bountyInfo.length > 0 &&
      typeof bountyInfo[0] === 'bigint'
    ) {
      return formatEther(bountyInfo[0] as bigint)
    }
    return '0'
  }

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

  const getClaimableAmount = (bountyInfo: unknown): string => {
    if (
      Array.isArray(bountyInfo) &&
      bountyInfo.length > 0 &&
      typeof bountyInfo[0] === 'bigint' &&
      typeof bountyInfo[1] === 'bigint'
    ) {
      return formatEther(
        (bountyInfo[0] - bountyInfo[1] + (_amount as bigint)) as bigint
      )
    }
    return '0'
  }

  return (
    <div>
      <div>
        <div>Bounty</div>
        <div className="my-4">
          This Bounty Program is for providing bounty to the contributors
        </div>
        <div>
          Fixed Bounty Amount : {_amount ? formatEther(_amount as bigint) : '0'}
        </div>

        <div>
          Your current PCE Amount :{' '}
          {pceBalance ? formatEther(pceBalance as bigint) : '0'}
        </div>
        <div>
          Your Total Bounty Amount :{' '}
          {contributorBounties ? getBountyAmount(contributorBounties) : '0'}
        </div>
        <div>
          Your Withdrawn Amount :{' '}
          {contributorBounties ? getWithdrawnAmount(contributorBounties) : '0'}
        </div>

        <div>
          Your Claimable Amount :{' '}
          {contributorBounties ? getClaimableAmount(contributorBounties) : '0'}
        </div>

        <Input
          type="number"
          name="bountyAmount"
          placeholder="Bounty Amount"
          className="mt-5"
          onChange={handleChange}
        />

        <Input
          type="address"
          name="contributorAddr"
          placeholder="Contributor Address"
          className="mt-5"
          onChange={handleChange}
        />

        <Button
          className="mt-5"
          variant="outline"
          onClick={() => {
            if (!contributorAddr) return
            handleAddContributorBounty()
          }}
        >
          Add Contributor Bounty
        </Button>
        <Button
          className="mt-5 ml-4"
          variant="outline"
          onClick={() => {
            if (!address) return
            handleClaimContributorBounty()
          }}
        >
          Claim Contributor Bounty
        </Button>

        <Input
          type="number"
          name="proposalId"
          placeholder="Proposal Id"
          className="mt-5"
          onChange={handleChange}
        />

        <div>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => {
              if (!proposalId) return
              handleAddProposalBounty()
            }}
          >
            Add Proposal Bounty
          </Button>

          <Button
            className="mt-5 ml-4"
            variant="outline"
            onClick={() => {
              if (!proposalId) return
              handleClaimProposalBounty()
            }}
          >
            Claim Proposal Bounty
          </Button>

          <Button
            className="mt-5 ml-4"
            variant="outline"
            onClick={() => {
              if (!proposalId) return
              getProposalBounty()
            }}
          >
            Get Proposal Bounty
          </Button>
        </div>
        <div className="mt-4">
          The Claimable amount for proposal #{proposalId ? proposalId : '0'} is{' '}
          {claimableBounty ? claimableBounty : '0'}
        </div>
        <ToastContainer
          position="bottom-right"
          closeOnClick
          draggable
        ></ToastContainer>
      </div>
    </div>
  )
}