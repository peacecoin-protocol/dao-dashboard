import { ethers } from 'ethers'
import { blockchainService } from './blockchain.service.js'
import {
  addFilesToGroupPublic,
  buildIpfsUrl,
  buildMetadata,
  bufferToFile,
  createMetadataFile,
  getImageGroupId,
  getJsonGroupId,
} from '../lib/pinataAPI.js'
import { errorMessage } from '../utils/errors.js'
import { normalizeSignerPrivateKey } from '../utils/signer.js'
import { supabaseService } from './supabase.service.js'
import type {
  AssetType,
  BatchMintTokenInput,
  DaoRecord,
  Environment,
  MintableTokenItem,
  ScheduledIssuanceStatus,
  ScheduledIssuanceWorkerRecord,
  TokenRecord,
  WalletBalanceItem,
} from '../types/index.js'

type ResolvedDao =
  | { ok: true; dao: DaoRecord }
  | { ok: false; reason: 'DAO_NOT_FOUND' }

type ResolvedDaoAsset =
  | { ok: true; dao: DaoRecord; contractAddress: string }
  | { ok: false; reason: 'DAO_NOT_FOUND' | 'SBT_CONTRACT_NOT_FOUND' }

function toTokenFields(token: TokenRecord): MintableTokenItem {
  return {
    dbId: token.id,
    tokenId: token.tokenId,
    name: token.name,
    description: token.description,
    image: token.image,
    votingPower: token.votingPower,
    isRevoked: token.isRevoked ?? false,
  }
}

export class SbtService {
  private async resolveDao(
    environment: Environment,
    daoId: string
  ): Promise<ResolvedDao> {
    const dao = await supabaseService.findDaoById(daoId, environment)
    if (!dao) {
      return { ok: false, reason: 'DAO_NOT_FOUND' }
    }
    return { ok: true, dao }
  }

  private contractAddressForAsset(
    dao: DaoRecord,
    assetType: AssetType
  ): string | null {
    const address = assetType === 'nft' ? dao.nftAddress : dao.sbtAddress
    if (!address || !ethers.isAddress(address)) {
      return null
    }
    return address
  }

  private async resolveDaoAsset(
    environment: Environment,
    daoId: string,
    assetType: AssetType
  ): Promise<ResolvedDaoAsset> {
    const resolved = await this.resolveDao(environment, daoId)
    if (!resolved.ok) {
      return resolved
    }

    const contractAddress = this.contractAddressForAsset(
      resolved.dao,
      assetType
    )
    if (!contractAddress) {
      return { ok: false, reason: 'SBT_CONTRACT_NOT_FOUND' }
    }

    return { ok: true, dao: resolved.dao, contractAddress }
  }

  private resolveStoredSignerPrivateKey(
    issuance: ScheduledIssuanceWorkerRecord
  ):
    | { ok: true; signerPrivateKey: string }
    | {
        ok: false
        reason: 'INVALID_STORED_SIGNER_PRIVATE_KEY'
        error: string
      } {
    const signerPrivateKey = normalizeSignerPrivateKey(
      issuance.signerPrivateKey ?? ''
    )
    if (!signerPrivateKey) {
      return {
        ok: false,
        reason: 'INVALID_STORED_SIGNER_PRIVATE_KEY',
        error: 'Stored signer private key is invalid.',
      }
    }

    return {
      ok: true,
      signerPrivateKey,
    }
  }

  async listContracts(params: {
    environment: Environment
    assetType: AssetType
  }) {
    try {
      const items = await supabaseService.listContractOptions(
        params.environment,
        params.assetType
      )
      return {
        ok: true as const,
        result: {
          environment: params.environment,
          assetType: params.assetType,
          items,
        },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_LIST_CONTRACTS' as const,
        error: errorMessage(err),
      }
    }
  }

