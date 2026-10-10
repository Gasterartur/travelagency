import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import Button from './Button.jsx'
import { CalendarIcon, GlobeIcon, PinIcon, SearchIcon, UsersIcon } from './Icons.jsx'
import { citiesOf, sortedCountries } from '../utils/countries.js'
import styles from './Hero.module.css'

const TODAY = new Date().toISOString().slice(0, 10)

// AI-generated photos from src/assets/Foto/hero – Vite bundles them, order = file name
const SLIDES = Object.values(import.meta.glob('../assets/Foto/hero/*.jpg', { eager: true, import: 'default' }))
const SLIDE_MS = 3000

// Background slideshow: images are stacked and cross-faded via opacity.
// Only slides up to one ahead of the furthest shown are rendered, so the
// page doesn't download all photos at once.
function HeroSlides() {
  const [active, setActive] = useState(0)
  const [reached, setReached] = useState(1)

  const go = (i) => {
    setActive(i)
    setReached((r) => Math.max(r, i + 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => go((active + 1) % SLIDES.length), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <>
      <div className={styles.slides} aria-hidden="true">
        {SLIDES.map((src, i) =>
          i <= reached ? (
            <img
              key={src}
              src={src}
              alt=""
              className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
            />
          ) : null,
        )}
      </div>
      <div className={styles.dots}>
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => go(i)}
            aria-label={`${i + 1} / ${SLIDES.length}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </>
  )
}

export default function Hero({ onSearch }) {
  const { t, lang } = useLanguage()
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState(2)

  const submit = (e) => {
    e.preventDefault()
    onSearch({ country, city, date: when, guests })
  }

  const selectCountry = (code) => {
    setCountry(code)
    setCity('')
  }

  return (
    <section id="top" className={styles.hero}>
      <HeroSlides />
      <span className={styles.aiLabel}>{t.hero.aiLabel}</span>
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>

        <form className={styles.search} onSubmit={submit} role="search">
          <label className={`${styles.field} ${styles.country}`}>
            <span className={styles.label}>
              <GlobeIcon size={16} /> {t.hero.country}
            </span>
            <select className={styles.input} value={country} onChange={(e) => selectCountry(e.target.value)}>
              <option value="">{t.hero.anyCountry}</option>
              {sortedCountries(lang).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className={`${styles.field} ${styles.city}`}>
            <span className={styles.label}>
              <PinIcon size={16} /> {t.hero.city}
            </span>
            <select className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} disabled={!country}>
              <option value="">{country ? t.hero.anyCity : t.hero.chooseCountryFirst}</option>
              {citiesOf(country).map((c) => (
                <option key={c.id} value={c.id}>
                  {c[lang]}
                </option>
              ))}
            </select>
          </label>
          <label className={`${styles.field} ${styles.date}`}>
            <span className={styles.label}>
              <CalendarIcon size={16} /> {t.hero.when}
            </span>
            <input
              className={styles.input}
              type="date"
              min={TODAY}
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            />
          </label>
          <label className={`${styles.field} ${styles.guests}`}>
            <span className={styles.label}>
              <UsersIcon size={16} /> {t.hero.guests}
            </span>
            <select className={styles.input} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" size="lg" className={styles.submit}>
            <SearchIcon size={18} /> {t.hero.search}
          </Button>
        </form>
      </div>
    </section>
  )
}
