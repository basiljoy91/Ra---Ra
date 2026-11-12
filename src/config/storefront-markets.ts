export interface StorefrontMarketOption {
  countryCode: string;
  name: string;
}

export const INDIA_STOREFRONT_MARKETS = [
  { countryCode: "IN", name: "India" },
] as const satisfies readonly StorefrontMarketOption[];

export const EU_STOREFRONT_MARKETS = [
  { countryCode: "AT", name: "Austria" },
  { countryCode: "BE", name: "Belgium" },
  { countryCode: "BG", name: "Bulgaria" },
  { countryCode: "HR", name: "Croatia" },
  { countryCode: "CY", name: "Cyprus" },
  { countryCode: "CZ", name: "Czechia" },
  { countryCode: "DK", name: "Denmark" },
  { countryCode: "EE", name: "Estonia" },
  { countryCode: "FI", name: "Finland" },
  { countryCode: "FR", name: "France" },
  { countryCode: "DE", name: "Germany" },
  { countryCode: "GR", name: "Greece" },
  { countryCode: "HU", name: "Hungary" },
  { countryCode: "IE", name: "Ireland" },
  { countryCode: "IT", name: "Italy" },
  { countryCode: "LV", name: "Latvia" },
  { countryCode: "LT", name: "Lithuania" },
  { countryCode: "LU", name: "Luxembourg" },
  { countryCode: "MT", name: "Malta" },
  { countryCode: "NL", name: "Netherlands" },
  { countryCode: "PL", name: "Poland" },
  { countryCode: "PT", name: "Portugal" },
  { countryCode: "RO", name: "Romania" },
  { countryCode: "SK", name: "Slovakia" },
  { countryCode: "SI", name: "Slovenia" },
  { countryCode: "ES", name: "Spain" },
  { countryCode: "SE", name: "Sweden" },
] as const satisfies readonly StorefrontMarketOption[];

