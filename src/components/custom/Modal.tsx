import { FC } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
