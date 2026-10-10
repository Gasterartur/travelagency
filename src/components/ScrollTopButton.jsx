import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { ArrowUpIcon } from './Icons.jsx'
import styles from './ScrollTopButton.module.css'

export default function ScrollTopButton() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t.toTop}
      title={t.toTop}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon size={20} />
    </button>
  )
}
