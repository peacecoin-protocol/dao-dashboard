'use client'

import Link from 'next/link'
import { FC } from 'react'

interface PIPBarProps {
  url: string
  dict: any
}
const PIPBar: FC<PIPBarProps> = ({ url, dict }) => {
  return (
    <div>
      <Link href={`${url}/`} className="text-center">
        <h2 className="text-3xl text-light_green">
          {dict ? dict.pipBar.title : ''}
        </h2>
      </Link>
      <div className="flex flex-row gap-4 text-xl justify-center my-4 text-light_green">
        <Link href={`${url}/all`}> {dict ? dict.pipBar.all : ''}</Link>
        <Link href={`${url}/core`}> {dict ? dict.pipBar.core : ''}</Link>
        <Link href={`${url}/networking`}>
          {' '}
          {dict ? dict.pipBar.networking : ''}
        </Link>
        <Link href={`${url}/interface`}>
          {' '}
          {dict ? dict.pipBar.interface : ''}
        </Link>
        <Link href={`${url}/prc`}> {dict ? dict.pipBar.prc : ''}</Link>
        <Link href={`${url}/meta`}> {dict ? dict.pipBar.meta : ''}</Link>
        <Link href={`${url}/informational`}>
          {' '}
          {dict ? dict.pipBar.info : ''}
        </Link>
      </div>
    </div>
  )
}

export default PIPBar
