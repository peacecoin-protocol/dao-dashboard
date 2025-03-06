import * as React from 'react'
import { Button } from './button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { cn } from '~/components/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const delegateInputVariants = cva(
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

export interface DelegateInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof delegateInputVariants> {
  setDelegateAddr: (amount: string) => void
  handleDelegate: () => void
  asChild?: boolean
}

const DelegateInput = React.forwardRef<HTMLInputElement, DelegateInputProps>(
  (
    {
      setDelegateAddr,
      handleDelegate,
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog>
        <DialogTrigger
          className={cn(delegateInputVariants({ variant, size, className }))}
        >
          Delegate
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delegate</DialogTitle>
            <DialogDescription className="flex flex-col gap-4">
              <Input
                placeholder="Enter address"
                name="delegateAddr"
                onChange={(e) => setDelegateAddr(e.target.value)}
              />
              <div>
                <DialogClose>
                  <Button
                    onClick={() => {
                      handleDelegate()
                    }}
                  >
                    Delegate
                  </Button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
)
DelegateInput.displayName = 'DelegateInput'

export { DelegateInput }
