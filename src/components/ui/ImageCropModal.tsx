'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog' // shadcn/ui
import { Button } from '~/components/ui/button'
import { getCroppedImg } from '~/lib/cropUtils' // Create this utility function

interface ImageCropModalProps {
  imageSrc: string
  onClose: () => void
  onCropComplete: (croppedImage: string) => void
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropCompleteCallback = useCallback(
    (_: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    onCropComplete(croppedImage)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Crop Image</DialogTitle>
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Adjust aspect ratio as needed
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Crop</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageCropModal
