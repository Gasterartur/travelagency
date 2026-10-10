import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { CATEGORIES, offers } from '../data/offers.js'
import SectionHeader from './SectionHeader.jsx'
import OfferCard from './OfferCard.jsx'
import Button from './Button.jsx'
import { CloseIcon, HeartIcon, SearchIcon } from './Icons.jsx'
import { countryName, findCity } from '../utils/countries.js'
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

// Country filters by ISO code. A city narrows further only if an offer title mentions it (in any
// language); otherwise all offers of the country are kept and `cityMiss` lets the UI explain that.
function applySearch(list, { country, city }) {
  if (!country) return { list, cityMiss: false }
  const inCountry = list.filter((o) => o.country === country)
  const c = city && findCity(country, city)
  if (!c) return { list: inCountry, cityMiss: false }
  const names = [c.de, c.ru].map((n) => normalize(n.split(' (')[0]))
  const inCity = inCountry.filter((o) =>
    Object.values(o.title).some((title) => names.some((n) => normalize(title).includes(n))),
  )
  return inCity.length ? { list: inCity, cityMiss: false } : { list: inCountry, cityMiss: true }
}

export default function Offers({ search, onClearSearch, favorites, onToggleFavorite, onRequest }) {
  const { t, lang } = useLanguage()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const searched = useMemo(() => applySearch(offers, search), [search])

  const filtered = useMemo(
    () =>
      searched.list
        .filter(
          (o) => category === 'all' || (category === 'favorites' ? favorites.includes(o.id) : o.category === category),
        )
        .sort(SORTERS[sort]),
    [category, sort, searched, favorites],
  )

  const selectCategory = (c) => {
    setCategory(c)
    setVisible(PAGE_SIZE)
  }

  const reset = () => {
    selectCategory('all')
    onClearSearch()
  }

  const city = search.country && search.city ? findCity(search.country, search.city) : null
  const searchLabel = search.country
    ? [countryName(search.country, lang), city?.[lang]].filter(Boolean).join(' · ')
    : ''

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

        {searchLabel && (
          <div className={styles.activeSearch}>
            <SearchIcon size={14} />
            <span>
              {t.offers.searchFor}: <strong>{searchLabel}</strong>
            </span>
            <button type="button" onClick={onClearSearch} aria-label={t.offers.clearSearch} className={styles.clear}>
              <CloseIcon size={14} />
            </button>
          </div>
        )}

        {searched.cityMiss && filtered.length > 0 && (
          <p className={styles.hint}>{t.offers.cityFallback(city[lang], countryName(search.country, lang))}</p>
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
