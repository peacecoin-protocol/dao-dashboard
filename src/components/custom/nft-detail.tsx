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
        <DialogContent className="w-[90vw] max-w-[600px] h-auto mx-auto p-3 sm:p-4 lg:p-6 flex flex-col">
          <section className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            {/* Image Section */}
            <figure className="flex justify-center">
              <section className="relative w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[250px] h-[120px] sm:h-[150px] lg:h-[180px]">
                <Image
                  src={imageSrc}
                  alt={imageName}
                  fill
                  className="rounded-lg object-contain"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 250px"
                />
              </section>
            </figure>

            {/* Content Section - Below the image */}
            <article className="flex-1">
              <header className="space-y-2 sm:space-y-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold break-words leading-tight">
                  {imageName}
                </h2>

                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>

                <p className="text-xs sm:text-sm lg:text-base font-semibold">
                  Token ID: {tokenId}
                </p>
              </header>

              {/* Metadata Section */}
              {metadata && (
                <section className="space-y-2 mt-3 sm:mt-4">
                  <h3 className="text-xs sm:text-sm lg:text-base font-semibold">
                    Metadata:
                  </h3>
                  <section className="bg-muted p-2 sm:p-3 rounded-lg text-xs sm:text-sm whitespace-pre-wrap">
                    <article className="space-y-2">
                      <p className="break-words">
                        <span className="font-medium">Name:</span>{' '}
                        {JSON.stringify(JSON.parse(metadata).name, null, 2)}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Description:</span>{' '}
                        {JSON.stringify(
                          JSON.parse(metadata).description,
                          null,
                          2
                        )}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Image:</span>{' '}
                        {JSON.stringify(JSON.parse(metadata).image, null, 2)}
                      </p>
                    </article>
                  </section>
                </section>
              )}
            </article>
          </section>
        </DialogContent>
      </Dialog>
    )
  }
)
NFT_DETAIL.displayName = 'NFT_DETAIL'

export { NFT_DETAIL }
