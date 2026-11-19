import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import { SkipLink } from "@/components/layout/skip-link";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { LocaleProvider } from "@/components/i18n/locale-provider.client";
import { footerConfig } from "@/config/footer";
import { siteConfig } from "@/config/site";
import {
  getAvailableStorefrontMarkets,
  getCommerceRequestContext,
} from "@/lib/commerce/shopify/request-context";
import { isAppLocale, localeCookieName } from "@/i18n/config";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = DM_Sans({
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
  icons: {
    icon: "/brand/ra-ra-monogram-embroidered.png",
    apple: "/brand/ra-ra-monogram-embroidered.png",
  },
  openGraph: {
    type: "website",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    siteName: siteConfig.siteName,
    images: [
      {
        url: "/campaign/beyond-v2/desktop/collection.png",
        width: 1672,
        height: 941,
        alt: "Models wearing black RA & RA BEYOND T-shirts in an urban landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: ["/campaign/beyond-v2/desktop/collection.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4efe8",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const commerceContext = await getCommerceRequestContext();
  const marketOptions = getAvailableStorefrontMarkets();
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get(localeCookieName)?.value;
  const initialLocale = isAppLocale(storedLocale)
    ? storedLocale
    : siteConfig.defaultLocale;

  return (
    <html
      lang={initialLocale}
      className="h-full"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${displayFont.variable} ${bodyFont.variable} flex min-h-full flex-col antialiased`}
      >
        <LocaleProvider
          hasStoredPreference={isAppLocale(storedLocale)}
          initialLocale={initialLocale}
        >
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
          </noscript>
          <SkipLink href="#main-content" />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter
            config={footerConfig}
            marketOptions={marketOptions}
            selectedCountryCode={
              commerceContext.countryCode ?? marketOptions[0]?.countryCode ?? "IN"
            }
          />
        </LocaleProvider>
      </body>
    </html>
  );
}
