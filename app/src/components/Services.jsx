import { useId, useMemo, useState } from 'react'
import { Clock, Users, AlertCircle, ChevronDown } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { CATEGORIES, CAUTIONS, publicServices } from '../data/services.js'
import Reveal from './Reveal.jsx'
import styles from './Services.module.css'

function ServiceCard({ service, index }) {
  const { t, pick } = useLang()
  const { openBooking } = useBooking()
  const [openWarning, setOpenWarning] = useState(false)
  const panelId = useId()
  const caution = service.caution ? CAUTIONS[service.caution] : null
  const bothArtists = service.artists.length > 1

  return (
    <Reveal delay={Math.min(index, 5) * 70}>
      <article className={`${styles.card} ${service.featured ? styles.cardFeatured : ''}`}>
        <div className={styles.cardTop}>
          <h3 className={styles.name}>{pick(service.name)}</h3>
          <p className={styles.price}>${service.price}</p>
        </div>

        <p className={styles.meta}>
          <span>
            <Clock size={14} strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only">{t('services.durationLabel')}: </span>
            {pick(service.duration)}
          </span>
          <span>
            <Users size={14} strokeWidth={1.6} aria-hidden="true" />
            {bothArtists ? t('services.withBoth') : t('services.withLaura')}
          </span>
        </p>

        <p className={styles.blurb}>{pick(service.blurb)}</p>

        {caution && (
          <div className={`${styles.warnPanel} ${openWarning ? styles.warnPanelOpen : ''}`}>
            <div className={styles.warnInner}>
              <div className={styles.warnBody} id={panelId} role="region">
                <strong>{t('services.cautionTitle')}</strong>
                <p>{pick(caution)}</p>
                <p>{t('services.cautionFooter')}</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.cardFoot}>
          <button
            type="button"
            className="btn btn--sm btn--rose"
            onClick={() => openBooking({ serviceId: service.id })}
          >
            {t('services.book')}
          </button>

          {caution && (
            <button
              type="button"
              className={styles.warnToggle}
              onClick={() => setOpenWarning((value) => !value)}
              aria-expanded={openWarning}
              aria-controls={panelId}
            >
              <AlertCircle size={14} strokeWidth={1.7} aria-hidden="true" />
              {openWarning ? t('services.cautionClose') : t('services.cautionShort')}
              <ChevronDown
                size={14}
                strokeWidth={1.7}
                aria-hidden="true"
                style={{
                  transform: openWarning ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--dur-fast) var(--ease)',
                }}
              />
            </button>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export default function Services() {
  const { t, pick } = useLang()
  const [filter, setFilter] = useState('all')

  const list = useMemo(() => {
    const items = filter === 'all' ? publicServices : publicServices.filter((s) => s.category === filter)
    // The studio's headline treatments lead the menu, the add ons follow.
    return [...items].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }, [filter])

  return (
    <section className={`section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <div className="shell">
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="eyebrow">{t('services.eyebrow')}</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className={styles.title} id="services-title">
                {t('services.title')}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead" style={{ marginTop: '1rem' }}>
                {t('services.lead')}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className={styles.filterBlock}>
              <div className={styles.filters} role="group" aria-label={t('services.filterLabel')}>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.chip} ${filter === category.id ? styles.chipOn : ''}`}
                    onClick={() => setFilter(category.id)}
                    aria-pressed={filter === category.id}
                  >
                    {pick(category)}
                  </button>
                ))}
              </div>
              <p className={styles.count} aria-live="polite">
                {list.length} {t('services.countLabel')}
              </p>
            </div>
          </Reveal>
        </div>

        {list.length === 0 ? (
          <p className={styles.empty}>{t('services.empty')}</p>
        ) : (
          <div className={styles.grid}>
            {list.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
