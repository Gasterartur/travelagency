import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import { useTheme } from '../hooks/useTheme.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import Button from './Button.jsx'
import { CloseIcon, MenuIcon, MoonIcon, PlaneIcon, SunIcon } from './Icons.jsx'
import styles from './Header.module.css'

const LINKS = ['destinations', 'how', 'why', 'offers', 'contact']

function LangSwitcher() {
  const { lang, langs, setLang } = useLanguage()
  return (
    <div className={styles.switcher} role="group" aria-label="Sprache / Язык">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          className={`${styles.option} ${l === lang ? styles.active : ''}`}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { t } = useLanguage()
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? t.theme.light : t.theme.dark
  return (
    <button type="button" className={styles.iconBtn} onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    // Close the drawer when the viewport grows to desktop size
    const mq = window.matchMedia('(min-width: 960px)')
    const onMq = (e) => e.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} onClick={close}>
            <span className={styles.logoMark}>
              <PlaneIcon size={18} />
            </span>
            Fernweh<span className={styles.logoAccent}>24</span>
          </Link>

          <nav className={styles.nav} aria-label="Hauptnavigation">
            {LINKS.map((key) => (
              <Link key={key} to={`/#${key}`} className={styles.link}>
                {t.nav[key]}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopOnly}>
              <LangSwitcher />
            </div>
            <ThemeToggle />
            <Button as={Link} to="/#contact" size="sm" className={styles.cta}>
              {t.nav.cta}
            </Button>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.burger}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} inert={!open}>
        <nav className={styles.drawerNav} aria-label="Mobile Navigation">
          {LINKS.map((key) => (
            <Link key={key} to={`/#${key}`} className={styles.drawerLink} onClick={close}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <LangSwitcher />
          <Button as={Link} to="/#contact" block onClick={close}>
            {t.nav.cta}
          </Button>
        </div>
      </div>
      <div className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`} onClick={close} aria-hidden="true" />
    </>
  )
}
