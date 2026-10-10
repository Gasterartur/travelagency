import styles from './SectionHeader.module.css'

export default function SectionHeader({ eyebrow, title, text, align = 'left', children }) {
  return (
    <div className={`${styles.head} ${align === 'center' ? styles.center : ''}`}>
      <div className={styles.copy}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      {children}
    </div>
  )
}
