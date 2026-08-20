import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  X,
  Info,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Phone,
  Mail,
  CalendarDays,
} from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { useFocusTrap, useScrollLock } from '../hooks/useFocusTrap.js'
import { publicServices, getService, CATEGORIES } from '../data/services.js'
import { team, getArtist } from '../data/team.js'
import { business } from '../data/business.js'
import styles from './BookingDemo.module.css'

const TOTAL_STEPS = 5
// Sample slots only. The studio's real opening hours are not confirmed, so these
// are presented throughout as examples rather than as live availability.
const SAMPLE_TIMES = ['11:00', '12:30', '14:00', '15:30', '17:00', '18:30']
const DAYS_AHEAD = 24

const LOCALE = { es: 'es-US', en: 'en-US' }

const EMPTY_DETAILS = { name: '', phone: '', email: '', notes: '' }

function buildDates(availableDays) {
  const out = []
  const start = new Date()
  start.setHours(12, 0, 0, 0)
  for (let i = 1; i <= DAYS_AHEAD; i += 1) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    if (availableDays && !availableDays.includes(day.getDay())) continue
    out.push(day)
  }
  return out.slice(0, 12)
}

const toISO = (date) => date.toISOString().slice(0, 10)

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
const isPhone = (value) => value.replace(/[^\d]/g, '').length >= 10

