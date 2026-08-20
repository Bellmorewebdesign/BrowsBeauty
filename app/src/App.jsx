import { useLang } from './context/LanguageContext.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Experience from './components/Experience.jsx'
import About from './components/About.jsx'
import Team from './components/Team.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BookingDemo from './components/BookingDemo.jsx'

export default function App() {
  const { t, fading } = useLang()

  return (
    <div className="lang-fade" data-fading={fading ? 'true' : 'false'}>
      <a className="skip-link" href="#contenido">
        {t('nav.skip')}
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Experience />
        <About />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BookingDemo />
    </div>
  )
}
