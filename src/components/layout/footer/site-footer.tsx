import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { MarketSelector } from "@/components/layout/footer/market-selector.client";
import type { StorefrontMarketOption } from "@/config/storefront-markets";
import type { FooterConfig } from "@/types/footer";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

type SiteFooterProps = {
  config: FooterConfig;
  marketOptions: readonly StorefrontMarketOption[];
  selectedCountryCode: string;
};

export function SiteFooter({
  config,
  marketOptions,
  selectedCountryCode,
}: SiteFooterProps) {
  return (
    <footer
      className="border-t border-border bg-background text-foreground"
      data-site-footer
    >
      <div className="max-[47.999rem]:hidden">
      <Container>
        <div className="grid gap-8 py-8 md:grid-cols-[12rem_1fr_12rem] md:gap-10">
          <div>
            <BrandLogo large className="justify-start" />
            <p className="mt-3 text-[0.625rem] font-medium tracking-[0.16em] uppercase">{config.tagline}</p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-7 border-border lg:grid-cols-4 md:border-x md:px-10">
            {config.navigationGroups.map((group) => (
              <div key={group.id}>
                <h2 className="mb-2 font-serif text-[1rem] font-medium tracking-[0.06em] uppercase">{group.label}</h2>
                <ul className="m-0 list-none space-y-1 p-0" role="list">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <Link className="text-[0.6875rem] text-foreground no-underline transition-opacity hover:opacity-55" href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="flex flex-col gap-5">
            <LanguageSwitcher />
            <MarketSelector
              initialCountryCode={selectedCountryCode}
              markets={marketOptions}
            />
            <p className="text-[0.6875rem] leading-relaxed text-foreground-muted">Zahlungsarten werden ausschließlich im Shopify-Checkout angezeigt.</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 border-t border-border py-4">
          <p className="text-[0.6875rem] text-foreground-muted">Gesetzlichen Widerruf online erklären — ohne Login oder Begründung.</p>
          <Link className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] border border-button bg-button px-4 text-[0.6875rem] font-semibold text-button-foreground no-underline" href="/widerruf">
            Vertrag widerrufen
          </Link>
        </div>
        <div className="flex flex-col gap-4 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-foreground-muted">
            {config.copyrightNotice}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-[0.625rem]">
            <Link href="/impressum">Impressum</Link><span aria-hidden="true">|</span>
            <Link href="/privacy">Datenschutz</Link><span aria-hidden="true">|</span>
            <Link href="/terms">AGB</Link><span aria-hidden="true">|</span>
            <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link>
          </div>
        </div>
      </Container>
      </div>

      <Container className="hidden max-[47.999rem]:block">
        <div className="py-7">
          <Link href="/" className="font-serif text-[2rem] font-semibold tracking-[-0.04em] no-underline">
            Ra &amp; Ra
          </Link>
          <p className="mt-1.5 text-[0.625rem] font-semibold tracking-[0.17em] uppercase">
            Wear beyond limits
          </p>

          <nav className="mt-7 border-t border-border" aria-label="Mobile footer navigation">
            {config.navigationGroups.map((group) => (
              <details className="group border-b border-border" key={group.id}>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[0.72rem] font-semibold tracking-[0.1em] uppercase [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <span aria-hidden="true" className="text-lg font-light group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-lg font-light group-open:inline">−</span>
                </summary>
                <ul className="m-0 list-none space-y-2 pb-4 pl-0" role="list">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <Link className="inline-flex min-h-8 items-center text-[0.72rem] no-underline" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>

          <Link className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] border border-button bg-button px-4 text-sm font-semibold text-button-foreground no-underline" href="/widerruf">
            Vertrag widerrufen
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-[0.65rem]">
            <span>{config.market.marketLabel} · {config.market.currencyLabel}</span>
            <div className="flex items-center gap-3">
              <LanguageSwitcher compact />
              <Link href="/contact" className="underline decoration-border underline-offset-4">Kontakt</Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-[0.58rem]">
            <Link href="/impressum">Impressum</Link>
            <Link href="/privacy">Datenschutz</Link>
            <Link href="/terms">AGB</Link>
            <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link>
          </div>
          <p className="mt-4 text-[0.58rem] text-foreground-muted">{config.copyrightNotice}</p>
        </div>
      </Container>
    </footer>
  );
}
