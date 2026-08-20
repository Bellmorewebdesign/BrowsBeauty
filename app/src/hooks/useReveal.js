import { useEffect, useRef, useState } from 'react'

/**
 * Adds a one-way "is in view" flag using IntersectionObserver.
 * Content is visible in CSS by default; the reveal styles only apply when the
 * document carries `data-anim="on"`, which is set before first paint and only
 * when motion is allowed. Nothing is ever hidden behind JavaScript.
 */
export function useReveal({ threshold = 0.16, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    if (document.documentElement.dataset.anim !== 'on') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, shown]
}
