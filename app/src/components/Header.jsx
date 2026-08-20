import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { useScrolled, useActiveSection } from '../hooks/useScrollState.js'
import { useScrollLock, useFocusTrap } from '../hooks/useFocusTrap.js'
import { business } from '../data/business.js'
import LanguageSwitch from './LanguageSwitch.jsx'
import styles from './Header.module.css'

export const NAV_ITEMS = [
  { id: 'inicio', key: 'nav.home' },
  { id: 'servicios', key: 'nav.services' },
  { id: 'experiencia', key: 'nav.experience' },
  { id: 'estudio', key: 'nav.about' },
  { id: 'equipo', key: 'nav.team' },
  { id: 'galeria', key: 'nav.gallery' },
  { id: 'contacto', key: 'nav.contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Header() {
  const { t } = useLang()
  const { openBooking } = useBooking()
  const scrolled = useScrolled(28)
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useScrollLock(menuOpen)
  useFocusTrap(panelRef, menuOpen, closeMenu)

  // A resize to desktop should not leave the mobile panel stranded open.
  useEffect(() => {
    if (!menuOpen) return undefined
    const mql = window.matchMedia('(min-width: 1000px)')
    const onChange = (event) => event.matches && closeMenu()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [menuOpen, closeMenu])

  const go = (event, id) => {
    event.preventDefault()
    closeMenu()
    const target = document.getElementById(id)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = target.getBoundingClientRect().top + window.scrollY - (id === 'inicio' ? 0 : 76)
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div className={styles.announce}>
        <span>{t('announcement')}</span>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`shell ${styles.bar}`}>
          <a
            className={styles.brand}
            href="#inicio"
            onClick={(event) => go(event, 'inicio')}
            aria-label={`${business.name} ${business.tagline}`}
          >
            <img src="images/logo-lockup.png" alt={`${business.name}, ${business.tagline}`} width="720" height="304" />
          </a>

          <nav className={styles.desktopNav} aria-label={t('nav.menuTitle')}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={styles.navLink}
                href={`#${item.id}`}
                onClick={(event) => go(event, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSwitch id="header-lang" />
            <button
              type="button"
              className={`btn btn--sm ${styles.bookBtn}`}
              onClick={() => openBooking()}
            >
              {t('nav.book')}
            </button>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className={styles.panel}
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menuTitle')}
        >
          <div className={styles.panelTop}>
            <img src="images/logo-lockup.png" alt={business.name} width="720" height="304" />
            <button
              type="button"
              className={styles.burger}
              onClick={closeMenu}
              aria-label={t('nav.closeMenu')}
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav className={styles.panelNav} aria-label={t('nav.menuTitle')}>
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.id}
                className={styles.panelLink}
                href={`#${item.id}`}
                onClick={(event) => go(event, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                style={{ '--i': `${60 + index * 45}ms` }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className={styles.panelFoot}>
            <button
              type="button"
              className="btn btn--full"
              onClick={() => {
                closeMenu()
                openBooking()
              }}
            >
              {t('booking.open')}
            </button>
            <div className={styles.panelMeta}>
              <a href={business.phoneHref} className="link-underline">
                <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                {business.phone}
              </a>
              <LanguageSwitch id="menu-lang" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
