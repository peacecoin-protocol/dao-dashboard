import { Router, type Request, type Response } from 'express'
import { ZodError } from 'zod'
import { sbtService } from '../services/sbt.service.js'
import { imageUpload } from '../middleware/upload.js'
import { sendError, sendSuccess } from '../utils/response.js'
import {
  batchMintSchema,
  createTokenFieldsSchema,
  listCommunityTokensQuerySchema,
  listContractsQuerySchema,
  listScheduledIssuancesQuerySchema,
  listTokensQuerySchema,
  scheduledIssuanceIdParamSchema,
  scheduleIssuanceSchema,
  setTokenUriSchema,
  uploadMetadataFieldsSchema,
  walletBalancesQuerySchema,
} from '../utils/validation.js'
import { parseSignerPrivateKeyFromRequest } from '../utils/signer.js'

const router = Router()

function formatZodError(error: ZodError): string {
  return error.errors.map((e) => e.message).join('; ')
}

function sendDaoFailure(res: Response, result: { reason: string }) {
  if (result.reason === 'DAO_NOT_FOUND') {
    sendError(
      res,
      'DAO_NOT_FOUND',
      'DAO was not found for the given daoId and environment.',
      404
    )
    return
  }
  if (result.reason === 'SBT_CONTRACT_NOT_FOUND') {
    sendError(
      res,
      'SBT_CONTRACT_NOT_FOUND',
      'DAO exists, but contract address is missing or invalid.',
      404
    )
  }
}

function sendSignerPrivateKeyError(
  res: Response,
  result: {
    reason: 'MISSING_SIGNER_PRIVATE_KEY' | 'INVALID_SIGNER_PRIVATE_KEY'
    error: string
  }
) {
  sendError(
    res,
    result.reason,
    'Invalid signer credentials.',
    400,
    result.error
  )
}

router.post(
  '/create-token',
  imageUpload.single('image'),
  async (req: Request, res: Response) => {
    const signerPrivateKey = parseSignerPrivateKeyFromRequest(req)
    if (!signerPrivateKey.ok) {
      sendSignerPrivateKeyError(res, signerPrivateKey)
      return
    }

    if (!req.file) {
      sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid request body.',
        400,
        'image file is required.'
      )
      return
    }

    const parsed = createTokenFieldsSchema.safeParse(req.body)
    if (!parsed.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid request body.',
        400,
        formatZodError(parsed.error)
      )
      return
    }

    const result = await sbtService.createSbt({
      signerPrivateKey: signerPrivateKey.privateKey,
      ...parsed.data,
      imageBuffer: req.file.buffer,
      imageFilename: req.file.originalname,
      imageMimeType: req.file.mimetype,
    })

    if (!result.ok) {
      if (
        result.reason === 'DAO_NOT_FOUND' ||
        result.reason === 'SBT_CONTRACT_NOT_FOUND'
      ) {
        sendDaoFailure(res, result)
        return
      }
      if (result.reason === 'NOT_DAO_MANAGER') {
        sendError(
          res,
          'NOT_DAO_MANAGER',
          'Provided signer does not have default admin role.',
          403
        )
        return
      }
      if (result.reason === 'FAILED_TO_UPLOAD_IMAGE') {
        sendError(
          res,
          'FAILED_TO_UPLOAD_IMAGE',
          'Failed to upload image.',
          500,
          result.error
        )
        return
      }
      if (result.reason === 'FAILED_TO_UPLOAD_METADATA') {
        sendError(
          res,
          'FAILED_TO_UPLOAD_METADATA',
          'Failed to upload metadata.',
          500,
          result.error
        )
        return
      }
      if (result.reason === 'FAILED_TO_SAVE_TOKEN') {
        sendError(
          res,
          'FAILED_TO_SAVE_TOKEN',
          'Token was created on-chain but failed to save in Supabase.',
          500,
          result.error,
          {
            tokenId: 'tokenId' in result ? result.tokenId : undefined,
            createTransactionHash:
              'createTransactionHash' in result
                ? result.createTransactionHash
                : undefined,
          }
        )
        return
      }
      sendError(
        res,
        'FAILED_TO_CREATE_TOKEN',
        'Failed to create token on-chain.',
        500,
        'error' in result ? result.error : undefined
      )
      return
    }

    sendSuccess(
      res,
      'SUCCESSFUL_CREATE_TOKEN',
      'SBT created on IPFS, on-chain, and saved to Supabase.',
      result.result
    )
  }
)

