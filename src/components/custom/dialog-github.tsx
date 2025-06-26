import * as React from 'react'
import { Button } from './button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

import { PIP } from '~/i18n/types'
import ReactMarkdown from 'react-markdown'

export interface DialogGithubProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean
  localDict: any
  asChild?: boolean
  pip: PIP | null
  setOpen: (open: boolean) => void
}

const DialogGithub = React.forwardRef<HTMLInputElement, DialogGithubProps>(
  (
    { className, localDict, open, asChild = false, pip, setOpen, ...props },
    ref
  ) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-[90vw] overflow-hidden">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>{pip?.title || ''}</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 overflow-y-auto overflow-x-auto max-h-[60vh]">
              <div className="flex flex-row gap-2">
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
