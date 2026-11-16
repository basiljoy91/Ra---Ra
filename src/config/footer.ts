import { siteConfig } from "@/config/site";
import type { FooterConfig } from "@/types/footer";

export const footerConfig = {
  brandStatement:
    "Four designs. Four human experiences. One way of making the invisible personal.",
  tagline: "THE THINGS WE CARRY.",
  navigationGroups: [
    {
      id: "shop",
      label: "Shop",
      links: [
        { id: "beyond-time", label: "Beyond Time", href: "/products/beyond-time" },
        { id: "beyond-fear", label: "Beyond Fear", href: "/products/beyond-fear" },
        { id: "beyond-reality", label: "Beyond Reality", href: "/products/beyond-reality" },
        { id: "beyond-limits", label: "Beyond Limits", href: "/products/beyond-limits" },
      ],
    },
    {
      id: "help",
      label: "Help",
      links: [
        { id: "track", label: "Track Order", href: "/faq#shipping" },
        { id: "shipping", label: "Shipping", href: "/faq#shipping" },
        { id: "returns", label: "Returns & Exchanges", href: "/faq#returns" },
        { id: "faq", label: "FAQ", href: "/faq" },
        { id: "contact", label: "Contact", href: "/contact" },
      ],
    },
    {
      id: "about",
      label: "About",
      links: [
        { id: "story", label: "Our Story", href: "/about" },
        { id: "journal", label: "Journal", href: "/journal" },
        { id: "size-guide", label: "Size Guide", href: "/size-guide" },
        { id: "philosophy", label: "BEYOND Philosophy", href: "/about" },
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
