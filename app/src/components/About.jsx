import { Ruler, CalendarClock, Languages, Sparkle } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { LashDivider } from './Ornaments.jsx'
import Reveal from './Reveal.jsx'
import styles from './About.module.css'

const ICONS = [Ruler, CalendarClock, Languages, Sparkle]

export default function About() {
  const { t } = useLang()
  const pillars = t('about.pillars')

  return (
    <section className={`section ${styles.section}`} id="estudio" aria-labelledby="about-title">
      <div className={`shell ${styles.grid}`}>
        <div>
          <Reveal>
            <p className="eyebrow">{t('about.eyebrow')}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className={styles.title} id="about-title">
              {t('about.title')}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className={styles.quoteWrap}>
              <LashDivider className={styles.divider} />
              <p className={styles.quote}>{t('about.quote')}</p>
            </div>
          </Reveal>
          <img
            className={styles.mark}
            src="images/logo-mark.png"
            alt=""
            aria-hidden="true"
            width="360"
            height="360"
            loading="lazy"
          />
        </div>

        <div>
          <Reveal delay={80}>
            <div className={styles.copy}>
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>
          </Reveal>

          <div className={styles.pillars}>
            {pillars.map((pillar, index) => {
              const Icon = ICONS[index] ?? Sparkle
              return (
                <Reveal key={pillar.title} delay={140 + index * 70}>
                  <div className={styles.pillar}>
                    <Icon className={styles.pillarIcon} size={19} strokeWidth={1.5} aria-hidden="true" />
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
