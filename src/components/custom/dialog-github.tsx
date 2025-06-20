import * as React from 'react'
import { Button } from './button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

import { type VariantProps, cva } from 'class-variance-authority'
import { PIP } from '~/i18n/types'
import ReactMarkdown from 'react-markdown'

const dialogInputVariants = cva(
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

export interface DialogGithubProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dialogInputVariants> {
  open: boolean
  localDict: any
  asChild?: boolean
  pip: PIP | null
  setOpen: (open: boolean) => void
}

const DialogGithub = React.forwardRef<HTMLInputElement, DialogGithubProps>(
  (
    {
      className,
      variant,
      size,
      localDict,
      open,
      asChild = false,
      pip,
      setOpen,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-[90vw] overflow-hidden">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>{pip?.title || ''}</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 overflow-y-auto overflow-x-auto max-h-[60vh]">
              <div className="flex flex-row gap-2">
                {/* <Image
                  src={pip?.proposer || ''}
                  alt={pip?.proposer || ''}
                  width={48}
                  height={48}
                /> */}
                <div className="flex flex-col gap-1">
                  <p>{pip?.proposer || ''}</p>
                  <p>{pip?.created || ''}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <ReactMarkdown>{pip?.content || ''}</ReactMarkdown>
              </div>
            </DialogDescription>

            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
DialogGithub.displayName = 'DialogGithub'

export { DialogGithub }
