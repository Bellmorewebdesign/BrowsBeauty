import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles are imported before any component so that they land first in
// the bundled stylesheet and CSS module rules reliably win over the shared
// `.btn` and layout helpers they are meant to refine.
import './styles/global.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'

// Turning animation on happens here, before the first paint, so nothing on the
// page is ever hidden waiting for JavaScript, and so a visitor who asks for
// reduced motion simply never gets the reveal styles at all.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.dataset.anim = 'on'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </LanguageProvider>
  </StrictMode>,
)
