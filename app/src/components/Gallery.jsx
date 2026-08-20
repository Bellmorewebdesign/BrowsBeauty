import { Mail } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import { business } from '../data/business.js'
import { LashDivider } from './Ornaments.jsx'
import Reveal from './Reveal.jsx'
import styles from './Gallery.module.css'

// Only images the studio actually owns, each used once, and none of them
// presented as a treatment result. The third tile is a branded plate rather
// than a second crop of a portrait already shown above.
const TILES = [
  {
    id: 'laura',
    src: 'images/laura-portrait.jpg',
    w: 900,
    h: 1200,
    ratio: 'tall',
    caption: 'gallery.captions.laura',
  },
  {
    id: 'detail',
    src: 'images/studio-detail.jpg',
    w: 800,
    h: 1000,
    ratio: 'taller',
    caption: 'gallery.captions.detail',
  },
  { id: 'brand', ratio: 'tall', caption: 'gallery.captions.logo' },
]

export default function Gallery() {
  const { t } = useLang()

  return (
    <section className={`section ${styles.section}`} id="galeria" aria-labelledby="gallery-title">
      <div className="shell">
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="eyebrow">{t('gallery.eyebrow')}</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className={styles.title} id="gallery-title">
                {t('gallery.title')}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="lead">{t('gallery.lead')}</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {TILES.map((tile, index) => (
            <Reveal key={tile.id} delay={index * 110} variant="mask">
              <figure className={`${styles.tile} ${styles[tile.ratio]}`}>
                <span className="mask-inner">
                  {tile.src ? (
                    <img
                      src={tile.src}
                      alt={t(tile.caption)}
                      width={tile.w}
                      height={tile.h}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className={styles.brandTile}>
                      <img
                        src="images/logo-lockup-light.png"
                        alt=""
                        aria-hidden="true"
                        width="720"
                        height="304"
                        loading="lazy"
                      />
                      <LashDivider className={styles.brandLine} />
                      <span className={styles.brandQuote}>{t('about.quote')}</span>
                    </span>
                  )}
                  <span className={styles.cap}>{t(tile.caption)}</span>
                </span>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className={styles.note}>
            <img
              className={styles.noteMark}
              src="images/logo-mark.png"
              alt=""
              aria-hidden="true"
              width="360"
              height="360"
              loading="lazy"
            />
            <div>
              <h3 className={styles.noteTitle}>{t('gallery.note.title')}</h3>
              <p className={styles.noteCopy}>{t('gallery.note.copy')}</p>
            </div>
            <a className="btn btn--ghost" href={business.emailHref}>
              <Mail size={16} strokeWidth={1.6} aria-hidden="true" />
              {t('gallery.note.cta')}
            </a>
          </div>
        </Reveal>

        <p className={styles.disclaimer}>{t('gallery.disclaimer')}</p>
      </div>
    </section>
  )
}
