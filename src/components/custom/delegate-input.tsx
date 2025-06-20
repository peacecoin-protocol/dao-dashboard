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

export interface DelegateInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setDelegateAddr: (amount: string) => void
  handleDelegate: () => void
  asChild?: boolean
}

const DelegateInput = React.forwardRef<HTMLInputElement, DelegateInputProps>(
  (
    { setDelegateAddr, handleDelegate, className, asChild = false, ...props },
    ref
  ) => {
    return (
      <Dialog>
        <DialogTrigger
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
            className
          )}
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
