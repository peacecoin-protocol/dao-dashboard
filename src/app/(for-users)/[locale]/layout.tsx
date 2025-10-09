'use client'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { Sidebar } from '~/components/ui/sidebar'
import Link from 'next/link'

export default function ForUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <nav className="flex flex-col gap-2 p-4">
            <div> Testing Shadcn/ui Sidebar</div>
            <Link href="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:underline">
              FAQ
            </Link>
            <Link href="/pip" className="text-sm font-medium hover:underline">
              PIPs
            </Link>
            <Link href="/dao" className="text-sm font-medium hover:underline">
              DAO
            </Link>
          </nav>
        </Sidebar>
        <main className="flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}