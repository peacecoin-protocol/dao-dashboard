import { SVGProps } from '~/i18n/types'
import clsx from 'clsx'
import { FC } from 'react'

const TwitterIcon: FC<SVGProps> = ({
  sizeClass = 'h-5 w-6',
  colorClass = 'fill-current stroke-current',
  className,
}) => {
  return (
    <svg
      className={clsx(sizeClass, colorClass, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 512 462.799"
    >
      <path d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" />
    </svg>
  )
}

export default TwitterIcon
