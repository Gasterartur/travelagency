import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Destinations from './components/Destinations.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WhyUs from './components/WhyUs.jsx'
import Offers from './components/Offers.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import RequestModal from './components/RequestModal.jsx'
import ScrollTopButton from './components/ScrollTopButton.jsx'

const FAVORITES_KEY = 'fw24.favorites'

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const scrollToOffers = () => document.getElementById('offers')?.scrollIntoView()

export default function App() {
  const [query, setQuery] = useState('')
  const [tripDefaults, setTripDefaults] = useState({ date: '', guests: 2 })
  const [favorites, setFavorites] = useState(loadFavorites)
  const [requested, setRequested] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch {
      // ignore
    }
  }, [favorites])

  const handleSearch = ({ query, date, guests }) => {
    setQuery(query)
    setTripDefaults({ date, guests })
    scrollToOffers()
  }

  const handleDestination = (q) => {
    setQuery(q)
    scrollToOffers()
  }

  const toggleFavorite = (id) =>
    setFavorites((favs) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]))

  return (
    <>
      <Header />
      <main>
        <Hero onSearch={handleSearch} />
        <Destinations onSelect={handleDestination} />
        <HowItWorks />
        <WhyUs />
        <Offers
          query={query}
          onClearQuery={() => setQuery('')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRequest={setRequested}
        />
        <Newsletter />
      </main>
      <Footer />
      <ScrollTopButton />
      {requested && <RequestModal offer={requested} defaults={tripDefaults} onClose={() => setRequested(null)} />}
    </>
  )
}
