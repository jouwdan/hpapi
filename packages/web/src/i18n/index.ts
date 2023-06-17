import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { fallback, supportedLocales } from './common'
import locale from './locale'

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallback,
    resources: supportedLocales,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: '.',
  })

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
]

for (const language of languages) {
  i18n.addResourceBundle(language.code, 'translation', locale[language.code as keyof typeof locale])
}

export default i18n
