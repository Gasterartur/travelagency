import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import { offers } from '../data/offers.js'
import { offerDetails } from '../data/offerDetails.js'
import { formatPrice } from '../utils/format.js'
import Button from '../components/Button.jsx'
import OfferCard from '../components/OfferCard.jsx'
import { ArrowRightIcon, CheckIcon, ForkIcon, HeartIcon, MoonIcon, PinIcon, PlaneIcon } from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'
import styles from './OfferPage.module.css'

const SIMILAR_COUNT = 3

// Same category first, then fill up with the most popular remaining offers.
function similarOffers(offer) {
  const others = offers.filter((o) => o.id !== offer.id).sort((a, b) => b.popularity - a.popularity)
  const same = others.filter((o) => o.category === offer.category)
  const rest = others.filter((o) => o.category !== offer.category)
  return [...same, ...rest].slice(0, SIMILAR_COUNT)
}

export default function OfferPage({ favorites, onToggleFavorite, onRequest }) {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const offer = offers.find((o) => o.id === id)
  const details = offerDetails[id]

  useEffect(() => {
    if (!offer) return
    const previous = document.title
    document.title = `${offer.title[lang]} – Fernweh24`
    return () => {
      document.title = previous
    }
  }, [offer, lang])

  // Lets fixed elements (scroll-to-top button, footer) make room for the mobile booking bar
  useEffect(() => {
    if (!offer) return
    document.body.classList.add('has-bottom-bar')
    return () => document.body.classList.remove('has-bottom-bar')
  }, [offer])

  if (!offer || !details) return <NotFound />

  const isFavorite = favorites.includes(offer.id)
  const discount = offer.oldPrice ? Math.round((1 - offer.price / offer.oldPrice) * 100) : 0
  const d = t.detail

  const included = [
    d.flight,
    d.transfer,
    d.stay(offer.nights),
    t.offers.board[offer.board],
    ...(details.extras ? [details.extras[lang]] : []),
    d.security,
  ]

  const facts = [
    { icon: MoonIcon, label: d.duration, value: `${offer.nights} ${t.offers.nights}` },
    { icon: ForkIcon, label: d.board, value: t.offers.board[offer.board] },
    { icon: PlaneIcon, label: d.type, value: t.offers.categories[offer.category] },
  ]

  const favoriteButton = (
    <button
      type="button"
      className={`${styles.fav} ${isFavorite ? styles.favActive : ''}`}
      onClick={() => onToggleFavorite(offer.id)}
      aria-pressed={isFavorite}
    >
      <HeartIcon size={18} filled={isFavorite} />
      {isFavorite ? t.offers.unfavorite : t.offers.favorite}
    </button>
  )

  return (
    <article className={styles.page}>
      <div className="container">
        <Link to="/#offers" className={styles.back}>
          <ArrowRightIcon size={16} className={styles.backIcon} /> {d.back}
        </Link>

        <header className={styles.head}>
          <div className={styles.headText}>
            <span className={styles.location}>
              <PinIcon size={16} /> {offer.location[lang]}
            </span>
            <h1 className={styles.title}>{offer.title[lang]}</h1>
          </div>
        </header>

        <div className={styles.media}>
          <img src={offer.image} alt={offer.title[lang]} className={styles.image} fetchPriority="high" />
          <span className={styles.category}>{t.offers.categories[offer.category]}</span>
          {discount > 0 && <span className={styles.discount}>−{discount}%</span>}
        </div>

        <div className={styles.layout}>
          <div className={styles.content}>
            <ul className={styles.facts}>
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className={styles.fact}>
                  <span className={styles.factIcon}>
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factValue}>{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>{d.about}</h2>
              <p className={styles.description}>{details.description[lang]}</p>
            </section>

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>{d.highlights}</h2>
              <ul className={styles.highlights}>
                {details.highlights[lang].map((h) => (
                  <li key={h}>
                    <span className={styles.checkIcon}>
                      <CheckIcon size={16} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>{d.included}</h2>
              <ul className={styles.included}>
                {included.map((item) => (
                  <li key={item}>
                    <CheckIcon size={16} className={styles.includedIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className={styles.booking}>
            <div className={styles.bookingCard}>
              {offer.oldPrice && <s className={styles.oldPrice}>{formatPrice(offer.oldPrice, lang)}</s>}
              <div className={styles.price}>
                <small>{t.offers.from}</small> {formatPrice(offer.price, lang)}
              </div>
              <p className={styles.priceNote}>{d.priceNote}</p>
              <Button size="lg" block onClick={() => onRequest(offer)}>
                {t.offers.request}
              </Button>
              {favoriteButton}
              <p className={styles.noObligation}>{d.noObligation}</p>
            </div>
          </aside>
        </div>

        <section className={styles.similar}>
          <h2 className={styles.similarTitle}>{d.similar}</h2>
          <ul className={styles.similarGrid}>
            {similarOffers(offer).map((o) => (
              <li key={o.id}>
                <OfferCard
                  offer={o}
                  isFavorite={favorites.includes(o.id)}
                  onToggleFavorite={onToggleFavorite}
                  onRequest={onRequest}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Mobile: price + CTA always reachable at the bottom of the screen */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomPrice}>
          <small>
            {t.offers.from} · {t.offers.perPerson}
          </small>
          <strong>{formatPrice(offer.price, lang)}</strong>
        </div>
        <Button onClick={() => onRequest(offer)}>{t.offers.request}</Button>
      </div>
    </article>
  )
}
