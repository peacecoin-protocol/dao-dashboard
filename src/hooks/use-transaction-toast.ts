import { useEffect } from 'react'
import { type BaseError } from 'wagmi'
import { useToast } from '~/hooks/use-toast'

type TransactionError = BaseError | Error | null | undefined

interface UseTransactionToastOptions {
  error?: TransactionError
  isConfirmed?: boolean
  isConfirming?: boolean
  pendingMessage?: string
  successMessage?: string
}

export function useTransactionToast({
  error,
  isConfirmed = false,
  isConfirming = false,
  pendingMessage = 'Transaction Pending, Please Wait...',
  successMessage = 'Transaction Succeeded!',
}: UseTransactionToastOptions) {
  const { toast } = useToast()

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: successMessage })
      return
    }

    if (isConfirming) {
      toast({ title: pendingMessage })
      return
    }

    if (error) {
      toast({
        title:
          'shortMessage' in error && typeof error.shortMessage === 'string'
            ? error.shortMessage
            : error.message,
      })
    }
  }, [error, isConfirmed, isConfirming, pendingMessage, successMessage, toast])
}
