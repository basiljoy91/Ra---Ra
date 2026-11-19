export const supportedLocales = ["en", "de"] as const;

export type AppLocale = (typeof supportedLocales)[number];

export const localeCookieName = "ra_locale";
export const localeStorageKey = "ra.locale";

export function isAppLocale(value: string | undefined | null): value is AppLocale {
  return supportedLocales.includes(value as AppLocale);
}

export const localeNames: Record<AppLocale, string> = {
  en: "English",
  de: "Deutsch",
};
