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
import { usePathname } from 'next/navigation'
import { Dictionary, Locale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

export interface DelegateInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setDelegateAddr: (amount: string) => void
  handleDelegate: () => void
  asChild?: boolean
  dict?: Dictionary
}

const DelegateInput = React.forwardRef<HTMLInputElement, DelegateInputProps>(
  (
    {
      setDelegateAddr,
      handleDelegate,
      className,
      asChild = false,
      dict: dictProp,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()
    const [dict, setDict] = React.useState<Dictionary | null>(dictProp || null)

    React.useEffect(() => {
      if (!dictProp) {
        const fetchDict = async () => {
          try {
            const locale = (pathname?.split('/')[1] || 'en') as Locale
            const fetchedDict = await getDict(locale)
            setDict(fetchedDict)
          } catch (error) {
            console.error('Error fetching dictionary:', error)
          }
        }
        fetchDict()
      }
    }, [dictProp, pathname])

    const delegateLabels = dict?.delegate ?? {}
    const delegateLabel = delegateLabels.delegate ?? 'Delegate'
    const dialogDescription =
      delegateLabels.dialogDescription ??
      'Enter the address to delegate your voting power'
    const enterAddress = delegateLabels.enterAddress ?? 'Enter address'

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className}>{delegateLabel}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{delegateLabel}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              placeholder={enterAddress}
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
                  {delegateLabel}
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
