import { useLang } from '../context/LanguageContext.jsx'
import styles from './LanguageSwitch.module.css'

const OPTIONS = [
  { code: 'es', label: 'ES', full: { es: 'Español', en: 'Spanish' } },
  { code: 'en', label: 'EN', full: { es: 'Inglés', en: 'English' } },
]

export default function LanguageSwitch({ dark = false, id = 'lang' }) {
  const { lang, setLang, t } = useLang()
  const groupId = `${id}-label`

  return (
    <div
      className={`${styles.switch} ${dark ? styles.dark : ''}`}
      role="group"
      aria-labelledby={groupId}
    >
      <span className="sr-only" id={groupId}>
        {t('lang.label')}
      </span>
      {OPTIONS.map((option, index) => (
        <span key={option.code} style={{ display: 'contents' }}>
          {index > 0 && <span className={styles.sep} aria-hidden="true" />}
          <button
            type="button"
            className={`${styles.option} ${lang === option.code ? styles.active : ''}`}
            onClick={() => setLang(option.code)}
            aria-pressed={lang === option.code}
          >
            <span aria-hidden="true">{option.label}</span>
            <span className="sr-only">{option.full[lang]}</span>
          </button>
        </span>
      ))}
    </div>
  )
}
