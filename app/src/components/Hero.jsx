import { useEffect, useRef } from 'react'
import { CalendarCheck, ArrowDownRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { BrowArc } from './Ornaments.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, lang } = useLang()
  const { openBooking } = useBooking()
  const imageRef = useRef(null)
  const plateRef = useRef(null)

  // A small depth response on scroll: transform only, driven by rAF, and never
  // active when the visitor prefers reduced motion.
  useEffect(() => {
    if (document.documentElement.dataset.anim !== 'on') return undefined
    const image = imageRef.current
    const plate = plateRef.current
    if (!image) return undefined

    let frame = 0
    const apply = () => {
      frame = 0
      const shift = Math.min(window.scrollY, 700)
      image.style.transform = `translate3d(0, ${shift * 0.055}px, 0) scale(1.03)`
      if (plate) plate.style.transform = `translate3d(0, ${shift * -0.03}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply)
    }
    // Wait for the entrance animation to finish before taking over the transform.
    const start = window.setTimeout(() => {
      apply()
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 1700)

    return () => {
      window.clearTimeout(start)
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToServices = (event) => {
    event.preventDefault()
    const target = document.getElementById('servicios')
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 76,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  // The closing phrase is set in italic rose so the headline has a focal point
  // without animating individual words.
  const title = t('hero.title')
  const accent = lang === 'es' ? 'diseñada para ti' : 'designed for you'
  const hasAccent = title.includes(accent)
  const [head, tail] = hasAccent ? title.split(accent) : [title, '']

  return (
    <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copyTop}>
          <div className={styles.eyebrowRow}>
            <p className="eyebrow">{t('hero.eyebrow')}</p>
          </div>

          <div className={styles.titleMask}>
            <h1 className={styles.title} id="hero-title">
              {head}
              {hasAccent && <em>{accent}</em>}
              {tail}
            </h1>
          </div>

          <p className={styles.lead}>{t('hero.lead')}</p>
        </div>

        <figure className={styles.figure}>
          <img
            className={styles.mark}
            src="images/logo-mark.png"
            alt=""
            aria-hidden="true"
            width="360"
            height="360"
          />
          <span className={styles.plate} ref={plateRef} aria-hidden="true" />
          <div className={styles.frame}>
            <img
              ref={imageRef}
              src="images/laura-portrait.jpg"
              alt={t('hero.photoAlt')}
              width="900"
              height="1200"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <BrowArc className={styles.arc} />
          <figcaption className={styles.badge}>
            <ArrowDownRight size={14} strokeWidth={1.8} aria-hidden="true" />
            {t('hero.badge')}
          </figcaption>
        </figure>

        <div className={styles.copyBottom}>
          <div className={styles.ctas}>
            <button type="button" className="btn" onClick={() => openBooking()}>
              <CalendarCheck size={17} strokeWidth={1.6} aria-hidden="true" />
              {t('hero.primary')}
            </button>
            <a className="btn btn--ghost" href="#servicios" onClick={scrollToServices}>
              {t('hero.secondary')}
            </a>
          </div>

          <dl className={styles.stats}>
            {t('hero.stats').map((item) => (
              <div className={styles.stat} key={item.value}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.scrollCue}>
            <span className={styles.cueLine} aria-hidden="true" />
            {t('hero.scroll')}
          </p>
        </div>
      </div>
    </section>
  )
}
