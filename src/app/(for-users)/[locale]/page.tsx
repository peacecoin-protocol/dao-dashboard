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
      <div className="py-4">
        <div className="links flex flex-col gap-4">
          <Button variant="outline" asChild>
            <Link locale={locale} href="/vote">
              {dict.common.navigation.vote}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link locale={locale} href="/token">
              {dict.common.navigation.token}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
