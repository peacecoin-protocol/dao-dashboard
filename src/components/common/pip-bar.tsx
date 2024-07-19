'use client'

import Link from 'next/link'
import { FC, useState } from 'react'

interface PIPBarProps {
  url: string
}
const PIPBar: FC<PIPBarProps> = ({ url }) => {
  return (
    <div>
      <Link href="./" className="text-center">
        <h2 className="text-3xl text-light_green">
          PEACE COIN Improvement Proposals
        </h2>
      </Link>
      <div className="flex flex-row gap-4 text-xl justify-center my-4 text-light_green">
        <Link href={`${url}/all`}>All</Link>
        <Link href={`${url}/core`}>Core</Link>
        <Link href={`${url}/networking`}>Networking</Link>
        <Link href={`${url}/interface`}>Interface</Link>
        <Link href={`${url}/prc`}>PRC</Link>
        <Link href={`${url}/meta`}>Meta</Link>
        <Link href={`${url}/informational`}>Informational</Link>
      </div>
    </div>
  )
}

export default PIPBar
