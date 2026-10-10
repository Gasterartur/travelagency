import Hero from '../components/Hero.jsx'
import Destinations from '../components/Destinations.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Offers from '../components/Offers.jsx'
import Newsletter from '../components/Newsletter.jsx'

const scrollToOffers = () => document.getElementById('offers')?.scrollIntoView()

export default function HomePage({ search, setSearch, setTripDefaults, favorites, onToggleFavorite, onRequest }) {
  const handleSearch = ({ country, city, date, guests }) => {
    setSearch({ country, city })
    setTripDefaults({ date, guests })
    scrollToOffers()
  }

  const handleDestination = (country) => {
    setSearch({ country, city: '' })
    scrollToOffers()
  }

  return (
    <>
      <Hero onSearch={handleSearch} />
      <Destinations onSelect={handleDestination} />
      <HowItWorks />
      <WhyUs />
      <Offers
        search={search}
        onClearSearch={() => setSearch({ country: '', city: '' })}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onRequest={onRequest}
      />
      <Newsletter />
    </>
  )
}
