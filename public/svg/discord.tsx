import { SVGProps } from '@/Types'
import clsx from 'clsx'
import { FC } from 'react'

const DiscordIcon: FC<SVGProps> = ({
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
      <path d="M20.3303 2.42863C18.7535 1.70672 17.0889 1.19458 15.3789 0.905273C15.1449 1.32356 14.9332 1.75392 14.7447 2.19456C12.9233 1.9201 11.071 1.9201 9.24963 2.19456C9.06097 1.75397 8.84926 1.32361 8.61537 0.905273C6.90435 1.19702 5.23861 1.71038 3.6602 2.43241C0.526645 7.06856 -0.322812 11.5896 0.101917 16.0464C1.937 17.4022 3.99099 18.4334 6.17459 19.095C6.66628 18.4337 7.10135 17.7321 7.47521 16.9978C6.76512 16.7326 6.07977 16.4054 5.42707 16.0199C5.59885 15.8954 5.76685 15.767 5.92919 15.6424C7.82839 16.5356 9.90126 16.9986 12 16.9986C14.0987 16.9986 16.1716 16.5356 18.0708 15.6424C18.235 15.7764 18.403 15.9048 18.5729 16.0199C17.9189 16.406 17.2323 16.7338 16.521 16.9997C16.8944 17.7337 17.3295 18.4346 17.8216 19.095C20.0071 18.436 22.0626 17.4054 23.898 16.0483C24.3964 10.8798 23.0467 6.40032 20.3303 2.42863ZM8.0132 13.3055C6.82962 13.3055 5.8518 12.2314 5.8518 10.91C5.8518 9.58861 6.79564 8.50508 8.00942 8.50508C9.2232 8.50508 10.1935 9.58861 10.1727 10.91C10.1519 12.2314 9.21943 13.3055 8.0132 13.3055ZM15.9868 13.3055C14.8013 13.3055 13.8273 12.2314 13.8273 10.91C13.8273 9.58861 14.7711 8.50508 15.9868 8.50508C17.2024 8.50508 18.1652 9.58861 18.1444 10.91C18.1236 12.2314 17.193 13.3055 15.9868 13.3055Z" />
    </svg>
  )
}

export default DiscordIcon