router.get('/contracts', async (req: Request, res: Response) => {
  const parsed = listContractsQuerySchema.safeParse(req.query)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid query parameters.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const result = await sbtService.listContracts(parsed.data)

  if (!result.ok) {
    sendError(
      res,
      'FAILED_TO_LIST_CONTRACTS',
      'Failed to list contracts.',
      500,
      result.error
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_LIST_CONTRACTS',
    'Contracts fetched successfully.',
    result.result
  )
})

router.get('/tokens', async (req: Request, res: Response) => {
  const parsed = listTokensQuerySchema.safeParse(req.query)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid query parameters.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const result = await sbtService.listTokens(parsed.data)

  if (!result.ok) {
    if (
      result.reason === 'DAO_NOT_FOUND' ||
      result.reason === 'SBT_CONTRACT_NOT_FOUND'
    ) {
      sendDaoFailure(res, result)
      return
    }
    sendError(
      res,
      'FAILED_TO_LIST_TOKENS',
      'Failed to list tokens.',
      500,
      'error' in result ? result.error : undefined
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_LIST_TOKENS',
    'Tokens fetched successfully.',
    result.result
  )
})

router.post('/batch-mint', async (req: Request, res: Response) => {
  const signerPrivateKey = parseSignerPrivateKeyFromRequest(req)
  if (!signerPrivateKey.ok) {
    sendSignerPrivateKeyError(res, signerPrivateKey)
    return
  }

  const parsed = batchMintSchema.safeParse(req.body)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid request body.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const { environment, sbtAddress, to, tokens } = parsed.data
  const result = await sbtService.batchMint({
    signerPrivateKey: signerPrivateKey.privateKey,
    environment,
    sbtAddress,
    to,
    tokens,
  })

  if (!result.ok) {
    if (result.reason === 'NOT_DAO_MANAGER') {
      sendError(
        res,
        'NOT_DAO_MANAGER',
        'Provided signer lacks required minter role.',
        403
      )
      return
    }
    sendError(
      res,
      'FAILED_TO_MINT',
      'Failed to batch mint SBT.',
      500,
      result.error
    )
    return
  }

  sendSuccess(res, 'SUCCESSFUL_MINT', 'Batch mint completed.', {
    environment,
    sbtAddress,
    to,
    tokens: result.result.tokens,
    mintTransactionHash: result.result.mintTransactionHash,
    mintBlockNumber: result.result.mintBlockNumber,
  })
})

router.post(
  '/upload-metadata',
  imageUpload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid request body.',
        400,
        'image file is required.'
      )
      return
    }

    const parsed = uploadMetadataFieldsSchema.safeParse(req.body)
    if (!parsed.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid request body.',
        400,
        formatZodError(parsed.error)
      )
      return
    }

    const { environment, assetType, name, description, votingPower } =
      parsed.data
    const result = await sbtService.uploadMetadata({
      environment,
      assetType,
      name,
      description,
      votingPower,
      imageBuffer: req.file.buffer,
      imageFilename: req.file.originalname,
      imageMimeType: req.file.mimetype,
    })

    if (!result.ok) {
      if (result.reason === 'FAILED_TO_UPLOAD_IMAGE') {
        sendError(
          res,
          'FAILED_TO_UPLOAD_IMAGE',
          'Failed to upload SBT image to Pinata.',
          500,
          result.error
        )
        return
      }
      sendError(
        res,
        'FAILED_TO_UPLOAD_METADATA',
        'Failed to upload SBT metadata to Pinata.',
        500,
        result.error
      )
      return
    }

    sendSuccess(
      res,
      'SUCCESSFUL_METADATA_UPLOAD',
      'SBT image and metadata uploaded successfully.',
      result.result
    )
  }
)

