import { useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'
import { LanguageContext } from './useLanguage.js'

const STORAGE_KEY = 'fw24.lang'
const LANGS = ['de', 'ru']

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    // storage unavailable – fall back to the browser language
  }
  return navigator.language?.startsWith('ru') ? 'ru' : 'de'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, langs: LANGS, t: translations[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
