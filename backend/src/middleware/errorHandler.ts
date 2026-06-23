import type { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';
import multer from 'multer';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      sendError(res, 'VALIDATION_ERROR', 'Invalid request body.', 400, 'Image file exceeds 10 MB limit.');
      return;
    }
    sendError(res, 'VALIDATION_ERROR', 'Invalid request body.', 400, err.message);
    return;
  }

  if (err.message?.includes('Invalid file type')) {
    sendError(res, 'VALIDATION_ERROR', 'Invalid request body.', 400, err.message);
    return;
  }

  console.error('Unhandled error:', err);
  sendError(res, 'VALIDATION_ERROR', 'Internal server error.', 500, err.message);
}
