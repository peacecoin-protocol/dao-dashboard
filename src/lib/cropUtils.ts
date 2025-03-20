import { createImage } from './imageUtils' // Helper function to create an image from a URL

export async function getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: any
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas context is not available')

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(URL.createObjectURL(blob))
    }, 'image/png')
  })
}
