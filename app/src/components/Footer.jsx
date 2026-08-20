import { ArrowUp, MapPin, Phone, Mail, Instagram, Music2 } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { business } from '../data/business.js'
import LanguageSwitch from './LanguageSwitch.jsx'
import { NAV_ITEMS } from './Header.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()
  const { openBooking } = useBooking()
  const year = new Date().getFullYear()

  const go = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 76,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <img
              src="images/logo-lockup-light.png"
              alt={`${business.name}, ${business.tagline}`}
              width="720"
              height="304"
              loading="lazy"
            />
            <p className={styles.about}>{t('footer.about')}</p>
          </div>

          <nav aria-label={t('footer.navTitle')}>
            <p className={styles.colTitle}>{t('footer.navTitle')}</p>
            <div className={styles.links}>
              {NAV_ITEMS.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={(event) => go(event, item.id)}>
                  {t(item.key)}
                </a>
              ))}
              <button type="button" onClick={() => openBooking()}>
                {t('nav.book')}
              </button>
            </div>
          </nav>

          <div>
            <p className={styles.colTitle}>{t('footer.contactTitle')}</p>
            <address className={styles.contactList} style={{ fontStyle: 'normal' }}>
              <span className={styles.contactRow}>
                <MapPin size={15} strokeWidth={1.6} aria-hidden="true" />
                <span>{business.address}</span>
              </span>
              <span className={styles.contactRow}>
                <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                <a href={business.phoneHref}>{business.phone}</a>
              </span>
              <span className={styles.contactRow}>
                <Mail size={15} strokeWidth={1.6} aria-hidden="true" />
                <a href={business.emailHref}>{business.email}</a>
              </span>
              <span className={styles.contactRow}>
                <Instagram size={15} strokeWidth={1.6} aria-hidden="true" />
                <a href={business.instagramUrl} target="_blank" rel="noreferrer noopener">
                  {business.instagram}
                </a>
              </span>
              <span className={styles.contactRow}>
                <Music2 size={15} strokeWidth={1.6} aria-hidden="true" />
                <a href={business.tiktokUrl} target="_blank" rel="noreferrer noopener">
                  {business.tiktok}
                </a>
              </span>
            </address>
          </div>

          <div className={styles.langCol}>
            <div>
              <p className={styles.colTitle}>{t('footer.langTitle')}</p>
              <LanguageSwitch dark id="footer-lang" />
            </div>
            <button type="button" className={styles.toTop} onClick={toTop}>
              <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
              {t('footer.backToTop')}
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {business.name}. {t('footer.rights')}
          </p>
          <p>
            {t('footer.credit')} {business.credit}
          </p>
          <p className={styles.demoNote}>{t('footer.demoNote')}</p>
        </div>
      </div>
    </footer>
  )
}
