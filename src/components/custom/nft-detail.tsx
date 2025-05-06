import * as React from 'react'

import Image from 'next/image'
import { Dialog, DialogContent } from '~/components/ui/dialog'

import { type VariantProps, cva } from 'class-variance-authority'

const amountInputVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface NFT_DETAIL_Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof amountInputVariants> {
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
