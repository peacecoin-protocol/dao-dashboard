export type Locale = 'en' | 'ja'

export type PagePropsWithLocale<T> = T & {
  params: { locale: Locale }
}
