import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { defaultWalletAddress } from '../config/environment'
import { WalletBalancesForm } from './WalletBalancesForm'
import * as sbtClient from '../api/sbtClient'

vi.mock('../api/sbtClient')

describe('WalletBalancesForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(sbtClient.listContracts).mockResolvedValue({
      success: true,
      status: 'SUCCESSFUL_LIST_CONTRACTS',
      message: 'ok',
      data: {
        environment: 'dev',
        assetType: 'sbt',
        items: [
          {
            daoId: 'dao-1',
            daoName: 'Test DAO',
            contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            communityTokenAddress: '0xToken',
            nftAddress: null,
            environment: 'dev',
          },
        ],
      },
    })
  })

  it('renders form fields', async () => {
    render(<WalletBalancesForm />)
    expect(screen.getByText('Get Balance')).toBeInTheDocument()
    expect(screen.getByText('Wallet Address')).toBeInTheDocument()
    expect(screen.getByText('Asset type')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('SBT contract')).toBeInTheDocument()
    })
  })

  it('displays owned balance cards sorted by token id with images', async () => {
    vi.mocked(sbtClient.getWalletBalances).mockResolvedValue({
      success: true,
      status: 'SUCCESS',
      message: 'ok',
      data: {
        walletAddress: defaultWalletAddress,
        environment: 'dev',
        assetType: 'sbt',
        contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        communityTokenAddress: '0xToken',
        dao: {
          daoId: 'dao-1',
          daoName: 'Test',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          tokenAddress: '0xToken',
          nftAddress: null,
        },
        items: [
          {
            dbId: 1,
            tokenId: '1',
            name: 'DAO Manager Badge',
            description: 'Desc',
            image: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/img1',
            votingPower: '100000000000000000000',
            isRevoked: false,
            isSBT: true,
            balance: '1',
            owned: true,
          },
        ],
      },
    })

    const user = userEvent.setup()
    render(<WalletBalancesForm />)

    await waitFor(() => {
      expect(
        screen.getByRole('combobox', { name: /SBT contract/i })
      ).toBeEnabled()
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: /SBT contract/i }),
      'dao-1'
    )
    await user.click(screen.getByRole('button', { name: /Get Balances/i }))

    await waitFor(() => {
      expect(screen.getByText('DAO Manager Badge')).toBeInTheDocument()
      expect(
        screen.getByRole('img', { name: 'DAO Manager Badge' })
      ).toHaveAttribute(
        'src',
        'https://ipfs-dao-studio.mypinata.cloud/ipfs/img1'
      )
      expect(screen.getByText('SBT')).toBeInTheDocument()
      expect(screen.getByText('Voting Power: 100 ETH')).toBeInTheDocument()
    })

    expect(sbtClient.getWalletBalances).toHaveBeenCalledWith({
      walletAddress: defaultWalletAddress,
      environment: 'dev',
      assetType: 'sbt',
      daoId: 'dao-1',
    })
  })
})
