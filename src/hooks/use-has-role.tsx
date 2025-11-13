import { keccak256, toBytes } from 'viem'
import { useReadContract, useAccount } from 'wagmi'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'
import { daoStudioAddress, defaultChainId } from '~/app/constants/constants'

export function useHasDaoManagerRole() {
  const { address, chainId } = useAccount()
  const DAO_MANAGER_ROLE = keccak256(toBytes('DAO_MANAGER_ROLE'))

  const { data: hasRole, refetch: refetchHasRole } = useReadContract({
    address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_STUDIO_ABI,
    functionName: 'hasRole',
    args: [DAO_MANAGER_ROLE, address],
  }) as { data?: boolean; refetch: () => void }

  return { hasRole, refetchHasRole }
}