  async createSbt(params: {
    signerPrivateKey: string
    environment: Environment
    assetType: AssetType
    daoId: string
    name: string
    description: string
    votingPower: string
    imageBuffer: Buffer
    imageFilename: string
    imageMimeType: string
  }) {
    try {
      const resolved = await this.resolveDaoAsset(
        params.environment,
        params.daoId,
        params.assetType
      )

      if (!resolved.ok) {
        return resolved
      }

      const { dao, contractAddress } = resolved

      const hasRole = await blockchainService.hasPermissionForCreateToken(
        contractAddress,
        params.environment,
        params.signerPrivateKey
      )
      if (!hasRole) {
        return { ok: false as const, reason: 'NOT_DAO_MANAGER' as const }
      }

      const upload = await this.uploadMetadata({
        environment: params.environment,
        assetType: params.assetType,
        name: params.name,
        description: params.description,
        votingPower: params.votingPower,
        imageBuffer: params.imageBuffer,
        imageFilename: params.imageFilename,
        imageMimeType: params.imageMimeType,
      })

      if (!upload.ok) {
        return upload
      }

      let createResult
      try {
        createResult = await blockchainService.createToken(
          contractAddress,
          params.environment,
          params.signerPrivateKey,
          upload.result.tokenUri,
          params.votingPower
        )
      } catch (err) {
        return {
          ok: false as const,
          reason: 'FAILED_TO_CREATE_TOKEN' as const,
          error: errorMessage(err),
        }
      }

      try {
        const creator = await blockchainService.getSignerAddress(
          params.environment,
          params.signerPrivateKey
        )
        const dbToken = await supabaseService.insertToken({
          daoId: dao.daoId,
          tokenId: createResult.tokenId,
          name: params.name,
          description: params.description,
          image: upload.result.imageCid,
          votingPower: params.votingPower,
          isSBT: params.assetType === 'sbt',
          environment: params.environment,
          address: contractAddress,
          creator,
        })

        return {
          ok: true as const,
          result: {
            environment: params.environment,
            assetType: params.assetType,
            daoId: dao.daoId,
            daoName: dao.daoName,
            sbtAddress: contractAddress,
            tokenId: createResult.tokenId,
            name: params.name,
            description: params.description,
            votingPower: params.votingPower,
            imageCid: upload.result.imageCid,
            metadataCid: upload.result.metadataCid,
            tokenUri: upload.result.tokenUri,
            createTransactionHash: createResult.transactionHash,
            createBlockNumber: createResult.blockNumber,
            dbTokenId: dbToken.id,
          },
        }
      } catch (err) {
        return {
          ok: false as const,
          reason: 'FAILED_TO_SAVE_TOKEN' as const,
          error: errorMessage(err),
          tokenId: createResult.tokenId,
          createTransactionHash: createResult.transactionHash,
        }
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_CREATE_TOKEN' as const,
        error: errorMessage(err),
      }
    }
  }

  async listTokens(params: {
    environment: Environment
    assetType: AssetType
    daoId: string
  }) {
    try {
      const resolved = await this.resolveDaoAsset(
        params.environment,
        params.daoId,
        params.assetType
      )

      if (!resolved.ok) {
        return resolved
      }

      const { dao, contractAddress } = resolved

      const tokens = await supabaseService.findActiveTokens(
        dao.daoId,
        params.environment,
        params.assetType === 'sbt'
      )

      const items = tokens.map(toTokenFields)

      return {
        ok: true as const,
        result: {
          environment: params.environment,
          assetType: params.assetType,
          dao: {
            daoId: dao.daoId,
            daoName: dao.daoName,
            sbtAddress: contractAddress,
            tokenAddress: dao.tokenAddress,
            nftAddress: dao.nftAddress,
          },
          items,
        },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_LIST_TOKENS' as const,
        error: errorMessage(err),
      }
    }
  }

  async batchMint(params: {
    signerPrivateKey: string
    environment: Environment
    sbtAddress: string
    to: string
    tokens: BatchMintTokenInput[]
  }) {
    const canMint = await blockchainService.hasPermissionForBatchMint(
      params.sbtAddress,
      params.environment,
      params.signerPrivateKey
    )
    if (!canMint) {
      return { ok: false as const, reason: 'NOT_DAO_MANAGER' as const }
    }

    try {
      const mint = await blockchainService.batchMint(
        params.sbtAddress,
        params.environment,
        params.signerPrivateKey,
        params.to,
        params.tokens.map((token) => token.id),
        params.tokens.map((token) => token.amount)
      )

      return {
        ok: true as const,
        result: {
          environment: params.environment,
          sbtAddress: params.sbtAddress,
          to: params.to,
          tokens: params.tokens,
          mintTransactionHash: mint.transactionHash,
          mintBlockNumber: mint.blockNumber,
        },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_MINT' as const,
        error: errorMessage(err),
      }
    }
  }

