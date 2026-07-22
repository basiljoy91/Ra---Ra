import { siteConfig } from "@/config/site";
import type { FooterConfig } from "@/types/footer";

export const footerConfig = {
  brandStatement:
    "Story-led apparel for the connections, rituals and passions that stay with us.",
  navigationGroups: [
    {
      id: "shop",
      label: "Shop",
      links: [
        { id: "all-products", label: "All Products", href: "/shop" },
        {
          id: "new-arrivals",
          label: "New Arrivals",
          href: "/shop?view=new-arrivals",
        },
        {
          id: "best-sellers",
          label: "Best Sellers",
          href: "/shop?view=best-sellers",
        },
        { id: "collections", label: "Collections", href: "/collections" },
      ],
    },
    {
      id: "help",
      label: "Help",
      links: [
        { id: "contact", label: "Contact", href: "/contact" },
        { id: "faq", label: "FAQ", href: "/faq" },
        { id: "size-guide", label: "Size Guide", href: "/size-guide" },
        { id: "shipping", label: "Shipping", href: "/shipping" },
        { id: "returns", label: "Returns", href: "/returns" },
      ],
    },
    {
      id: "company",
      label: "Company",
      links: [
        { id: "about", label: "About", href: "/about" },
        { id: "journal", label: "Journal", href: "/journal" },
      ],
    },
    {
      id: "legal",
      label: "Legal",
      links: [
        { id: "privacy", label: "Privacy", href: "/privacy" },
        { id: "terms", label: "Terms", href: "/terms" },
        { id: "impressum", label: "Impressum", href: "/impressum" },
        { id: "withdrawal", label: "Withdrawal", href: "/withdrawal" },
      ],
    },
  ],
  socialLinks: [],
  market: {
    marketLabel: siteConfig.market.name,
    currencyLabel: siteConfig.defaultCurrency,
    languageLabel: "English",
  },
  copyrightNotice: `© ${new Date().getUTCFullYear()} ${siteConfig.siteName}. All rights reserved.`,
  cookieSettings: {
    label: "Cookie Settings",
    unavailableMessage: "Available when consent preferences are connected.",
    enabled: false,
  },
} as const satisfies FooterConfig;
