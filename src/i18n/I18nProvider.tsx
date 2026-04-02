import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { I18nContext } from './I18nContext'
import { type Language, languages, translations } from './translations'

const STORAGE_KEY = 'portfolio-language'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY)

  if (storedLanguage && languages.includes(storedLanguage as Language)) {
    return storedLanguage as Language
  }

  const browserLanguage = window.navigator.language.slice(0, 2) as Language

  return languages.includes(browserLanguage) ? browserLanguage : 'pt'
}

type I18nProviderProps = {
  children: ReactNode
}

function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export default I18nProvider