router.post('/set-token-uri', async (req: Request, res: Response) => {
  const signerPrivateKey = parseSignerPrivateKeyFromRequest(req)
  if (!signerPrivateKey.ok) {
    sendSignerPrivateKeyError(res, signerPrivateKey)
    return
  }

  const parsed = setTokenUriSchema.safeParse(req.body)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid request body.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const { environment, sbtAddress, id, tokenUri, votingPower } = parsed.data
  const result = await sbtService.setTokenUri({
    signerPrivateKey: signerPrivateKey.privateKey,
    environment,
    sbtAddress,
    id,
    tokenUri,
    votingPower,
  })

  if (!result.ok) {
    if (result.reason === 'NOT_DAO_MANAGER') {
      sendError(
        res,
        'NOT_DAO_MANAGER',
        'Provided signer does not have the required contract role.',
        403
      )
      return
    }
    sendError(
      res,
      'FAILED_TO_SET_TOKEN_URI',
      'Failed to set token URI.',
      500,
      result.error
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_SET_TOKEN_URI',
    'Token URI and voting power updated successfully.',
    {
      transactionHash: result.result.transactionHash,
      blockNumber: result.result.blockNumber,
      environment,
      sbtAddress,
      id,
      tokenUri,
      votingPower,
    }
  )
})

router.post('/scheduled-issuances', async (req: Request, res: Response) => {
  const signerPrivateKey = parseSignerPrivateKeyFromRequest(req)
  if (!signerPrivateKey.ok) {
    sendSignerPrivateKeyError(res, signerPrivateKey)
    return
  }

  const parsed = scheduleIssuanceSchema.safeParse(req.body)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid request body.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const result = await sbtService.scheduleIssuance({
    signerPrivateKey: signerPrivateKey.privateKey,
    ...parsed.data,
  })

  if (!result.ok) {
    if (result.reason === 'NOT_DAO_MANAGER') {
      sendError(
        res,
        'NOT_DAO_MANAGER',
        'Provided signer lacks required minter role.',
        403
      )
      return
    }
    sendError(
      res,
      'FAILED_TO_SCHEDULE_ISSUANCE',
      'Failed to schedule issuance.',
      500,
      result.error
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_SCHEDULE_ISSUANCE',
    'Issuance scheduled.',
    result.result,
    201
  )
})

router.get('/scheduled-issuances', async (req: Request, res: Response) => {
  const parsed = listScheduledIssuancesQuerySchema.safeParse(req.query)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid query parameters.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const result = await sbtService.listScheduledIssuances(parsed.data)

  if (!result.ok) {
    sendError(
      res,
      'FAILED_TO_LIST_SCHEDULED_ISSUANCES',
      'Failed to list scheduled issuances.',
      500,
      result.error
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_LIST_SCHEDULED_ISSUANCES',
    'Scheduled issuances fetched successfully.',
    result.result
  )
})

router.post(
  '/scheduled-issuances/:id/cancel',
  async (req: Request, res: Response) => {
    const parsed = scheduledIssuanceIdParamSchema.safeParse(req.params)
    if (!parsed.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid issuance id.',
        400,
        formatZodError(parsed.error)
      )
      return
    }

    const result = await sbtService.cancelScheduledIssuance({
      id: parsed.data.id,
    })

    if (!result.ok) {
      if (result.reason === 'SCHEDULED_ISSUANCE_NOT_FOUND') {
        sendError(
          res,
          'SCHEDULED_ISSUANCE_NOT_FOUND',
          'Scheduled issuance was not found.',
          404
        )
        return
      }
      if (result.reason === 'SCHEDULED_ISSUANCE_NOT_CANCELLABLE') {
        sendError(
          res,
          'SCHEDULED_ISSUANCE_NOT_CANCELLABLE',
          `Only pending issuances can be cancelled. Current status: ${result.status}.`,
          409
        )
        return
      }
      sendError(
        res,
        'FAILED_TO_CANCEL_SCHEDULED_ISSUANCE',
        'Failed to cancel scheduled issuance.',
        500,
        result.error
      )
      return
    }

    sendSuccess(
      res,
      'SUCCESSFUL_CANCEL_SCHEDULED_ISSUANCE',
      'Scheduled issuance cancelled.',
      result.result
    )
  }
)

router.get('/community-tokens', async (req: Request, res: Response) => {
  const parsed = listCommunityTokensQuerySchema.safeParse(req.query)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid query parameters.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const result = await sbtService.listCommunityTokens(parsed.data)

  if (!result.ok) {
    sendError(
      res,
      'FAILED_TO_LIST_COMMUNITY_TOKENS',
      'Failed to list community tokens.',
      500,
      result.error
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESSFUL_LIST_COMMUNITY_TOKENS',
    'Community tokens fetched successfully.',
    result.result
  )
})

router.get('/wallet-balances', async (req: Request, res: Response) => {
  const parsed = walletBalancesQuerySchema.safeParse(req.query)
  if (!parsed.success) {
    sendError(
      res,
      'VALIDATION_ERROR',
      'Invalid query parameters.',
      400,
      formatZodError(parsed.error)
    )
    return
  }

  const { walletAddress, environment, assetType, daoId } = parsed.data
  const result = await sbtService.getWalletBalances({
    walletAddress,
    environment,
    assetType,
    daoId,
  })

  if (!result.ok) {
    if (
      result.reason === 'DAO_NOT_FOUND' ||
      result.reason === 'SBT_CONTRACT_NOT_FOUND'
    ) {
      sendDaoFailure(res, result)
      return
    }
    sendError(
      res,
      'FAILED_TO_FETCH_BALANCE',
      'Failed to fetch wallet balances.',
      500,
      'error' in result ? result.error : undefined
    )
    return
  }

  sendSuccess(
    res,
    'SUCCESS',
    'Wallet balances fetched successfully.',
    result.result
  )
})

export default router
