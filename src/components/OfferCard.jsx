import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import { formatPrice } from '../utils/format.js'
import Button from './Button.jsx'
import { ForkIcon, HeartIcon, MoonIcon, PinIcon } from './Icons.jsx'
import styles from './OfferCard.module.css'

export default function OfferCard({ offer, isFavorite, onToggleFavorite, onRequest }) {
  const { t, lang } = useLanguage()
  const discount = offer.oldPrice ? Math.round((1 - offer.price / offer.oldPrice) * 100) : 0

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={offer.image} alt={offer.title[lang]} loading="lazy" decoding="async" className={styles.image} />
        <span className={styles.category}>{t.offers.categories[offer.category]}</span>
        {discount > 0 && <span className={styles.discount}>−{discount}%</span>}
        <button
          type="button"
          className={`${styles.fav} ${isFavorite ? styles.favActive : ''}`}
          onClick={() => onToggleFavorite(offer.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? t.offers.unfavorite : t.offers.favorite}
        >
          <HeartIcon size={18} filled={isFavorite} />
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.location}>
            <PinIcon size={14} /> {offer.location[lang]}
          </span>
        </div>

        <h3 className={styles.title}>
          <Link to={`/angebot/${offer.id}`} className={styles.titleLink}>
            {offer.title[lang]}
          </Link>
        </h3>

        <ul className={styles.features}>
          <li>
            <MoonIcon size={14} /> {offer.nights} {t.offers.nights}
          </li>
          <li>
            <ForkIcon size={14} /> {t.offers.board[offer.board]}
          </li>
        </ul>

        <div className={styles.footer}>
          <div className={styles.priceBox}>
            {offer.oldPrice && <s className={styles.oldPrice}>{formatPrice(offer.oldPrice, lang)}</s>}
            <span className={styles.price}>
              <small>{t.offers.from}</small> {formatPrice(offer.price, lang)}
            </span>
            <span className={styles.perPerson}>{t.offers.perPerson}</span>
          </div>
          <Button size="sm" className={styles.action} onClick={() => onRequest(offer)}>
            {t.offers.request}
          </Button>
        </div>
      </div>
    </article>
  )
}
