import { SVGProps } from '~/i18n/types'
import clsx from 'clsx'
import { FC } from 'react'

const SwapIcon: FC<SVGProps> = ({
  sizeClass = 'h-5 w-6',
  colorClass = 'fill-current stroke-current',
  className,
}) => {
  return (
    <svg
      className={clsx(sizeClass, colorClass, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      stroke-width="2"
      style={{
        transform: 'rotateZ(180deg)',
        color: 'rgb(0, 0, 0)',
      }}
    >
      <path
        d="M7 12V2M7 2L3 6M7 2L11 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default SwapIcon
