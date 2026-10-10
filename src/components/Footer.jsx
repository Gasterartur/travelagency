import { useLanguage } from '../i18n/useLanguage.js'
import { PlaneIcon } from './Icons.jsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  const columns = [
    { title: f.company, links: [f.about, f.careers, f.press] },
    { title: f.help, links: [f.faq, f.insurance, f.visa] },
    { title: f.legal, links: [f.imprint, f.privacy, f.terms] },
  ]

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark}>
              <PlaneIcon size={16} />
            </span>
            Fernweh24
          </a>
          <p className={styles.tagline}>{f.tagline}</p>
          <address className={styles.address}>
            Musterstraße 24, 10115 Berlin
            <br />
            <a href="tel:+49301234567">+49 30 123 45 67</a>
            <br />
            <a href="mailto:info@fernweh24.de">info@fernweh24.de</a>
          </address>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <h3 className={styles.colTitle}>{col.title}</h3>
            <ul>
              {col.links.map((label) => (
                <li key={label}>
                  <a href="#top">{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {YEAR} Fernweh24. {f.rights}
        </span>
        <a href="https://unsplash.com" target="_blank" rel="noreferrer">
          {f.photos}
        </a>
      </div>
    </footer>
  )
}
