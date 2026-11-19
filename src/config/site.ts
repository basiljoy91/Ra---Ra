import type { Market } from "@/lib/commerce";
import type { HeaderConfig, NavigationItem } from "@/types/navigation";

const DEVELOPMENT_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(value: string | undefined): string {
  const candidate = value?.trim() || DEVELOPMENT_SITE_URL;

  try {
    return new URL(candidate).origin;
  } catch {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
    }

    return DEVELOPMENT_SITE_URL;
  }
}

const testMarket = {
  code: "DE",
  name: "Deutschland",
  countryCode: "DE",
  currencyCode: "EUR",
  defaultLocale: "de",
  supportedLocales: ["de", "en"],
} as const satisfies Market;

const primaryNavigation = [
  {
    id: "shop",
    label: "Shop",
    enabled: true,
    children: [
      {
        id: "beyond-time",
        label: "Beyond Time",
        href: "/products/beyond-time",
        enabled: true,
      },
      {
        id: "beyond-fear",
        label: "Beyond Fear",
        href: "/products/beyond-fear",
        enabled: true,
      },
      {
        id: "beyond-reality",
        label: "Beyond Reality",
        href: "/products/beyond-reality",
        enabled: true,
      },
      {
        id: "beyond-limits",
        label: "Beyond Limits",
        href: "/products/beyond-limits",
        enabled: true,
      },
    ],
  },
  { id: "about", label: "About", href: "/about", enabled: true },
  { id: "journal", label: "Journal", href: "/journal", enabled: true },
  { id: "contact", label: "Contact", href: "/contact", enabled: true },
] as const satisfies readonly NavigationItem[];

const mobileSecondaryLinks = [
  { id: "faq", label: "FAQ", href: "/faq", enabled: true },
  { id: "size-guide", label: "Size Guide", href: "/size-guide", enabled: true },
  { id: "shipping", label: "Versand", href: "/shipping", enabled: true },
  { id: "returns", label: "Rücksendungen", href: "/returns", enabled: true },
  { id: "withdrawal", label: "Vertrag widerrufen", href: "/widerruf", enabled: true },
] as const satisfies readonly NavigationItem[];

const headerConfig = {
  appearance: "solid",
  sticky: true,
  searchEnabled: true,
  cartEnabled: true,
  announcementBar: {
    enabled: true,
    messages: [
      {
        id: "launch-notice",
        text: "RA & RA / COLLECTION 01 · BEYOND",
        shortText: "COLLECTION 01 · BEYOND",
      },
    ],
  },
  primaryNavigation,
  mobileSecondaryLinks,
} as const satisfies HeaderConfig;

export const siteConfig = {
  siteName: "ra&ra",
  siteDescription:
    "BEYOND translates Time, Fear, Reality and Limits into a visual language of lines, forms, light and space.",
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  defaultLocale: "en",
  supportedLocales: ["en", "de"],
  defaultCurrency: "EUR",
  market: testMarket,
  socialLinks: {},
  contactEmail: "contact@raundra.com",
  navigationFeatureFlags: {
    account: false,
    wishlist: false,
    search: true,
    cart: true,
  },
  accountEnabled: false,
  wishlistEnabled: false,
  reviewsEnabled: false,
  newsletterEnabled: true,
  communityEnabled: false,
  header: headerConfig,
  usesPlaceholderContactDetails: false,
} as const;

export type SiteConfig = typeof siteConfig;
