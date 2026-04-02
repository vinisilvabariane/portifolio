import { createContext } from 'react'
import { type Language, translations } from './translations'

export type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: typeof translations.pt
}

export const I18nContext = createContext<I18nContextValue | null>(null)
