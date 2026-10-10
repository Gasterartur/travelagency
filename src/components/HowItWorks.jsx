import { useLanguage } from '../i18n/useLanguage.js'
import SectionHeader from './SectionHeader.jsx'
import { ChatIcon, InboxIcon, PlaneIcon } from './Icons.jsx'
import styles from './HowItWorks.module.css'

const ICONS = [ChatIcon, InboxIcon, PlaneIcon]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section id="how" className={styles.section}>
      <div className="container">
        <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} align="center" />
        <ol className={styles.steps}>
          {t.how.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <li key={step.title} className={styles.step}>
                <span className={styles.icon}>
                  <Icon size={24} />
                </span>
                <span className={styles.number}>{i + 1}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
