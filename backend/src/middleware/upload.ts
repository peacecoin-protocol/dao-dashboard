import multer from 'multer'
import { config } from '../config/index.js'

const storage = multer.memoryStorage()

export const imageUpload = multer({
  storage,
  limits: { fileSize: config.maxImageSizeBytes },
  fileFilter: (_req, file, cb) => {
    if (config.allowedImageMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          `Invalid file type. Allowed: ${config.allowedImageMimeTypes.join(', ')}`
        )
      )
    }
  },
})
