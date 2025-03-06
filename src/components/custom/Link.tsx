import { FC } from 'react'
import { useSwitchChain } from 'wagmi'

interface LinkProps {
  chainId: number | undefined
  type: 'txHash' | 'address'
  hash?: string | undefined
  address?: string | undefined
  message?: string | undefined
}

const Link: FC<LinkProps> = ({ chainId, type, hash, address, message }) => {
  const { chains } = useSwitchChain()

  // Find the explorer URL for the given chainId
  const getExplorerUrl = () => {
    const chain = chains.find((c) => c.id == chainId)
    return chain?.blockExplorers?.default?.url || 'https://sepolia.etherscan.io'
  }

  // Generate the transaction URL
  const transactionUrl = `${getExplorerUrl()}/${
    type === 'txHash' ? 'tx/' : 'address/'
  }${type === 'txHash' ? hash : address}`
  return (
    <a
      href={transactionUrl}
      target="_blank"
      className="text-blue-500 hover:text-blue-700 underline"
    >
      {message ? message : ''}
    </a>
  )
}

export default Link
