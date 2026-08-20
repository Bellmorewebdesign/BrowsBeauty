import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const BookingContext = createContext(null)

/**
 * Holds only the open/closed state of the booking demo plus an optional
 * preselection, so a "Book" button anywhere on the page can open it.
 * No appointment data ever leaves this component tree.
 */
export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [seed, setSeed] = useState({ serviceId: null, artistId: null })
  const lastTrigger = useRef(null)

  const openBooking = useCallback((preset = {}) => {
    lastTrigger.current = document.activeElement
    setSeed({ serviceId: preset.serviceId ?? null, artistId: preset.artistId ?? null })
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => {
    setOpen(false)
    // Send keyboard focus back where it came from.
    const node = lastTrigger.current
    if (node && typeof node.focus === 'function') {
      window.setTimeout(() => node.focus(), 0)
    }
  }, [])

  const value = useMemo(
    () => ({ open, seed, openBooking, closeBooking }),
    [open, seed, openBooking, closeBooking],
  )
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
