import {
  createBrowserRouter,
  LoaderFunction,
  LoaderFunctionArgs,
} from 'react-router-dom'

import GeneralError from './(for-users)/[locale]/errors/general-error'

import { Locale } from '~/i18n/types'
let _locale: Locale = 'en'

const loadComponent = async (key: string) => {
  let Component

  switch (key) {
    case 'app-shell':
      Component = (await import('~/components/app-shell')).default
      break
      // case 'delegate':
      //   Component = (await import('./(for-users)/[locale]/delegate/page')).default
      //   break
      // case 'submit':
      //   Component = (await import('./(for-users)/[locale]/submit/page')).default
      //   break
      // case 'closed':
      //   Component = (await import('./(for-users)/[locale]/closed/page')).default
      //   break
      // case 'pending':
      //   Component = (await import('./(for-users)/[locale]/pending/page')).default
      break
    case 'pip':
      Component = (await import('./(for-users)/[locale]/pip/page')).default
      break
    // case 'bounty':
    //   Component = (await import('./(for-users)/[locale]/bounty/page')).default
    //   break
    case 'token':
      Component = (await import('./(for-users)/[locale]/token/page')).default
      break
    case 'campaign':
      Component = (await import('./(for-users)/[locale]/campaign/page')).default
      break
    // case 'proposals':
    //   Component = (await import('./(for-users)/[locale]/proposals/page'))
    //     .default
    //   break
    case 'dashboard':
      Component = (await import('./(for-users)/[locale]/page')).default
      break
    case 'dao':
      Component = (await import('./(for-users)/[locale]/dao/page')).default
      break
    case 'dao_detail':
      Component = (await import('./(for-users)/[locale]/dao/detail/[id]/page'))
        .default
      break
    case 'pip-all':
      Component = (await import('./(for-users)/[locale]/pip/all/page')).default
      break
    // case 'pip-core':
    //   Component = (await import('./(for-users)/[locale]/pip/core/page')).default
    //   break
    // case 'pip-networking':
    //   Component = (await import('./(for-users)/[locale]/pip/networking/page'))
    //     .default
    //   break
    // case 'pip-interface':
    //   Component = (await import('./(for-users)/[locale]/pip/interface/page'))
    //     .default
    //   break
    // case 'pip-meta':
    //   Component = (await import('./(for-users)/[locale]/pip/meta/page')).default
    //   break
    // case 'pip-info':
    //   Component = (
    //     await import('./(for-users)/[locale]/pip/informational/page')
    //   ).default
    //   break
    // case 'pip-prc':
    //   Component = (await import('./(for-users)/[locale]/pip/prc/page')).default
    //   break
    case 'faq':
      Component = (await import('./(for-users)/[locale]/faq/page')).default
      break
    case 'daofaq':
      Component = (await import('./(for-users)/[locale]/daofaq/page')).default
      break
    case 'pce':
      Component = (await import('./(for-users)/[locale]/pce/page')).default
      break
    case 'pce_detail':
      Component = (await import('./(for-users)/[locale]/pce/detail/page'))
        .default
      break
    case 'votingpower':
      Component = (await import('./(for-users)/[locale]/votingpower/page'))
        .default
      break
    case 'createsbt':
      Component = (await import('./(for-users)/[locale]/admin/sbt/page'))
        .default
      break
    case 'admin-create-campaign':
      Component = (
        await import('./(for-users)/[locale]/admin/createcampaign/page')
      ).default
      break
    default:
      Component = (await import('~/components/app-shell')).default
      break
  }

  return Component
}

const createLoader =
  (key: string): LoaderFunction =>
  async (args: LoaderFunctionArgs) => {
    const { params } = args
    const { locale } = params
    _locale = locale as Locale
    const PageComponent = await loadComponent(key)
    return {
      Component: <PageComponent params={{ locale: locale as Locale }} />,
    }
  }

