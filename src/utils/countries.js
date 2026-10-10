import { CITIES, COUNTRY_CODES } from '../data/cities.js'

const displayNames = {}
const sortedCache = {}

// Localized country name from the browser's built-in CLDR data (no translation table needed)
export function countryName(code, lang) {
  displayNames[lang] ??= new Intl.DisplayNames([lang], { type: 'region' })
  return displayNames[lang].of(code) ?? code
}

// [{ code, name }] sorted alphabetically for the given language
export function sortedCountries(lang) {
  sortedCache[lang] ??= COUNTRY_CODES.map((code) => ({ code, name: countryName(code, lang) })).sort((a, b) =>
    a.name.localeCompare(b.name, lang),
  )
  return sortedCache[lang]
}

export function citiesOf(code) {
  return CITIES[code] ?? []
}

export function findCity(code, cityId) {
  return citiesOf(code).find((c) => c.id === cityId)
}
