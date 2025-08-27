'use client'

import { RouterProvider } from 'react-router-dom'
import router from '../router'

export default function CatchAllPage() {
  return <RouterProvider router={router} />
}
