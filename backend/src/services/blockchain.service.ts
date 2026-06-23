import { ethers, Contract, Wallet, JsonRpcProvider } from 'ethers';
import { config } from '../config/index.js';
import { extractCidFromTokenUri } from '../utils/ipfs.js';
import type { Environment } from '../types/index.js';
import PeaceCoinDaoNftAbi from '../abi/PeaceCoinDaoNft.json' with { type: 'json' };

export class BlockchainService {
  private providers = new Map<Environment, JsonRpcProvider>();

  getProvider(environment: Environment): JsonRpcProvider {
    if (!this.providers.has(environment)) {
      this.providers.set(
        environment,
        new JsonRpcProvider(config.polygonRpcUrl(environment))
      );
    }
    return this.providers.get(environment)!;
  }

  getSigner(environment: Environment): Wallet {
    const provider = this.getProvider(environment);
    return new Wallet(config.daoManagerPrivateKey(), provider);
  }

  getContract(sbtAddress: string, environment: Environment): Contract {
    const signer = this.getSigner(environment);
    return new Contract(sbtAddress, PeaceCoinDaoNftAbi, signer);
  }

  getReadOnlyContract(sbtAddress: string, environment: Environment): Contract {
    const provider = this.getProvider(environment);
    return new Contract(sbtAddress, PeaceCoinDaoNftAbi, provider);
  }

  async getSignerAddress(environment: Environment): Promise<string> {
    return this.getSigner(environment).getAddress();
  }

  /**
   * batchMint uses onlyMinter on-chain (not DAO_MANAGER_ROLE).
   * Accept minter, default admin, or DAO manager role if granted on deployment.
   */
  async hasPermissionForBatchMint(
    sbtAddress: string,
    environment: Environment
  ): Promise<boolean> {
    const contract = this.getReadOnlyContract(sbtAddress, environment);
    const signerAddress = await this.getSignerAddress(environment);
    const [isMinter, isDefaultAdmin, hasDaoManagerRole] = await Promise.all([
      contract.minters(signerAddress),
      contract.hasRole(await contract.DEFAULT_ADMIN_ROLE(), signerAddress),
      contract.hasRole(await contract.DAO_MANAGER_ROLE(), signerAddress),
    ]);
    return Boolean(isMinter || isDefaultAdmin || hasDaoManagerRole);
  }

  /**
   * setTokenURI uses onlyDefaultAdmin on-chain.
   */
  async hasPermissionForSetTokenUri(
    sbtAddress: string,
    environment: Environment
  ): Promise<boolean> {
    const contract = this.getReadOnlyContract(sbtAddress, environment);
    const signerAddress = await this.getSignerAddress(environment);
    const [isDefaultAdmin, hasDaoManagerRole] = await Promise.all([
      contract.hasRole(await contract.DEFAULT_ADMIN_ROLE(), signerAddress),
      contract.hasRole(await contract.DAO_MANAGER_ROLE(), signerAddress),
    ]);
    return Boolean(isDefaultAdmin || hasDaoManagerRole);
  }

  async hasPermissionForCreateToken(
    sbtAddress: string,
    environment: Environment
  ): Promise<boolean> {
    return this.hasPermissionForSetTokenUri(sbtAddress, environment);
  }

  async createToken(
    sbtAddress: string,
    environment: Environment,
    tokenUri: string,
    votingPower: string
  ): Promise<{ transactionHash: string; blockNumber: number; tokenId: string }> {
    const contract = this.getContract(sbtAddress, environment);
    const onChainUri = extractCidFromTokenUri(tokenUri);
    const tx = await contract.createToken(onChainUri, votingPower);
    const receipt = await tx.wait(1);
    const tokenId = (await contract.numberOfTokens()).toString();
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      tokenId,
    };
  }

  async batchMint(
    sbtAddress: string,
    environment: Environment,
    to: string,
    ids: string[],
    amounts: string[]
  ): Promise<{ transactionHash: string; blockNumber: number }> {
    const contract = this.getContract(sbtAddress, environment);
    const toAddresses = ids.map(() => to);
    const tx = await contract.batchMint(toAddresses, ids, amounts);
    const receipt = await tx.wait(1);
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    };
  }

  async setTokenURI(
    sbtAddress: string,
    environment: Environment,
    id: string,
    tokenUri: string,
    votingPower: string
  ): Promise<{ transactionHash: string; blockNumber: number }> {
    const contract = this.getContract(sbtAddress, environment);
    const onChainUri = extractCidFromTokenUri(tokenUri);
    const tx = await contract.setTokenURI(id, onChainUri, votingPower);
    const receipt = await tx.wait(1);
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    };
  }

  async balanceOf(
    sbtAddress: string,
    environment: Environment,
    walletAddress: string,
    tokenId: string
  ): Promise<string> {
    const contract = this.getReadOnlyContract(sbtAddress, environment);
    const balance = await contract.balanceOf(walletAddress, tokenId);
    return balance.toString();
  }
}

export const blockchainService = new BlockchainService();
