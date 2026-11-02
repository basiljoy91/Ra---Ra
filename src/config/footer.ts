import { siteConfig } from "@/config/site";
import type { FooterConfig } from "@/types/footer";

export const footerConfig = {
  brandStatement:
    "Story-led apparel for the connections, rituals and passions that stay with us.",
  tagline: "WEAR WHAT STAYS WITH YOU",
  navigationGroups: [
    {
      id: "explore",
      label: "Explore",
      links: [
        {
          id: "all-products",
          label: "Shop",
          href: "/collections/pets",
        },
        { id: "about", label: "About", href: "/about" },
        { id: "faq", label: "FAQ", href: "/faq" },
        {
          id: "shipping",
          label: "Shipping",
          href: "/faq#shipping",
        },
        {
          id: "returns",
          label: "Returns",
          href: "/faq#returns",
        },
        { id: "contact", label: "Contact", href: "/contact" },
        { id: "journal", label: "Journal", href: "/journal" },
      ],
    },
  ],
  socialLinks: [],
  market: {
    marketLabel: siteConfig.market.name,
    currencyLabel: siteConfig.defaultCurrency,
    languageLabel: "English",
  },
  copyrightNotice: `© ${new Date().getUTCFullYear()} ra&ra. All rights reserved.`,
  cookieSettings: {
    label: "Cookie Settings",
    unavailableMessage: "Available when consent preferences are connected.",
    enabled: false,
  },
} as const satisfies FooterConfig;
