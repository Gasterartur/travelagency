import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import Button from './Button.jsx'
import { CalendarIcon, PinIcon, SearchIcon, UsersIcon } from './Icons.jsx'
import styles from './Hero.module.css'

const TODAY = new Date().toISOString().slice(0, 10)

const SLIDES = ['sunset', 'lagoon', 'halong', 'lake', 'airport'].map((name) => `/images/hero/${name}.jpg`)
const SLIDE_MS = 3000

// Background slideshow: images are stacked and cross-faded via opacity.
function HeroSlides() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearInterval(timer)
  }, [active]) // restart the timer after a manual dot click

  return (
    <>
      <div className={styles.slides} aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
          />
        ))}
      </div>
      <div className={styles.dots}>
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`${i + 1} / ${SLIDES.length}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </>
  )
}

export default function Hero({ onSearch }) {
  const { t } = useLanguage()
  const [where, setWhere] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState(2)

  const submit = (e) => {
    e.preventDefault()
    onSearch({ query: where.trim(), date: when, guests })
  }

  return (
    <section id="top" className={styles.hero}>
      <HeroSlides />
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>

        <form className={styles.search} onSubmit={submit} role="search">
          <label className={styles.field}>
            <span className={styles.label}>
              <PinIcon size={16} /> {t.hero.where}
            </span>
            <input
              className={styles.input}
              type="search"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder={t.hero.wherePlaceholder}
              enterKeyHint="search"
            />
          </label>
          <label className={styles.field}>
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
