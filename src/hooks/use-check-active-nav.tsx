import { usePathname } from 'next/navigation'

export default function useCheckActiveNav() {
  const pathname = usePathname()

  const checkActiveNav = (nav: string) => {
    // Remove locale from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

    // Handle root path
    if (nav === '/' && pathWithoutLocale === '/') return true

    // Remove leading slash from nav for comparison
    const cleanNav = nav.replace(/^\//, '')

    // Check if the current path starts with the nav path
    return (
      pathWithoutLocale.startsWith(`/${cleanNav}`) ||
      pathWithoutLocale === `/${cleanNav}`
    )
  }

  return { checkActiveNav }
}
