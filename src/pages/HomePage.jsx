import Hero from '../components/Hero.jsx'
import Destinations from '../components/Destinations.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Offers from '../components/Offers.jsx'
import Newsletter from '../components/Newsletter.jsx'

const scrollToOffers = () => document.getElementById('offers')?.scrollIntoView()

export default function HomePage({ query, setQuery, setTripDefaults, favorites, onToggleFavorite, onRequest }) {
  const handleSearch = ({ query, date, guests }) => {
    setQuery(query)
    setTripDefaults({ date, guests })
    scrollToOffers()
  }

  const handleDestination = (q) => {
    setQuery(q)
    scrollToOffers()
  }

  return (
    <>
      <Hero onSearch={handleSearch} />
      <Destinations onSelect={handleDestination} />
      <HowItWorks />
      <WhyUs />
      <Offers
        query={query}
        onClearQuery={() => setQuery('')}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onRequest={onRequest}
      />
      <Newsletter />
    </>
  )
}
