import { useEffect } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { defaultChainId } from '~/app/constants/constants'

export function useEnsureSupportedChain(targetChainId = defaultChainId) {
  const { chainId } = useAccount()
  const { chains, switchChain } = useSwitchChain()

  useEffect(() => {
    if (chains.length === 0) return

    const hasSupportedChain = chainId
      ? chains.some((chain) => chain.id === chainId)
      : false

    if (!hasSupportedChain) {
      switchChain({ chainId: targetChainId })
    }
  }, [chainId, chains, switchChain, targetChainId])
}
