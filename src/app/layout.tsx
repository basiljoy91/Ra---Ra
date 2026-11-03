import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SkipLink } from "@/components/layout/skip-link";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { footerConfig } from "@/config/footer";
import { siteConfig } from "@/config/site";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.siteName,
  title: {
    default: siteConfig.siteName,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  category: "apparel",
  openGraph: {
    type: "website",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    siteName: siteConfig.siteName,
    images: [
      {
        url: "/campaign/beyond-limits-hero.png",
        width: 1536,
        height: 1024,
        alt: "ra&ra Beyond Limits campaign imagery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: ["/campaign/beyond-limits-hero.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0b0b0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.defaultLocale}
      className="h-full"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${displayFont.variable} ${bodyFont.variable} flex min-h-full flex-col antialiased`}
      >
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SkipLink href="#main-content" />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter config={footerConfig} />
      </body>
    </html>
  );
}
