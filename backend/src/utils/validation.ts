import { z } from 'zod'
import { ethers } from 'ethers'

const environmentSchema = z.enum(['dev', 'stg', 'production'])
const assetTypeSchema = z.enum(['sbt', 'nft'], {
  errorMap: () => ({ message: 'assetType must be sbt or nft' }),
})

const addressSchema = z
  .string()
  .refine((val) => ethers.isAddress(val), {
    message: 'Invalid Ethereum address',
  })
  .transform((val) => ethers.getAddress(val))

const uintStringSchema = z
  .string()
  .regex(/^\d+$/, 'Must be a non-negative integer string')

export const batchMintTokenSchema = z.object({
  id: uintStringSchema,
  amount: uintStringSchema,
})

export const batchMintSchema = z.object({
  environment: environmentSchema,
  sbtAddress: addressSchema,
  to: addressSchema,
  tokens: z
    .array(batchMintTokenSchema)
    .min(1, 'At least one token is required'),
})

export const createTokenFieldsSchema = z.object({
  environment: environmentSchema,
  assetType: assetTypeSchema,
  daoId: z.string().min(1, 'daoId is required'),
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'description is required'),
  votingPower: uintStringSchema,
})

export const listContractsQuerySchema = z.object({
  environment: environmentSchema,
  assetType: assetTypeSchema,
})

export const listTokensQuerySchema = z.object({
  environment: environmentSchema,
  assetType: assetTypeSchema,
  daoId: z.string().min(1, 'daoId is required'),
})

export const setTokenUriSchema = z.object({
  environment: environmentSchema,
  sbtAddress: addressSchema,
  id: uintStringSchema,
  tokenUri: z.string().url('tokenUri must be a valid URL'),
  votingPower: uintStringSchema,
})

export const listCommunityTokensQuerySchema = z.object({
  environment: environmentSchema,
})

export const walletBalancesQuerySchema = z.object({
  walletAddress: addressSchema,
  environment: environmentSchema,
  assetType: assetTypeSchema,
  daoId: z.string().min(1, 'daoId is required'),
})

export const scheduleIssuanceSchema = z.object({
  environment: environmentSchema,
  sbtAddress: addressSchema,
  to: addressSchema,
  tokens: z
    .array(batchMintTokenSchema)
    .min(1, 'At least one token is required'),
  executeAt: z
    .string()
    .datetime({
      offset: true,
      message: 'executeAt must be an ISO 8601 datetime',
    })
    .refine((val) => new Date(val).getTime() > Date.now(), {
      message: 'executeAt must be in the future',
    }),
})

export const listScheduledIssuancesQuerySchema = z.object({
  environment: environmentSchema,
  status: z
    .enum(['pending', 'processing', 'completed', 'failed', 'cancelled'])
    .optional(),
})

export const scheduledIssuanceIdParamSchema = z.object({
  id: z.coerce.number().int().positive('id must be a positive integer'),
})

export const uploadMetadataFieldsSchema = z.object({
  environment: environmentSchema,
  assetType: assetTypeSchema,
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'description is required'),
  votingPower: uintStringSchema,
})
