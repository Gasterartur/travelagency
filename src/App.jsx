import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RequestModal from './components/RequestModal.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import ScrollTopButton from './components/ScrollTopButton.jsx'
import HomePage from './pages/HomePage.jsx'
import OfferPage from './pages/OfferPage.jsx'
import NotFound from './pages/NotFound.jsx'

const FAVORITES_KEY = 'fw24.favorites'

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function App() {
  const [search, setSearch] = useState({ country: '', city: '' })
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

  const toggleFavorite = (id) =>
    setFavorites((favs) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]))

  const shared = { favorites, onToggleFavorite: toggleFavorite, onRequest: setRequested }

  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage search={search} setSearch={setSearch} setTripDefaults={setTripDefaults} {...shared} />}
          />
          <Route path="/angebot/:id" element={<OfferPage {...shared} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTopButton />
      {requested && <RequestModal offer={requested} defaults={tripDefaults} onClose={() => setRequested(null)} />}
    </>
  )
}