  async scheduleIssuance(params: {
    signerPrivateKey: string
    environment: Environment
    sbtAddress: string
    to: string
    tokens: BatchMintTokenInput[]
    executeAt: string
  }) {
    const canMint = await blockchainService.hasPermissionForBatchMint(
      params.sbtAddress,
      params.environment,
      params.signerPrivateKey
    )
    if (!canMint) {
      return { ok: false as const, reason: 'NOT_DAO_MANAGER' as const }
    }

    try {
      const record = await supabaseService.insertScheduledIssuance({
        environment: params.environment,
        sbtAddress: params.sbtAddress,
        to: params.to,
        tokens: params.tokens,
        executeAt: params.executeAt,
        signerPrivateKey: params.signerPrivateKey,
      })
      return { ok: true as const, result: record }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_SCHEDULE_ISSUANCE' as const,
        error: errorMessage(err),
      }
    }
  }

  async listScheduledIssuances(params: {
    environment: Environment
    status?: ScheduledIssuanceStatus
  }) {
    try {
      const items = await supabaseService.listScheduledIssuances(
        params.environment,
        params.status
      )
      return {
        ok: true as const,
        result: { environment: params.environment, items },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_LIST_SCHEDULED_ISSUANCES' as const,
        error: errorMessage(err),
      }
    }
  }

  async cancelScheduledIssuance(params: { id: number }) {
    try {
      const cancelled = await supabaseService.cancelScheduledIssuance(params.id)
      if (cancelled) {
        return { ok: true as const, result: cancelled }
      }

      const existing = await supabaseService.findScheduledIssuanceById(
        params.id
      )
      if (!existing) {
        return {
          ok: false as const,
          reason: 'SCHEDULED_ISSUANCE_NOT_FOUND' as const,
        }
      }
      return {
        ok: false as const,
        reason: 'SCHEDULED_ISSUANCE_NOT_CANCELLABLE' as const,
        status: existing.status,
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_CANCEL_SCHEDULED_ISSUANCE' as const,
        error: errorMessage(err),
      }
    }
  }

  /**
   * Executed by the scheduler worker: claim each due issuance, run the
   * existing batch-mint flow, and record the outcome. Failures are terminal
   * (status = failed) and surfaced via lastError for manual retry.
   */
  async processDueIssuances(): Promise<{ processed: number; failed: number }> {
    const due = await supabaseService.findDueScheduledIssuances()
    let processed = 0
    let failed = 0

    for (const issuance of due) {
      const claimed = await supabaseService.claimScheduledIssuance(issuance.id)
      if (!claimed) {
        continue
      }

      const scheduledSigner = this.resolveStoredSignerPrivateKey(claimed)
      if (!scheduledSigner.ok) {
        await supabaseService.markScheduledIssuanceFailed(
          claimed.id,
          claimed.attempts,
          scheduledSigner.error
        )
        failed += 1
        continue
      }

      const result = await this.batchMint({
        signerPrivateKey: scheduledSigner.signerPrivateKey,
        environment: claimed.environment,
        sbtAddress: claimed.sbtAddress,
        to: claimed.to,
        tokens: claimed.tokens,
      })

      if (result.ok) {
        await supabaseService.markScheduledIssuanceCompleted(claimed.id, {
          mintTransactionHash: result.result.mintTransactionHash,
          mintBlockNumber: result.result.mintBlockNumber,
        })
        processed += 1
      } else {
        const reasonText =
          'error' in result && result.error ? result.error : result.reason
        await supabaseService.markScheduledIssuanceFailed(
          claimed.id,
          claimed.attempts,
          reasonText
        )
        failed += 1
      }
    }

    return { processed, failed }
  }

  async uploadMetadata(params: {
    environment: Environment
    assetType: AssetType
    name: string
    description: string
    votingPower: string
    imageBuffer: Buffer
    imageFilename: string
    imageMimeType: string
  }) {
    const imageGroupId = getImageGroupId(params.environment, params.assetType)
    const jsonGroupId = getJsonGroupId(params.environment)

    let imageCid: string
    try {
      const file = bufferToFile(
        params.imageBuffer,
        params.imageFilename,
        params.imageMimeType
      )
      const uploadResult = await addFilesToGroupPublic(file, imageGroupId)
      if (!uploadResult?.cid) {
        return {
          ok: false as const,
          reason: 'FAILED_TO_UPLOAD_IMAGE' as const,
          error: 'Pinata did not return an image CID.',
        }
      }
      imageCid = uploadResult.cid
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_UPLOAD_IMAGE' as const,
        error: errorMessage(err),
      }
    }

    const imageUrl = buildIpfsUrl(imageCid)
    const metadata = buildMetadata(
      params.name,
      params.description,
      params.votingPower,
      imageUrl
    )

    let metadataCid: string
    try {
      const jsonFile = createMetadataFile(metadata, imageCid)
      const jsonUploadResult = await addFilesToGroupPublic(
        jsonFile,
        jsonGroupId
      )
      if (!jsonUploadResult?.cid) {
        return {
          ok: false as const,
          reason: 'FAILED_TO_UPLOAD_METADATA' as const,
          error: 'Pinata did not return a metadata CID.',
        }
      }
      metadataCid = jsonUploadResult.cid
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_UPLOAD_METADATA' as const,
        error: errorMessage(err),
      }
    }

    const tokenUri = buildIpfsUrl(metadataCid)

    return {
      ok: true as const,
      result: {
        environment: params.environment,
        assetType: params.assetType,
        imageGroupId,
        jsonGroupId,
        imageCid,
        imageUrl,
        metadataCid,
        tokenUri,
        metadata,
      },
    }
  }

  async setTokenUri(params: {
    signerPrivateKey: string
    environment: Environment
    sbtAddress: string
    id: string
    tokenUri: string
    votingPower: string
  }) {
    const hasRole = await blockchainService.hasPermissionForSetTokenUri(
      params.sbtAddress,
      params.environment,
      params.signerPrivateKey
    )
    if (!hasRole) {
      return { ok: false as const, reason: 'NOT_DAO_MANAGER' as const }
    }

    return this.applyTokenUri(params)
  }

  private async applyTokenUri(params: {
    signerPrivateKey: string
    environment: Environment
    sbtAddress: string
    id: string
    tokenUri: string
    votingPower: string
  }) {
    try {
      const result = await blockchainService.setTokenURI(
        params.sbtAddress,
        params.environment,
        params.signerPrivateKey,
        params.id,
        params.tokenUri,
        params.votingPower
      )
      return { ok: true as const, result }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_SET_TOKEN_URI' as const,
        error: errorMessage(err),
      }
    }
  }

  async listCommunityTokens(params: { environment: Environment }) {
    try {
      const items = await supabaseService.listCommunityTokensWithCreations(
        params.environment
      )
      return {
        ok: true as const,
        result: {
          environment: params.environment,
          items,
        },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_LIST_COMMUNITY_TOKENS' as const,
        error: errorMessage(err),
      }
    }
  }

  async getWalletBalances(params: {
    walletAddress: string
    environment: Environment
    assetType: AssetType
    daoId: string
  }) {
    try {
      const resolved = await this.resolveDaoAsset(
        params.environment,
        params.daoId,
        params.assetType
      )

      if (!resolved.ok) {
        return resolved
      }

      const { dao, contractAddress } = resolved

      const tokens = await supabaseService.findActiveTokens(
        dao.daoId,
        params.environment,
        params.assetType === 'sbt'
      )

      const items: WalletBalanceItem[] = (
        await Promise.all(
          tokens.map(async (token) => {
            const balance = await blockchainService.balanceOf(
              contractAddress,
              params.environment,
              params.walletAddress,
              token.tokenId
            )
            const balanceNum = BigInt(balance)
            return {
              ...toTokenFields(token),
              isSBT: token.isSBT,
              balance,
              owned: balanceNum > 0n,
            }
          })
        )
      ).filter((item): item is WalletBalanceItem => item.owned)

      return {
        ok: true as const,
        result: {
          walletAddress: params.walletAddress,
          environment: params.environment,
          assetType: params.assetType,
          contractAddress,
          communityTokenAddress: dao.tokenAddress,
          dao: {
            daoId: dao.daoId,
            daoName: dao.daoName,
            sbtAddress: dao.sbtAddress,
            tokenAddress: dao.tokenAddress,
            nftAddress: dao.nftAddress,
          },
          items,
        },
      }
    } catch (err) {
      return {
        ok: false as const,
        reason: 'FAILED_TO_FETCH_BALANCE' as const,
        error: errorMessage(err),
      }
    }
  }
}

export const sbtService = new SbtService()
