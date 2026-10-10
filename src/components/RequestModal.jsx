import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { formatPrice } from '../utils/format.js'
import Button from './Button.jsx'
import { CheckIcon, CloseIcon } from './Icons.jsx'
import styles from './RequestModal.module.css'

const TODAY = new Date().toISOString().slice(0, 10)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values, t) {
  const errors = {}
  if (!values.name.trim()) errors.name = t.request.required
  if (!values.email.trim()) errors.email = t.request.required
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = t.request.invalidEmail
  return errors
}

// Native <dialog> gives us focus trapping, Esc-to-close and a top layer for free.
export default function RequestModal({ offer, defaults, onClose }) {
  const { t, lang } = useLanguage()
  const dialogRef = useRef(null)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    date: defaults.date,
    guests: defaults.guests,
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values, t)
    setErrors(found)
    if (Object.keys(found).length) return
    // No backend yet – here the request would be sent to an API / mail service.
    setSent(true)
  }

  // Close when clicking the backdrop (the dialog element itself, outside the panel)
  const onDialogClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={onDialogClick}
      aria-labelledby="request-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <img src={offer.image} alt="" className={styles.thumb} />
          <div className={styles.headText}>
            <h2 id="request-title" className={styles.title}>
              {t.request.title}
            </h2>
            <p className={styles.offer}>
              {offer.title[lang]} · {t.offers.from} {formatPrice(offer.price, lang)}
            </p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label={t.request.close}>
            <CloseIcon size={20} />
          </button>
        </div>

        {sent ? (
          <div className={styles.success} role="status">
            <span className={styles.successIcon}>
              <CheckIcon size={28} />
            </span>
            <p>{t.request.success}</p>
            <Button onClick={onClose}>{t.request.close}</Button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <Field label={t.request.name} error={errors.name} full>
              <input value={values.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
            </Field>
            <Field label={t.request.email} error={errors.email}>
              <input
                type="email"
                value={values.email}
                onChange={set('email')}
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field label={t.request.phone}>
              <input type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" />
            </Field>
            <Field label={t.request.date}>
              <input type="date" min={TODAY} value={values.date} onChange={set('date')} />
            </Field>
            <Field label={t.request.guests}>
              <input
                type="number"
                min="1"
                max="12"
                value={values.guests}
                onChange={set('guests')}
                inputMode="numeric"
              />
            </Field>
            <Field label={t.request.message} full>
              <textarea rows="3" value={values.message} onChange={set('message')} />
            </Field>
            <Button type="submit" size="lg" block className={styles.submit}>
              {t.request.submit}
            </Button>
          </form>
        )}
      </div>
    </dialog>
  )
}

function Field({ label, error, full, children }) {
  return (
    <label className={`${styles.field} ${full ? styles.full : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.control} ${error ? styles.invalid : ''}`}>{children}</span>
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}
