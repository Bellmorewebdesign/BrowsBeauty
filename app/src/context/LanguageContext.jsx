import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, strings } from '../data/i18n.js'

const STORAGE_KEY = 'brows-beauty-lang'
const LanguageContext = createContext(null)

function readStoredLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE
  } catch {
    // Private browsing or blocked storage: Spanish stays the default.
    return DEFAULT_LANGUAGE
  }
}

/** Walks a dot path such as `nav.services` and returns the stored value. */
function resolve(dict, path) {
  return path.split('.').reduce((node, key) => (node == null ? node : node[key]), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = strings[lang].meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', strings[lang].meta.description)
  }, [lang])

  const setLang = useCallback(
    (next) => {
      if (!LANGUAGES.includes(next) || next === lang) return
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Preference simply is not persisted; the switch still works.
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setLangState(next)
        return
      }
      // Short crossfade so the page does not snap between languages.
      setFading(true)
      window.setTimeout(() => {
        setLangState(next)
        window.setTimeout(() => setFading(false), 20)
      }, 160)
    },
    [lang],
  )

  const value = useMemo(() => {
    const dict = strings[lang]
    /** t('nav.services') and t('booking.stepOf', { current: 2, total: 5 }) */
    const t = (path, vars) => {
      const found = resolve(dict, path)
      if (typeof found !== 'string') return found ?? path
      if (!vars) return found
      return found.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? String(vars[key]) : `{${key}}`))
    }
    /** Picks the right half of a `{ es, en }` pair stored in the data files. */
    const pick = (pair) => (pair == null ? '' : typeof pair === 'string' ? pair : pair[lang])
    return { lang, setLang, t, pick, fading, other: lang === 'es' ? 'en' : 'es' }
  }, [lang, setLang, fading])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
