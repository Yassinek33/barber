import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';

export const DEFAULT_COUNTRY: CountryCode = 'NL';

// Netherlands first (this is a Groningen barbershop), then the rest of the
// world alphabetically by localized name — an emoji flag next to each dial
// code makes the dropdown scannable without needing a full name column.
const PRIORITY_COUNTRIES: CountryCode[] = ['NL', 'BE', 'DE', 'FR', 'GB', 'MA', 'TR', 'PL', 'ES', 'IT', 'PT', 'RO', 'SE', 'NO', 'DK', 'US'];

const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
  ? new Intl.DisplayNames(['nl'], { type: 'region' })
  : null;

export function countryCodeToFlagEmoji(code: string): string {
  return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export interface CountryOption {
  code: CountryCode;
  name: string;
  dialCode: string;
  flag: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = (() => {
  const all = getCountries();
  const priority = PRIORITY_COUNTRIES.filter((c) => all.includes(c));
  const rest = all
    .filter((c) => !PRIORITY_COUNTRIES.includes(c))
    .sort((a, b) => (regionNames?.of(a) || a).localeCompare(regionNames?.of(b) || b));
  return [...priority, ...rest].map((code) => ({
    code,
    name: regionNames?.of(code) || code,
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: countryCodeToFlagEmoji(code),
  }));
})();

// Formats the locally-typed number (no country code, e.g. "6 12345678") into
// a full international number for a given country, or null if it isn't a
// real, valid number for that country — used to reject bad input outright
// rather than silently accepting whatever the customer typed.
export function formatPhoneForSubmit(nationalNumber: string, country: CountryCode): string | null {
  const trimmed = nationalNumber.trim();
  if (!trimmed) return null;
  const parsed = parsePhoneNumberFromString(trimmed, country);
  if (!parsed || !parsed.isValid()) return null;
  return parsed.formatInternational();
}
