import { useLanguage } from '../i18n/useLanguage.js'
import SectionHeader from './SectionHeader.jsx'
import { BadgeIcon, HeadsetIcon, ShieldIcon, UserIcon } from './Icons.jsx'
import styles from './WhyUs.module.css'

const ICONS = [UserIcon, BadgeIcon, ShieldIcon, HeadsetIcon]

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section id="why" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.media}>
          <img src="/images/travel3.jpg" alt="" loading="lazy" decoding="async" className={styles.image} />
          <img src="/images/alps.jpg" alt="" loading="lazy" decoding="async" className={styles.imageSmall} />
        </div>

        <div>
          <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} text={t.why.text} />
          <ul className={styles.list}>
            {t.why.items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <li key={item.title} className={styles.item}>
                  <span className={styles.icon}>
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
