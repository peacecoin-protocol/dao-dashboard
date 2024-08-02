import { createBrowserRouter } from 'react-router-dom'

import GeneralError from './(for-users)/[locale]/errors/general-error'

import { Locale } from '~/i18n/types'
let _locale: Locale = 'en'

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
    loader: async ({ params }) => {
      const { locale } = params
      _locale = locale as Locale
      const PageComponent = (await import('./(for-users)/[locale]/page'))
        .default

      return {
        Component: <PageComponent params={{ locale: _locale }} />,
      }
    },
    lazy: async () => {
      const PageComponent = (await import('~/components/app-shell')).default
      return {
        Component: (props) => (
          <PageComponent {...props} params={{ locale: _locale }} />
        ),
      }
    },
    errorElement: <div></div>,
    children: [
      {
        index: true,
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (await import('./(for-users)/[locale]/page'))
            .default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (await import('./(for-users)/[locale]/page'))
            .default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/proposals',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/proposals/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/proposals/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },

      {
        path: '/:locale/token',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/token/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/token/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },

      {
        path: '/:locale/bounty',
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/bounty/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/token',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/pip/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/pip/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/pending',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/pending/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/pending/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/closed',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/closed/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/closed/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/submit',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/submit/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/submit/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
      {
        path: '/:locale/delegate',
        loader: async ({ params }) => {
          const { locale } = params
          _locale = locale as Locale
          const PageComponent = (
            await import('./(for-users)/[locale]/delegate/page')
          ).default

          return {
            Component: <PageComponent params={{ locale: _locale }} />,
          }
        },
        lazy: async () => {
          const PageComponent = (
            await import('./(for-users)/[locale]/delegate/page')
          ).default

          return {
            Component: (props) => (
              <PageComponent {...props} params={{ locale: _locale }} />
            ),
          }
        },
      },
    ],
  },

  // Fallback 404 route
  { path: '*', Component: GeneralError },
])

export default router
