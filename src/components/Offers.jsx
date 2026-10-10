import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { CATEGORIES, offers } from '../data/offers.js'
import SectionHeader from './SectionHeader.jsx'
import OfferCard from './OfferCard.jsx'
import Button from './Button.jsx'
import { CloseIcon, HeartIcon, SearchIcon } from './Icons.jsx'
import styles from './Offers.module.css'

const PAGE_SIZE = 8

const SORTERS = {
  popular: (a, b) => b.popularity - a.popularity,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
}

const normalize = (s) =>
  s
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

// Match the query against every language so a German search also works on the RU page and vice versa.
const matches = (offer, query) => {
  if (!query) return true
  const q = normalize(query)
  return [...Object.values(offer.title), ...Object.values(offer.location)].some((text) => normalize(text).includes(q))
}

export default function Offers({ query, onClearQuery, favorites, onToggleFavorite, onRequest }) {
  const { t } = useLanguage()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(
    () =>
      offers
        .filter(
          (o) => category === 'all' || (category === 'favorites' ? favorites.includes(o.id) : o.category === category),
        )
        .filter((o) => matches(o, query))
        .sort(SORTERS[sort]),
    [category, sort, query, favorites],
  )

  const selectCategory = (c) => {
    setCategory(c)
    setVisible(PAGE_SIZE)
  }

  const reset = () => {
    selectCategory('all')
    onClearQuery()
  }

  const chips = ['all', ...CATEGORIES]

  return (
    <section id="offers" className={styles.section}>
      <div className="container">
        <SectionHeader eyebrow={t.offers.eyebrow} title={t.offers.title} text={t.offers.text} />

        <div className={styles.toolbar}>
          <div className={styles.chips} role="tablist" aria-label={t.offers.eyebrow}>
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
                onClick={() => selectCategory(c)}
              >
                {c === 'all' ? t.offers.all : t.offers.categories[c]}
              </button>
            ))}
            <button
              type="button"
              role="tab"
              aria-selected={category === 'favorites'}
              className={`${styles.chip} ${category === 'favorites' ? styles.chipActive : ''}`}
              onClick={() => selectCategory('favorites')}
            >
              <HeartIcon size={14} filled={category === 'favorites'} /> {t.offers.favorites}
              {favorites.length > 0 && <span className={styles.count}>{favorites.length}</span>}
            </button>
          </div>

          <div className={styles.controls}>
            <span className={styles.results} aria-live="polite">
              {t.offers.results(filtered.length)}
            </span>
            <label className={styles.sort}>
              <span className="visually-hidden">{t.offers.sort}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={styles.select}>
                {Object.keys(SORTERS).map((key) => (
                  <option key={key} value={key}>
                    {t.offers.sortOptions[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {query && (
          <div className={styles.activeSearch}>
            <SearchIcon size={14} />
            <span>
              {t.offers.searchFor}: <strong>{query}</strong>
            </span>
            <button type="button" onClick={onClearQuery} aria-label={t.offers.clearSearch} className={styles.clear}>
              <CloseIcon size={14} />
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <>
            <ul className={styles.grid}>
              {filtered.slice(0, visible).map((offer) => (
                <li key={offer.id}>
                  <OfferCard
                    offer={offer}
                    isFavorite={favorites.includes(offer.id)}
                    onToggleFavorite={onToggleFavorite}
                    onRequest={onRequest}
                  />
                </li>
              ))}
            </ul>
            {visible < filtered.length && (
              <div className={styles.more}>
                <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  {t.offers.showMore} ({filtered.length - visible})
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty}>
            <p>{t.offers.empty}</p>
            <Button variant="secondary" onClick={reset}>
              {t.offers.reset}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
