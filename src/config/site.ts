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

const developmentMarket = {
  code: "DE",
  name: "Germany",
  countryCode: "DE",
  currencyCode: "EUR",
  defaultLocale: "en",
  supportedLocales: ["en"],
} as const satisfies Market;

const primaryNavigation = [
  {
    id: "shop",
    label: "Shop",
    enabled: true,
    children: [
      { id: "all-products", label: "All Products", href: "/shop", enabled: true },
      {
        id: "new-arrivals",
        label: "New Arrivals",
        href: "/shop?view=new-arrivals",
        enabled: true,
      },
      {
        id: "best-sellers",
        label: "Best Sellers",
        href: "/shop?view=best-sellers",
        enabled: true,
      },
    ],
  },
  {
    id: "collections",
    label: "Collections",
    enabled: true,
    children: [
      {
        id: "pets-collection",
        label: "Pets",
        href: "/collections/pets",
        enabled: true,
      },
      {
        id: "limited-editions",
        label: "Limited Editions",
        badge: "Coming Soon",
        enabled: true,
      },
      {
        id: "future-collections",
        label: "Future Collections",
        badge: "Coming Soon",
        enabled: true,
      },
    ],
  },
  { id: "our-story", label: "Our Story", href: "/our-story", enabled: true },
  { id: "journal", label: "Journal", href: "/journal", enabled: true },
  { id: "about", label: "About", href: "/about", enabled: true },
  { id: "contact", label: "Contact", href: "/contact", enabled: true },
] as const satisfies readonly NavigationItem[];

const mobileSecondaryLinks = [
  { id: "faq", label: "FAQ", href: "/faq", enabled: true },
  { id: "size-guide", label: "Size Guide", href: "/size-guide", enabled: true },
  { id: "shipping", label: "Shipping", href: "/shipping", enabled: true },
  { id: "returns", label: "Returns", href: "/returns", enabled: true },
] as const satisfies readonly NavigationItem[];

const headerConfig = {
  appearance: "solid",
  sticky: true,
  searchEnabled: true,
  cartEnabled: true,
  developmentCartCount: 0,
  announcementBar: {
    enabled: true,
    messages: [
      {
        id: "launch-notice",
        text: "New story-led collection launching soon",
        shortText: "New collection launching soon",
      },
    ],
  },
  primaryNavigation,
  mobileSecondaryLinks,
} as const satisfies HeaderConfig;

export const siteConfig = {
  siteName: "Ra & Ra",
  siteDescription:
    "Story-led lifestyle apparel inspired by meaningful everyday connections.",
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  defaultLocale: "en",
  supportedLocales: ["en"],
  defaultCurrency: "EUR",
  market: developmentMarket,
  socialLinks: {},
  contactEmail: "hello@example.invalid",
  navigationFeatureFlags: {
    account: false,
    wishlist: false,
    search: true,
    cart: true,
  },
  accountEnabled: false,
  wishlistEnabled: false,
  reviewsEnabled: false,
  newsletterEnabled: false,
  communityEnabled: false,
  header: headerConfig,
  usesPlaceholderContactDetails: true,
} as const;

export type SiteConfig = typeof siteConfig;
