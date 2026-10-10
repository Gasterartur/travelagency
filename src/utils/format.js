const locale = (lang) => (lang === 'ru' ? 'ru-RU' : 'de-DE')

export const formatPrice = (value, lang) =>
  new Intl.NumberFormat(locale(lang), { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
