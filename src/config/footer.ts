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
      id: "service",
      label: "Service",
      links: [
        { id: "contact", label: "Kontakt", href: "/contact" },
        { id: "shipping", label: "Versand & Lieferung", href: "/shipping" },
        { id: "returns", label: "Widerruf & Rücksendungen", href: "/returns" },
        { id: "faq", label: "FAQ", href: "/faq" },
      ],
    },
    {
      id: "about",
      label: "Über Ra & Ra",
      links: [
        { id: "story", label: "Our Story", href: "/about" },
        { id: "journal", label: "Journal", href: "/journal" },
        { id: "size-guide", label: "Size Guide", href: "/size-guide" },
        { id: "philosophy", label: "BEYOND Philosophy", href: "/about" },
      ],
    },
    {
      id: "legal",
      label: "Rechtliches",
      links: [
        { id: "impressum", label: "Impressum", href: "/impressum" },
        { id: "privacy", label: "Datenschutzerklärung", href: "/privacy" },
        { id: "terms", label: "AGB", href: "/terms" },
        { id: "cookies", label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
        { id: "withdrawal", label: "Vertrag widerrufen", href: "/widerruf" },
      ],
    },
  ],
  socialLinks: [],
  market: {
    marketLabel: "Deutschland",
    currencyLabel: siteConfig.defaultCurrency,
    languageLabel: "Deutsch",
  },
  copyrightNotice: `© ${new Date().getUTCFullYear()} ra&ra. All rights reserved.`,
  cookieSettings: {
    label: "Cookie-Einstellungen",
    unavailableMessage: "",
    enabled: true,
  },
} as const satisfies FooterConfig;
