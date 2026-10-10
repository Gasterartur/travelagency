import { useLanguage } from '../i18n/useLanguage.js'
import { destinations } from '../data/offers.js'
import SectionHeader from './SectionHeader.jsx'
import { ArrowRightIcon } from './Icons.jsx'
import { formatPrice } from '../utils/format.js'
import styles from './Destinations.module.css'

export default function Destinations({ onSelect }) {
  const { t, lang } = useLanguage()

  return (
    <section id="destinations" className={styles.section}>
      <div className="container">
        <SectionHeader eyebrow={t.destinations.eyebrow} title={t.destinations.title} text={t.destinations.text} />

        <ul className={styles.grid}>
          {destinations.map((d, i) => (
            <li key={d.id} className={i === 0 ? styles.featured : undefined}>
              <button type="button" className={styles.card} onClick={() => onSelect(d.query[lang])}>
                <img src={d.image} alt="" loading="lazy" decoding="async" className={styles.image} />
                <span className={styles.shade} />
                <span className={styles.body}>
                  <span className={styles.name}>{d.name[lang]}</span>
                  <span className={styles.price}>
                    {t.destinations.from} {formatPrice(d.price, lang)}
                  </span>
                  <span className={styles.more}>
                    {t.destinations.show} <ArrowRightIcon size={16} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
