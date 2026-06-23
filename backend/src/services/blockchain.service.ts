import { ethers, Contract, Wallet, JsonRpcProvider } from 'ethers'
import { config } from '../config/index.js'
import { extractCidFromTokenUri } from '../utils/ipfs.js'
import type { Environment } from '../types/index.js'
import PeaceCoinDaoNftAbi from '../abi/PeaceCoinDaoNft.json' with { type: 'json' }

export class BlockchainService {
  private providers = new Map<Environment, JsonRpcProvider>()

  getProvider(environment: Environment): JsonRpcProvider {
    if (!this.providers.has(environment)) {
      this.providers.set(
        environment,
        new JsonRpcProvider(config.polygonRpcUrl(environment))
      )
    }
    return this.providers.get(environment)!
  }

  getSigner(environment: Environment, signerPrivateKey: string): Wallet {
    const provider = this.getProvider(environment)
    return new Wallet(signerPrivateKey, provider)
  }

  getContract(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string
  ): Contract {
    const signer = this.getSigner(environment, signerPrivateKey)
    return new Contract(sbtAddress, PeaceCoinDaoNftAbi, signer)
  }

  getReadOnlyContract(sbtAddress: string, environment: Environment): Contract {
    const provider = this.getProvider(environment)
    return new Contract(sbtAddress, PeaceCoinDaoNftAbi, provider)
  }

  async getSignerAddress(
    environment: Environment,
    signerPrivateKey: string
  ): Promise<string> {
    return this.getSigner(environment, signerPrivateKey).getAddress()
  }

  private async getPermissionContext(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string
  ): Promise<{
    contract: Contract
    signerAddress: string
    defaultAdminRole: string
    daoManagerRole: string
  }> {
    const contract = this.getReadOnlyContract(sbtAddress, environment)
    const [signerAddress, defaultAdminRole, daoManagerRole] = await Promise.all(
      [
        this.getSignerAddress(environment, signerPrivateKey),
        contract.DEFAULT_ADMIN_ROLE(),
        contract.DAO_MANAGER_ROLE(),
      ]
    )

    return {
      contract,
      signerAddress,
      defaultAdminRole,
      daoManagerRole,
    }
  }

  /**
   * batchMint uses onlyMinter on-chain (not DAO_MANAGER_ROLE).
   * Accept minter, default admin, or DAO manager role if granted on deployment.
   */
  async hasPermissionForBatchMint(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string
  ): Promise<boolean> {
    const { contract, signerAddress, defaultAdminRole, daoManagerRole } =
      await this.getPermissionContext(sbtAddress, environment, signerPrivateKey)
    const [isMinter, isDefaultAdmin, hasDaoManagerRole] = await Promise.all([
      contract.minters(signerAddress),
      contract.hasRole(defaultAdminRole, signerAddress),
      contract.hasRole(daoManagerRole, signerAddress),
    ])
    return Boolean(isMinter || isDefaultAdmin || hasDaoManagerRole)
  }

  /**
   * setTokenURI uses onlyDefaultAdmin on-chain.
   */
  async hasPermissionForSetTokenUri(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string
  ): Promise<boolean> {
    const { contract, signerAddress, defaultAdminRole, daoManagerRole } =
      await this.getPermissionContext(sbtAddress, environment, signerPrivateKey)
    const [isDefaultAdmin, hasDaoManagerRole] = await Promise.all([
      contract.hasRole(defaultAdminRole, signerAddress),
      contract.hasRole(daoManagerRole, signerAddress),
    ])
    return Boolean(isDefaultAdmin || hasDaoManagerRole)
  }

  async hasPermissionForCreateToken(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string
  ): Promise<boolean> {
    return this.hasPermissionForSetTokenUri(
      sbtAddress,
      environment,
      signerPrivateKey
    )
  }

  async createToken(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string,
    tokenUri: string,
    votingPower: string
  ): Promise<{
    transactionHash: string
    blockNumber: number
    tokenId: string
  }> {
    const contract = this.getContract(sbtAddress, environment, signerPrivateKey)
    const onChainUri = extractCidFromTokenUri(tokenUri)
    const tx = await contract.createToken(onChainUri, votingPower)
    const receipt = await tx.wait(1)
    const tokenId = (await contract.numberOfTokens()).toString()
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      tokenId,
    }
  }

  async batchMint(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string,
    to: string,
    ids: string[],
    amounts: string[]
  ): Promise<{ transactionHash: string; blockNumber: number }> {
    const contract = this.getContract(sbtAddress, environment, signerPrivateKey)
    const toAddresses = ids.map(() => to)
    const tx = await contract.batchMint(toAddresses, ids, amounts)
    const receipt = await tx.wait(1)
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    }
  }

  async setTokenURI(
    sbtAddress: string,
    environment: Environment,
    signerPrivateKey: string,
    id: string,
    tokenUri: string,
    votingPower: string
  ): Promise<{ transactionHash: string; blockNumber: number }> {
    const contract = this.getContract(sbtAddress, environment, signerPrivateKey)
    const onChainUri = extractCidFromTokenUri(tokenUri)
    const tx = await contract.setTokenURI(id, onChainUri, votingPower)
    const receipt = await tx.wait(1)
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    }
  }

  async balanceOf(
    sbtAddress: string,
    environment: Environment,
    walletAddress: string,
    tokenId: string
  ): Promise<string> {
    const contract = this.getReadOnlyContract(sbtAddress, environment)
    const balance = await contract.balanceOf(walletAddress, tokenId)
    return balance.toString()
  }
}

export const blockchainService = new BlockchainService()