const createLazy = (key: string) => async () => {
  const PageComponent = await loadComponent(key)
  return {
    Component: (props: any) => {
      // Ensure we have the locale from props or use a default
      const locale = props.params?.locale || _locale || 'en'
      return <PageComponent {...props} params={{ locale }} />
    },
  }
}

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/:locale/error',
    lazy: async () => ({
      Component: (
        await import('./(for-users)/[locale]/errors/maintenance-error')
      ).default,
    }),
  },

  // Main routes
  {
    path: '/:locale',
    loader: createLoader('app-shell'),
    lazy: createLazy('app-shell'),
    errorElement: <div>Error loading page</div>,
    children: [
      {
        index: true,
        loader: createLoader('dashboard'),
        lazy: createLazy('dashboard'),
      },
      {
        path: 'dao',
        loader: createLoader('dao'),
        lazy: createLazy('dao'),
      },
      {
        path: 'votingpower',
        loader: createLoader('votingpower'),
        lazy: createLazy('votingpower'),
      },
      {
        path: 'daofaq',
        loader: createLoader('daofaq'),
        lazy: createLazy('daofaq'),
      },
      {
        path: 'dao/detail/:id',
        loader: createLoader('dao_detail'),
        lazy: createLazy('dao_detail'),
      },
      {
        path: 'proposals',
        loader: createLoader('proposals'),
        lazy: createLazy('proposals'),
      },
      {
        path: 'token',
        loader: createLoader('token'),
        lazy: createLazy('token'),
      },
      {
        path: 'bounty',
        loader: createLoader('bounty'),
        lazy: createLazy('bounty'),
      },
      {
        path: 'pip',
        loader: createLoader('pip'),
        lazy: createLazy('pip'),
      },
      {
        path: 'pending',
        loader: createLoader('pending'),
        lazy: createLazy('pending'),
      },
      {
        path: 'closed',
        loader: createLoader('closed'),
        lazy: createLazy('closed'),
      },
      {
        path: 'submit',
        loader: createLoader('submit'),
        lazy: createLazy('submit'),
      },
      {
        path: 'delegate',
        loader: createLoader('delegate'),
        lazy: createLazy('delegate'),
      },
      {
        path: 'pip/all',
        loader: createLoader('pip-all'),
        lazy: createLazy('pip-all'),
      },
      {
        path: 'pip/core',
        loader: createLoader('pip-core'),
        lazy: createLazy('pip-core'),
      },
      {
        path: 'pip/informational',
        loader: createLoader('pip-info'),
        lazy: createLazy('pip-info'),
      },
      {
        path: 'pip/meta',
        loader: createLoader('pip-meta'),
        lazy: createLazy('pip-meta'),
      },
      {
        path: 'pip/networking',
        loader: createLoader('pip-networking'),
        lazy: createLazy('pip-networking'),
      },
      {
        path: 'pip/prc',
        loader: createLoader('pip-prc'),
        lazy: createLazy('pip-prc'),
      },
      {
        path: 'pip/interface',
        loader: createLoader('pip-interface'),
        lazy: createLazy('pip-interface'),
      },
      {
        path: 'faq',
        loader: createLoader('faq'),
        lazy: createLazy('faq'),
      },
      {
        path: 'pce',
        loader: createLoader('pce'),
        lazy: createLazy('pce'),
      },
      {
        path: 'pce/detail',
        loader: createLoader('pce_detail'),
        lazy: createLazy('pce_detail'),
      },
      {
        path: 'campaign',
        loader: createLoader('campaign'),
        lazy: createLazy('campaign'),
      },
      {
        path: 'admin/createsbt',
        loader: createLoader('createsbt'),
        lazy: createLazy('createsbt'),
      },
      {
        path: 'admin/createcampaign',
        loader: createLoader('admin-create-campaign'),
        lazy: createLazy('admin-create-campaign'),
      },
    ],
  },

  // Fallback 404 route
  { path: '*', Component: GeneralError },
])

export default router
