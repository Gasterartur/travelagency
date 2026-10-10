import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import Button from './Button.jsx'
import { CheckIcon } from './Icons.jsx'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const { t } = useLanguage()
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // No backend yet – hook up a newsletter provider here.
    setDone(true)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.box}>
          <img src="/images/norway.jpg" alt="" loading="lazy" decoding="async" className={styles.bg} />
          <div className={styles.content}>
            <h2 className={styles.title}>{t.newsletter.title}</h2>
            <p className={styles.text}>{t.newsletter.text}</p>
            {done ? (
              <p className={styles.success} role="status">
                <CheckIcon size={18} /> {t.newsletter.success}
              </p>
            ) : (
              <form className={styles.form} onSubmit={submit}>
                <label className="visually-hidden" htmlFor="newsletter-email">
                  {t.newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t.newsletter.placeholder}
                  className={styles.input}
                />
                <Button type="submit" size="lg">
                  {t.newsletter.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
