import * as React from 'react'
import { Button } from '~/components/ui/button'
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
        <DialogTrigger asChild>
          <Button className={className}>Delegate</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delegate</DialogTitle>
            <DialogDescription>
              Enter the address to delegate your voting power
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              placeholder="Enter address"
              name="delegateAddr"
              onChange={(e) => setDelegateAddr(e.target.value)}
            />
            <div>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleDelegate()
                  }}
                >
                  Delegate
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)
DelegateInput.displayName = 'DelegateInput'

export { DelegateInput }