export default function BookingDemo() {
  const { t, pick, lang } = useLang()
  const { open, seed, closeBooking } = useBooking()
  const panelRef = useRef(null)
  const headingRef = useRef(null)

  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState(null)
  const [artistId, setArtistId] = useState(null)
  const [dateISO, setDateISO] = useState(null)
  const [time, setTime] = useState(null)
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [errors, setErrors] = useState({})
  const [filter, setFilter] = useState('all')

  useScrollLock(open)
  useFocusTrap(panelRef, open, closeBooking)

  const resetAll = useCallback(() => {
    setStep(0)
    setServiceId(null)
    setArtistId(null)
    setDateISO(null)
    setTime(null)
    setDetails(EMPTY_DETAILS)
    setErrors({})
    setFilter('all')
  }, [])

  // Each opening starts from a clean slate, optionally pre-filled by whichever
  // button was pressed.
  useEffect(() => {
    if (!open) return
    setStep(seed.serviceId ? 1 : 0)
    setServiceId(seed.serviceId ?? null)
    setArtistId(seed.artistId ?? null)
    setDateISO(null)
    setTime(null)
    setDetails(EMPTY_DETAILS)
    setErrors({})
    setFilter('all')
  }, [open, seed])

  const service = serviceId ? getService(serviceId) : null
  const artist = artistId ? getArtist(artistId) : null

  const dates = useMemo(() => buildDates(artist?.availability?.days ?? null), [artist])

  // Moving between steps sends focus to the new heading so keyboard and screen
  // reader users are not left behind at the footer.
  useEffect(() => {
    if (!open) return
    const node = headingRef.current
    if (node) node.focus({ preventScroll: true })
    const body = panelRef.current?.querySelector(`.${styles.body}`)
    if (body) body.scrollTop = 0
  }, [step, open])

  const filtered = useMemo(
    () => (filter === 'all' ? publicServices : publicServices.filter((s) => s.category === filter)),
    [filter],
  )

  const dateFormatter = useMemo(
    () => ({
      dow: new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'short' }),
      day: new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric' }),
      month: new Intl.DateTimeFormat(LOCALE[lang], { month: 'short' }),
      full: new Intl.DateTimeFormat(LOCALE[lang], {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    }),
    [lang],
  )

  const formatTime = useCallback(
    (value) => {
      const [hour, minute] = value.split(':').map(Number)
      const date = new Date()
      date.setHours(hour, minute, 0, 0)
      return new Intl.DateTimeFormat(LOCALE[lang], { hour: 'numeric', minute: '2-digit' }).format(date)
    },
    [lang],
  )

  const validate = useCallback(() => {
    const next = {}
    if (step === 0 && !serviceId) next.service = t('booking.errors.service')
    if (step === 1 && !artistId) next.artist = t('booking.errors.artist')
    if (step === 2 && !dateISO) next.date = t('booking.errors.date')
    if (step === 3 && !time) next.time = t('booking.errors.time')
    if (step === 4) {
      if (!details.name.trim()) next.name = t('booking.errors.name')
      const hasPhone = details.phone.trim() !== ''
      const hasEmail = details.email.trim() !== ''
      if (!hasPhone && !hasEmail) next.contact = t('booking.errors.contact')
      if (hasEmail && !isEmail(details.email)) next.email = t('booking.errors.email')
      if (hasPhone && !isPhone(details.phone)) next.phone = t('booking.errors.phone')
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }, [step, serviceId, artistId, dateISO, time, details, t])

  // Nothing is ever sent anywhere. The submit handler only advances the demo.
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    setStep((current) => Math.min(current + 1, TOTAL_STEPS))
  }

  const back = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  const chooseService = (id) => {
    setServiceId(id)
    setErrors({})
    const chosen = getService(id)
    // Clear an artist who does not offer the newly picked service.
    if (artistId && chosen && !chosen.artists.includes(artistId)) setArtistId(null)
  }

  const chooseArtist = (id) => {
    setArtistId(id)
    setErrors({})
    setDateISO(null)
  }

  if (!open) return null

  const selectedDate = dateISO ? dates.find((d) => toISO(d) === dateISO) : null
  const isConfirmation = step === TOTAL_STEPS
  const stepLabels = t('booking.steps')

  const summaryLine = [
    service ? pick(service.name) : null,
    artist ? artist.name.split(' ')[0] : null,
    selectedDate ? dateFormatter.full.format(selectedDate) : null,
    time ? formatTime(time) : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeBooking()
      }}
    >
      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        aria-describedby="booking-disclaimer"
      >
        <div className={styles.head}>
          <div className={styles.headTop}>
            <div>
              <h2 className={styles.title} id="booking-title">
                {t('booking.title')}
              </h2>
              <p className={styles.subtitle}>{t('booking.subtitle')}</p>
            </div>
            <button type="button" className={styles.close} onClick={closeBooking} aria-label={t('booking.close')}>
              <X size={19} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <ol className={styles.steps}>
            {stepLabels.map((label, index) => (
              <li
                key={label}
                className={`${styles.stepDot} ${
                  index < step || isConfirmation ? styles.stepDone : ''
                } ${index === step && !isConfirmation ? styles.stepCurrent : ''}`}
                aria-current={index === step && !isConfirmation ? 'step' : undefined}
              >
                <span className={styles.stepBar} aria-hidden="true">
                  <span />
                </span>
                <span className={styles.stepLabel}>{label}</span>
              </li>
            ))}
          </ol>
          {!isConfirmation && (
            <p className={styles.stepCount}>
              {t('booking.stepOf', { current: step + 1, total: TOTAL_STEPS })} · {stepLabels[step]}
            </p>
          )}
        </div>

        <p className={styles.banner} id="booking-disclaimer">
          <Info size={16} strokeWidth={1.7} aria-hidden="true" />
          <span>{t('booking.disclaimer')}</span>
        </p>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'contents' }}>
          <div className={styles.body}>
            {Object.keys(errors).length > 0 && (
              <p className={`${styles.error} ${styles.errorTop}`} role="alert">
                <AlertCircle size={15} strokeWidth={1.7} aria-hidden="true" />
                {t('booking.errors.summary')}
              </p>
            )}

            {/* ---------- step 1: service ---------- */}
            {step === 0 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend} tabIndex={-1} ref={headingRef}>
                  {t('booking.service.title')}
                </legend>
                <p className={styles.help}>{t('booking.service.help')}</p>

                <div className={styles.catRow} role="group" aria-label={t('services.filterLabel')}>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`${styles.catChip} ${
                        filter === category.id ? styles.catChipOn : ''
                      }`}
                      onClick={() => setFilter(category.id)}
                      aria-pressed={filter === category.id}
                    >
                      {pick(category)}
                    </button>
                  ))}
                </div>

                <div className={styles.optionList}>
                  {filtered.map((item) => (
                    <label
                      key={item.id}
                      className={`${styles.option} ${serviceId === item.id ? styles.optionOn : ''}`}
                    >
                      <input
                        type="radio"
                        name="booking-service"
                        value={item.id}
                        checked={serviceId === item.id}
                        onChange={() => chooseService(item.id)}
                      />
                      <span className={styles.mark} aria-hidden="true" />
                      <span className={styles.optionMain}>
                        <span className={styles.optionName}>{pick(item.name)}</span>
                        <span className={styles.optionMeta}>{pick(item.duration)}</span>
                      </span>
                      <span className={styles.optionPrice}>${item.price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* ---------- step 2: artist ---------- */}
            {step === 1 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend} tabIndex={-1} ref={headingRef}>
                  {t('booking.artist.title')}
                </legend>
                <p className={styles.help}>{t('booking.artist.help')}</p>

                <div className={styles.optionList}>
                  {team.map((member) => {
                    const offers = !service || service.artists.includes(member.id)
                    return (
                      <label
                        key={member.id}
                        className={`${styles.option} ${styles.artistOption} ${
                          artistId === member.id ? styles.optionOn : ''
                        } ${offers ? '' : styles.optionDisabled}`}
                      >
                        <input
                          type="radio"
                          name="booking-artist"
                          value={member.id}
                          checked={artistId === member.id}
                          disabled={!offers}
                          onChange={() => chooseArtist(member.id)}
                        />
                        <span className={styles.mark} aria-hidden="true" />
                        <img className={styles.avatar} src={member.photo} alt="" aria-hidden="true" />
                        <span className={styles.optionMain}>
                          <span className={styles.optionName}>{member.name}</span>
                          <span className={styles.optionMeta}>
                            {offers ? pick(member.focus) : t('booking.artist.unavailable')}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            )}

            {/* ---------- step 3: date ---------- */}
            {step === 2 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend} tabIndex={-1} ref={headingRef}>
                  {t('booking.date.title')}
                </legend>
                <p className={styles.help}>{t('booking.date.help')}</p>

                {dates.length === 0 ? (
                  <p className={styles.help}>{t('booking.date.none')}</p>
                ) : (
                  <div className={`${styles.optionGrid}`}>
                    {dates.map((date) => {
                      const iso = toISO(date)
                      return (
                        <label
                          key={iso}
                          className={`${styles.option} ${styles.chipOption} ${
                            dateISO === iso ? styles.optionOn : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="booking-date"
                            value={iso}
                            checked={dateISO === iso}
                            onChange={() => {
                              setDateISO(iso)
                              setErrors({})
                            }}
                          />
                          <span className={styles.mark} aria-hidden="true" />
                          <span className={styles.chipDow}>{dateFormatter.dow.format(date)}</span>
                          <span className={styles.chipDay}>{dateFormatter.day.format(date)}</span>
                          <span className={styles.chipMonth}>{dateFormatter.month.format(date)}</span>
                        </label>
                      )
                    })}
                  </div>
                )}

                {artist?.availability?.note && (
                  <p className={styles.noteLine}>
                    <CalendarDays size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{pick(artist.availability.note)}</span>
                  </p>
                )}
              </fieldset>
            )}

            {/* ---------- step 4: time ---------- */}
            {step === 3 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend} tabIndex={-1} ref={headingRef}>
                  {t('booking.time.title')}
                </legend>
                <p className={styles.help}>{t('booking.time.help')}</p>

                <div className={`${styles.optionGrid} ${styles.timeGrid}`}>
                  {SAMPLE_TIMES.map((slot) => (
                    <label
                      key={slot}
                      className={`${styles.option} ${styles.chipOption} ${
                        time === slot ? styles.optionOn : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="booking-time"
                        value={slot}
                        checked={time === slot}
                        onChange={() => {
                          setTime(slot)
                          setErrors({})
                        }}
                      />
                      <span className={styles.mark} aria-hidden="true" />
                      <span className={styles.chipTime}>{formatTime(slot)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* ---------- step 5: details ---------- */}
            {step === 4 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend} tabIndex={-1} ref={headingRef}>
                  {t('booking.details.title')}
                </legend>
                <p className={styles.help}>{t('booking.details.help')}</p>

                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="bk-name">
                      {t('booking.details.name')}
                    </label>
                    <input
                      className={styles.input}
                      id="bk-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t('booking.details.namePlaceholder')}
                      value={details.name}
                      onChange={(event) => setDetails({ ...details, name: event.target.value })}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'bk-name-error' : undefined}
                    />
                    {errors.name && (
                      <p className={styles.error} id="bk-name-error">
                        <AlertCircle size={14} strokeWidth={1.7} aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="bk-phone">
                        {t('booking.details.phone')}
                      </label>
                      <input
                        className={styles.input}
                        id="bk-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={t('booking.details.phonePlaceholder')}
                        value={details.phone}
                        onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                        aria-invalid={errors.phone || errors.contact ? 'true' : undefined}
                        aria-describedby="bk-contact-hint"
                      />
                      {errors.phone && (
                        <p className={styles.error}>
                          <AlertCircle size={14} strokeWidth={1.7} aria-hidden="true" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="bk-email">
                        {t('booking.details.email')}
                      </label>
                      <input
                        className={styles.input}
                        id="bk-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t('booking.details.emailPlaceholder')}
                        value={details.email}
                        onChange={(event) => setDetails({ ...details, email: event.target.value })}
                        aria-invalid={errors.email || errors.contact ? 'true' : undefined}
                        aria-describedby="bk-contact-hint"
                      />
                      {errors.email && (
                        <p className={styles.error}>
                          <AlertCircle size={14} strokeWidth={1.7} aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className={styles.help} id="bk-contact-hint" style={{ margin: 0 }}>
                    {t('booking.details.contactHint')}
                  </p>
                  {errors.contact && (
                    <p className={styles.error}>
                      <AlertCircle size={14} strokeWidth={1.7} aria-hidden="true" />
                      {errors.contact}
                    </p>
                  )}

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="bk-notes">
                      {t('booking.details.notes')} <span>({t('booking.details.optional')})</span>
                    </label>
                    <textarea
                      className={styles.textarea}
                      id="bk-notes"
                      name="notes"
                      rows={3}
                      placeholder={t('booking.details.notesPlaceholder')}
                      value={details.notes}
                      onChange={(event) => setDetails({ ...details, notes: event.target.value })}
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* ---------- confirmation ---------- */}
            {isConfirmation && (
              <div>
                <div className={styles.confirmHead}>
                  <span className={styles.confirmIcon} aria-hidden="true">
                    <CheckCircle2 size={26} strokeWidth={1.5} />
                  </span>
                  <h3 className={styles.confirmTitle} tabIndex={-1} ref={headingRef}>
                    {t('booking.summary.title')}
                  </h3>
                  <p className={styles.confirmLead}>{t('booking.summary.lead')}</p>
                </div>

                <dl className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <dt className={styles.summaryKey}>{t('booking.summary.service')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      {service ? pick(service.name) : ''}
                      <br />
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                        {service ? pick(service.duration) : ''}
                      </span>
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt className={styles.summaryKey}>{t('booking.summary.artist')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      {artist ? artist.name : ''}
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt className={styles.summaryKey}>{t('booking.summary.when')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      {selectedDate ? dateFormatter.full.format(selectedDate) : ''}
                      {time ? `, ${formatTime(time)}` : ''}
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt className={styles.summaryKey}>{t('booking.summary.who')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      {details.name}
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt className={styles.summaryKey}>{t('booking.summary.contact')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      {[details.phone, details.email].filter(Boolean).join(' · ')}
                    </dd>
                  </div>
                  {details.notes.trim() !== '' && (
                    <div className={styles.summaryRow}>
                      <dt className={styles.summaryKey}>{t('booking.summary.notes')}</dt>
                      <dd className={styles.summaryValue} style={{ margin: 0 }}>
                        {details.notes}
                      </dd>
                    </div>
                  )}
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <dt className={styles.summaryKey}>{t('booking.summary.total')}</dt>
                    <dd className={styles.summaryValue} style={{ margin: 0 }}>
                      ${service ? service.price : 0}
                    </dd>
                  </div>
                </dl>

                <p className={styles.demoCallout}>
                  <AlertCircle size={16} strokeWidth={1.7} aria-hidden="true" />
                  <span>{t('booking.disclaimer')}</span>
                </p>

                <div className={styles.realBooking}>
                  <p className={styles.realTitle}>{t('booking.summary.realBooking')}</p>
                  <p className={styles.realCopy}>{t('booking.summary.realBookingCopy')}</p>
                  <div className={styles.realActions}>
                    <a className="btn btn--sm" href={business.phoneHref}>
                      <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                      {t('booking.summary.callCta')}
                    </a>
                    <a className="btn btn--sm btn--ghost" href={business.emailHref}>
                      <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
                      {t('booking.summary.emailCta')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.foot}>
            {isConfirmation ? (
              <>
                <button type="button" className="btn btn--sm btn--ghost" onClick={resetAll}>
                  <RotateCcw size={15} strokeWidth={1.7} aria-hidden="true" />
                  {t('booking.reset')}
                </button>
                <span className={styles.footSpacer} />
                <button type="button" className="btn btn--sm" onClick={closeBooking}>
                  {t('booking.close')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn--sm btn--ghost"
                  onClick={back}
                  disabled={step === 0}
                  style={step === 0 ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
                >
                  <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
                  {t('booking.back')}
                </button>
                <span className={styles.selected}>{summaryLine}</span>
                <button type="submit" className="btn btn--sm">
                  {step === TOTAL_STEPS - 1 ? t('booking.confirm') : t('booking.next')}
                  <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
