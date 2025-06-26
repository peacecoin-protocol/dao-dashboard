import * as React from 'react'

import Image from 'next/image'
import { Dialog, DialogContent } from '~/components/ui/dialog'

export interface NFT_DETAIL_Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
  imageName: string
  metadata: string
  tokenId: number
  description: string
}

const NFT_DETAIL = React.forwardRef<HTMLInputElement, NFT_DETAIL_Props>(
  (
    {
      imageSrc,
      imageName,
      metadata,
      isOpen,
      onOpenChange,
      tokenId,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[1500px]">
          <div className="flex flex-row gap-4">
            <Image
              src={imageSrc}
              alt={imageName}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold mb-4">{imageName}</div>
              <div className="text-lg text-muted-foreground mb-6">
                {description}
              </div>
              <div className="text-lg font-semibold mb-2">
                Token ID: {tokenId}
              </div>
              {metadata && (
                <>
                  <div className="text-lg font-semibold mb-2">Metadata:</div>
                  <p className="bg-muted p-4 rounded-lg overflow-auto max-h-[200px] text-sm whitespace-pre-wrap">
                    Name: {JSON.stringify(JSON.parse(metadata).name, null, 2)}
                    <br />
                    Description:{' '}
                    {JSON.stringify(JSON.parse(metadata).description, null, 2)}
                    <br />
                    Image: {JSON.stringify(JSON.parse(metadata).image, null, 2)}
                    <br />
                  </p>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)
NFT_DETAIL.displayName = 'NFT_DETAIL'

export { NFT_DETAIL }
