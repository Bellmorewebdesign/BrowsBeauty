import { cloneElement } from 'react'
import { useReveal } from '../hooks/useReveal.js'

/**
 * Wraps a single element and adds the shared reveal classes once it scrolls
 * into view. Falls back to plain visible markup when motion is off.
 */
export default function Reveal({ children, delay = 0, variant = 'rise', threshold, className = '' }) {
  const [ref, shown] = useReveal(threshold ? { threshold } : undefined)
  const classes = [
    'reveal',
    variant === 'mask' ? 'reveal--mask' : '',
    shown ? 'is-in' : '',
    children.props.className || '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return cloneElement(children, {
    ref,
    className: classes,
    style: { ...(children.props.style || {}), '--reveal-delay': `${delay}ms` },
  })
}
