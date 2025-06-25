import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'
import { IconLoader2 } from '@tabler/icons-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1995AD] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#1995AD] text-white shadow-sm hover:bg-[#147a8a] active:bg-[#126c7b]',
        destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
        outline: 'border border-[#1995AD] text-[#1995AD] bg-transparent',
        secondary: 'text-[#000000] hover:text-[#1995AD]',
        ghost: 'bg-transparent text-[#1995AD]',
        link: 'text-[#1995AD] underline underline-offset-4 hover:text-[#147a8a] active:text-[#126c7b] px-0',
      },
      size: {
        default: 'h-10 px-5 py-2 text-base',
        sm: 'h-8 px-3 py-1 text-sm',
        lg: 'h-12 px-8 py-3 text-lg',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftSection?: JSX.Element
  rightSection?: JSX.Element
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading = false,
      leftSection,
      rightSection,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {((leftSection && loading) ||
          (!leftSection && !rightSection && loading)) && (
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftSection && <div className="mr-2">{leftSection}</div>}
        {children}
        {!loading && rightSection && <div className="ml-2">{rightSection}</div>}
        {rightSection && loading && (
          <IconLoader2 className="ml-2 h-4 w-4 animate-spin" />
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
