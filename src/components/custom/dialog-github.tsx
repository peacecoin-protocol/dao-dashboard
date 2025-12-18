import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

import { PIP } from '~/i18n/types'
import ReactMarkdown from 'react-markdown'

export interface DialogGithubProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    const [isExpanded, setIsExpanded] = React.useState(false)
    const MAX_LENGTH = 500 // Character limit before truncation

    const content = pip?.content || ''
    const isLongText = content.length > MAX_LENGTH
    const displayContent =
      isLongText && !isExpanded
        ? content.substring(0, MAX_LENGTH) + '...'
        : content

    // Reset expanded state when dialog opens/closes or pip changes
    React.useEffect(() => {
      setIsExpanded(false)
    }, [open, pip?.number])

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-[60vw] overflow-hidden flex flex-col">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>{pip?.title || ''}</DialogTitle>
            <DialogDescription>Proposal details and content</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4 flex-1 overflow-hidden">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1">
                <p>{pip?.proposer || ''}</p>
                <p>{pip?.created || ''}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-auto pr-2">
              <ReactMarkdown>{displayContent}</ReactMarkdown>
            </div>
            {isLongText && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {isExpanded ? '... less' : '... more'}
              </button>
            )}
          </div>
          <div className="mt-4">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)
DialogGithub.displayName = 'DialogGithub'

export { DialogGithub }
