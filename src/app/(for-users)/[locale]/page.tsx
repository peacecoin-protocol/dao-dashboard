import { Button } from '~/components/ui/button'
import { Link } from '~/i18n/link'
import { PagePropsWithLocale } from '~/i18n/types'

import { getDict } from '../../../i18n/get-dict'

export default async function ForUsersIndexPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const dict = await getDict(locale)

  return (
    <>
      <div className="py-4 flex flex-col items-center">
        <div className="links flex flex-row gap-10 items-center justify-center">
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/proposals">
              {dict.common.navigation.vote}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/token">
              {dict.common.navigation.token}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/bounty">
              {dict.common.navigation.bounty}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/eip">
              {dict.common.navigation.eips}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
