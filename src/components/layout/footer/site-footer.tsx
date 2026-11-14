import { Camera, CreditCard, Music2, Radio, Video } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { MarketSelector } from "@/components/layout/footer/market-selector.client";
import type { StorefrontMarketOption } from "@/config/storefront-markets";
import type { FooterConfig } from "@/types/footer";

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
        <div className="grid gap-8 py-8 md:grid-cols-[12rem_1fr_14rem] md:gap-10">
          <div>
            <BrandLogo large className="justify-start" />
            <p className="mt-3 text-[0.625rem] font-medium tracking-[0.16em] uppercase">{config.tagline}</p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-7 border-border md:grid-cols-3 md:border-x md:px-10">
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
            <div className="flex items-center gap-4" aria-label="Social links">
              <Link href="/journal" aria-label="Instagram"><Camera size={19} strokeWidth={1.7} /></Link>
              <Link href="/journal" aria-label="TikTok"><Music2 size={19} strokeWidth={1.7} /></Link>
              <Link href="/journal" aria-label="YouTube"><Video size={20} strokeWidth={1.7} /></Link>
              <Link href="/journal" aria-label="Spotify"><Radio size={19} strokeWidth={1.7} /></Link>
            </div>
            <MarketSelector
              initialCountryCode={selectedCountryCode}
              markets={marketOptions}
            />
            <div className="flex items-center gap-4">
              <span className="text-[0.6875rem] font-bold italic">VISA</span>
              <span className="text-[0.6875rem] font-bold">●●</span>
              <span className="text-[0.6875rem] font-bold italic">PayPal</span>
              <CreditCard aria-hidden="true" size={20} strokeWidth={1.2} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-foreground-muted">
            {config.copyrightNotice}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-[0.625rem]">
            <Link href="/faq">Privacy Policy</Link><span aria-hidden="true">|</span>
            <Link href="/faq">Terms &amp; Conditions</Link><span aria-hidden="true">|</span>
            <Link href="/faq">Cookie Settings</Link>
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

          <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-[0.65rem]">
            <span>{config.market.marketLabel} · {config.market.currencyLabel}</span>
            <Link href="/contact" className="underline decoration-border underline-offset-4">Contact</Link>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-[0.58rem]">
            <Link href="/faq">Privacy Policy</Link>
            <Link href="/faq">Terms &amp; Conditions</Link>
            <Link href="/faq">Cookie Settings</Link>
          </div>
          <p className="mt-4 text-[0.58rem] text-foreground-muted">{config.copyrightNotice}</p>
        </div>
      </Container>
    </footer>
  );
}
