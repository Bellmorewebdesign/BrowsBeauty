import { CalendarDays, Sparkle } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { team } from '../data/team.js'
import Reveal from './Reveal.jsx'
import styles from './Team.module.css'

export default function Team() {
  const { t, pick } = useLang()
  const { openBooking } = useBooking()

  return (
    <section className={`section ${styles.section}`} id="equipo" aria-labelledby="team-title">
      <div className="shell">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">{t('team.eyebrow')}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className={styles.title} id="team-title">
              {t('team.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.headLead}>{t('team.lead')}</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {team.map((artist, index) => (
            <Reveal key={artist.id} delay={index * 120}>
              <article className={styles.card}>
                <figure className={styles.figure}>
                  <img
                    src={artist.photo}
                    alt={`${t('team.photoAltPrefix')} ${artist.name}, ${pick(artist.role)}`}
                    width="900"
                    height="1125"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className={styles.focusTag}>
                    <Sparkle size={13} strokeWidth={1.7} aria-hidden="true" />
                    {pick(artist.focus)}
                  </figcaption>
                </figure>

                <div>
                  <div className={styles.nameRow}>
                    <h3 className={styles.name}>{artist.name}</h3>
                    <p className={styles.role}>{pick(artist.role)}</p>
                  </div>
                  <p className={styles.bio} style={{ marginTop: '0.9rem' }}>
                    {pick(artist.bio)}
                  </p>
                  {artist.comingSoon && <p className={styles.soon}>{pick(artist.comingSoon)}</p>}
                </div>

                <ul className={styles.skills} aria-label={`${t('team.servicesLabel')}: ${artist.name}`}>
                  {artist.skills.map((skill) => (
                    <li className={styles.skill} key={pick(skill)}>
                      {pick(skill)}
                    </li>
                  ))}
                </ul>

                {artist.availability.note && (
                  <p className={styles.availability}>
                    <CalendarDays size={16} strokeWidth={1.6} aria-hidden="true" />
                    <span>
                      <span className="sr-only">{t('team.availabilityLabel')}: </span>
                      {pick(artist.availability.note)}
                    </span>
                  </p>
                )}

                <div className={styles.actions}>
                  <button
                    type="button"
                    className="btn btn--sm"
                    onClick={() => openBooking({ artistId: artist.id })}
                  >
                    {t('team.bookWith')} {artist.name.split(' ')[0]}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
