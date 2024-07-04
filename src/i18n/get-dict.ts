// import 'server-only'

const dictionaries = {
  en: () => import('./dict/en.json').then((module) => module.default),
  ja: () => import('./dict/ja.json').then((module) => module.default),
}

export const getDict = async (locale: 'en' | 'ja') => dictionaries[locale]()
