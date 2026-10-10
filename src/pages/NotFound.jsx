import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import Button from '../components/Button.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <section className={`container ${styles.wrap}`}>
      <span className={styles.code}>404</span>
      <p className={styles.text}>{t.detail.notFound}</p>
      <Button as={Link} to="/">
        {t.detail.toHome}
      </Button>
    </section>
  )
}
