import { SVGProps } from '@/Types'
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
      viewBox="0 0 24 20"
    >
      <path d="M21.4789 4.96633C21.4935 5.18174 21.4935 5.39714 21.4935 5.61453C21.4935 12.2385 16.5773 19.8779 7.58797 19.8779V19.8739C4.93249 19.8779 2.33216 19.0977 0.0966797 17.6266C0.482809 17.6742 0.870873 17.698 1.25991 17.699C3.46055 17.701 5.59829 16.9436 7.32958 15.5489C5.23829 15.5082 3.40442 14.1096 2.76378 12.0677C3.49636 12.2127 4.2512 12.1829 4.97023 11.9814C2.69023 11.5089 1.04991 9.45409 1.04991 7.06777C1.04991 7.04593 1.04991 7.02508 1.04991 7.00424C1.72926 7.39236 2.48991 7.60777 3.26797 7.63159C1.12055 6.15949 0.458615 3.2292 1.75539 0.93817C4.23668 4.06997 7.89765 5.97387 11.8276 6.17538C11.4338 4.43427 11.9718 2.60979 13.2415 1.38585C15.2099 -0.512087 18.3057 -0.414808 20.156 1.60324C21.2505 1.38188 22.2996 0.969935 23.2596 0.386258C22.8947 1.54666 22.1312 2.53236 21.1112 3.15872C22.0799 3.04159 23.0264 2.77556 23.9176 2.36957C23.2615 3.3781 22.4351 4.25659 21.4789 4.96633Z" />
    </svg>
  )
}

export default TwitterIcon
