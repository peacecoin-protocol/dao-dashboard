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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
