import React from 'react'

import { Locale } from '~/i18n/types'

export const Banner: React.FC<{ locale: Locale }> = (props) => {
  switch (props.locale) {
    case 'en':
      return <BannerEnLocale />
    case 'ja':
      return <BannerJaLocale />
  }
}

const BannerEnLocale: React.FC = () => {
  return (
    <div className="w-full h-64 bg-blue-500">
      <h1 className="text-white text-center text-2xl pt-12">
        Welcome to our site!
      </h1>
    </div>
  )
}

const BannerJaLocale: React.FC = () => {
  return (
    <>
      <div className="w-full h-64 bg-blue-500">
        <h1 className="text-white text-center text-2xl pt-12">
          サイトへようこそ！
        </h1>
      </div>
      <div className="w-full h-64 bg-red-500">
        <p>日本語の場合だけ追加コンテンツが表示されます</p>
      </div>
      <div className="w-full h-64 bg-red-500">
        <p>日本語の場合だけ追加コンテンツが表示されます</p>
      </div>
      <div className="w-full h-64 bg-red-500">
        <p>日本語の場合だけ追加コンテンツが表示されます</p>
      </div>
      <div className="w-full h-64 bg-red-500">
        <p>日本語の場合だけ追加コンテンツが表示されます</p>
      </div>
    </>
  )
}
