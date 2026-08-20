import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { MappingArt, DesignArt, LashDivider } from './Ornaments.jsx'
import Reveal from './Reveal.jsx'
import styles from './Experience.module.css'

/** The four visuals, in step order. Nothing here is presented as a client result. */
function StepVisual({ index, caption }) {
  if (index === 0) {
    return (
      <>
        <div className={`${styles.skin} ${styles.skinBlush}`}>
          <MappingArt className={styles.skinArt} />
        </div>
        <p className={styles.caption}>{caption}</p>
      </>
    )
  }
  if (index === 1) {
    return (
      <>
        <div className={`${styles.skin} ${styles.skinRose}`}>
          <DesignArt className={styles.skinArt} />
        </div>
        <p className={styles.caption}>{caption}</p>
      </>
    )
  }
  if (index === 2) {
    return (
      <>
        <div className={styles.skin}>
          <img
            src="images/studio-detail.jpg"
            alt="Isabel Castro holding a gold brow mapping tool in the studio"
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className={styles.caption}>{caption}</p>
      </>
    )
  }
  // The closing panel is the brand plate. Its line lives in the caption below,
  // so it is not repeated inside the artwork.
  return (
    <>
      <div className={`${styles.skin} ${styles.skinDeep}`}>
        <div className={styles.deepInner}>
          <img
            src="images/logo-lockup-light.png"
            alt=""
            aria-hidden="true"
            width="720"
            height="304"
            loading="lazy"
          />
          <LashDivider className={styles.deepLine} />
        </div>
      </div>
      <p className={styles.caption}>{caption}</p>
    </>
  )
}

export default function Experience() {
  const { t } = useLang()
  const { openBooking } = useBooking()
  const steps = t('experience.steps')

  const listRef = useRef(null)
  const stepRefs = useRef([])
  const fillRef = useRef(null)
  const [active, setActive] = useState(0)

  // One scroll pass drives both the active step and the progress line.
  useEffect(() => {
    const list = listRef.current
    if (!list) return undefined

    let frame = 0
    const measure = () => {
      frame = 0
      const middle = window.innerHeight * 0.5
      const nodes = stepRefs.current.filter(Boolean)
      if (!nodes.length) return

      let nearest = 0
      let best = Infinity
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - middle)
        if (distance < best) {
          best = distance
          nearest = index
        }
      })
      setActive(nearest)

      const rect = list.getBoundingClientRect()
      const travelled = middle - rect.top
      const ratio = Math.max(0, Math.min(1, travelled / Math.max(rect.height, 1)))
      if (fillRef.current) fillRef.current.style.height = `${(ratio * 100).toFixed(2)}%`
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [steps.length])

  return (
    <section
      className={`section on-dark ${styles.section}`}
      id="experiencia"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">{t('experience.eyebrow')}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className={styles.title} id="experience-title">
              {t('experience.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.headLead}>{t('experience.lead')}</p>
          </Reveal>
        </div>

        <div className={styles.body}>
          <div className={styles.visualCol} aria-hidden="true">
            <div className={styles.sticky}>
              <div className={styles.stack}>
                {steps.map((step, index) => (
                  <div
                    key={step.n}
                    className={`${styles.panel} ${active === index ? styles.panelOn : ''}`}
                  >
                    <StepVisual index={index} caption={step.caption} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.stepsWrap} ref={listRef}>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.railFill} ref={fillRef} />
            </div>
            <p className="sr-only">{t('experience.progress')}</p>

            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li
                  key={step.n}
                  className={`${styles.step} ${active === index ? styles.stepOn : ''}`}
                  ref={(node) => {
                    stepRefs.current[index] = node
                  }}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.mobileVisual}>
                    <StepVisual index={index} caption={step.caption} />
                  </div>
                  <p className={styles.num}>{step.n}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepCopy}>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.cta}>
          <button type="button" className="btn btn--onDark" onClick={() => openBooking()}>
            {t('experience.cta')}
          </button>
        </div>
      </div>
    </section>
  )
}
