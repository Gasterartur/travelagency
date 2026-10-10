import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// On navigation: scroll to the #hash target if there is one, otherwise to the top.
// Keyed on location.key so clicking the same link twice still scrolls.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
