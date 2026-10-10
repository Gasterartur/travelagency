import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import Button from './Button.jsx'
import { CalendarIcon, PinIcon, SearchIcon, StarIcon, UsersIcon } from './Icons.jsx'
import styles from './Hero.module.css'

const TODAY = new Date().toISOString().slice(0, 10)

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
      <img className={styles.bg} src="/images/beach.jpg" alt="" fetchPriority="high" decoding="async" />
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <span className={styles.badge}>
          <StarIcon size={14} /> {t.hero.badge}
        </span>
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

        <dl className={styles.stats}>
          <div>
            <dt>{t.hero.stats[0]}</dt>
            <dd>120+</dd>
          </div>
          <div>
            <dt>{t.hero.stats[1]}</dt>
            <dd>15</dd>
          </div>
          <div>
            <dt>{t.hero.stats[2]}</dt>
            <dd>4,9 ★</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
