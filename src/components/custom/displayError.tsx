import { toast } from 'sonner'

export function displayError(error: Error) {
  toast.error(error.message)
}
