import type { Response } from 'express'
import type { ApiResponse, ApiStatus } from '../types/index.js'

export function sendSuccess<T>(
  res: Response,
  status: ApiStatus,
  message: string,
  data: T,
  httpStatus = 200
): void {
  const body: ApiResponse<T> = { success: true, status, message, data }
  res.status(httpStatus).json(body)
}

export function sendError(
  res: Response,
  status: ApiStatus,
  message: string,
  httpStatus = 400,
  error?: string,
  data?: unknown
): void {
  const body: ApiResponse = { success: false, status, message }
  if (error) body.error = error
  if (data !== undefined) body.data = data
  res.status(httpStatus).json(body)
}
