import { MapPin, Phone, Mail, Clock3, Instagram, Navigation } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { business } from '../data/business.js'
import Reveal from './Reveal.jsx'
import styles from './Contact.module.css'

/** Decorative line pattern for the location card. Not a map of the area. */
function CardPattern() {
  return (
    <svg
      className={styles.cardPattern}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {[40, 100, 160, 220, 280, 340].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeWidth="0.8" />
      ))}
      {[60, 130, 200, 270, 340].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="currentColor" strokeWidth="0.8" />
      ))}
      <path d="M0 250C90 250 130 190 200 190s120 60 200 60" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="200" cy="190" r="9" fill="currentColor" opacity="0.6" />
      <circle cx="200" cy="190" r="24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useLang()
  const { openBooking } = useBooking()

  return (
    <section className={`section ${styles.section}`} id="contacto" aria-labelledby="contact-title">
      <div className={`shell ${styles.grid}`}>
        <div>
          <Reveal>
            <p className="eyebrow">{t('contact.eyebrow')}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className={styles.title} id="contact-title">
              {t('contact.title')}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className={styles.lead}>{t('contact.lead')}</p>
          </Reveal>

          <Reveal delay={160}>
            <div className={styles.list}>
              <div className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <MapPin size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <p className={styles.label}>{t('contact.addressLabel')}</p>
                  <p className={styles.value}>
                    {business.name}
                    <br />
                    {business.address}
                  </p>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <Phone size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <p className={styles.label}>{t('contact.phoneLabel')}</p>
                  <p className={styles.value}>
                    <a href={business.phoneHref}>{business.phone}</a>
                  </p>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <Mail size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <p className={styles.label}>{t('contact.emailLabel')}</p>
                  <p className={styles.value}>
                    <a href={business.emailHref}>{business.email}</a>
                  </p>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <Instagram size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <p className={styles.label}>{t('contact.socialLabel')}</p>
                  <div className={styles.socials}>
                    <a
                      className="link-underline"
                      href={business.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Instagram {business.instagram}
                    </a>
                    <a
                      className="link-underline"
                      href={business.tiktokUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      TikTok {business.tiktok}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <Clock3 size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <p className={styles.label}>{t('contact.hoursLabel')}</p>
                  <p className={styles.hours}>{t('contact.hours')}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className={styles.actions}>
            <button type="button" className="btn" onClick={() => openBooking()}>
              {t('booking.open')}
            </button>
            <a className="btn btn--ghost" href={business.phoneHref}>
              <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
              {business.phone}
            </a>
          </div>
        </div>

        <Reveal delay={140}>
          <div className={styles.card}>
            <CardPattern />
            <span className={styles.pin}>
              <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
              {t('contact.appointmentOnly')}
            </span>
            <div className={styles.cardBody}>
              <p className={styles.cardAddress}>
                {business.street}
                <br />
                {business.city}, {business.state} {business.zip}
              </p>
              <p className={styles.cardCaption}>{t('contact.mapCaption')}</p>
            </div>
            <div className={styles.cardActions}>
              <a
                className="btn btn--onDark"
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Navigation size={16} strokeWidth={1.7} aria-hidden="true" />
                {t('contact.directions')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
