/**
 * Currency values are stored as decimal strings so application state never
 * relies on floating-point values for money.
 */
export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  available: boolean;
  size?: string;
  color?: string;
  selectedOptions: readonly SelectedOption[];
  price: Money;
  compareAtPrice?: Money;
}

export interface ProductStory {
  eyebrow?: string;
  title: string;
  shortStory: string;
  emotionalMessage?: string;
  inspiration?: string;
  artworkMeaning?: string;
  petMoment?: string;
  quote?: string;
  image?: ProductImage;
}

export interface SeoFields {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: ProductImage;
  noIndex?: boolean;
}

export type ContentStatus = "development" | "production";

/** Extend this union only after a collection theme has been approved. */
export type CollectionThemeKey = "default";

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  shortDescription?: string;
  images: readonly ProductImage[];
  price: Money;
  compareAtPrice?: Money;
  variants: readonly ProductVariant[];
  collectionHandles: readonly string[];
  story?: ProductStory;
  seo: SeoFields;
  contentStatus: ContentStatus;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  story?: string;
  heroImage?: ProductImage;
  mobileHeroImage?: ProductImage;
  themeKey: CollectionThemeKey;
  products: readonly Product[];
  seo: SeoFields;
  contentStatus: ContentStatus;
}

export interface Market {
  code: string;
  name: string;
  countryCode: string;
  currencyCode: string;
  defaultLocale: string;
  supportedLocales: readonly string[];
}
