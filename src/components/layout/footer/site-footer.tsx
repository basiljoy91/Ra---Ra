import { Camera, CreditCard, Music2, Radio, Video } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/navigation/brand-logo";
import type { FooterConfig } from "@/types/footer";

type SiteFooterProps = {
  config: FooterConfig;
};

export function SiteFooter({ config }: SiteFooterProps) {
  return (
    <footer
      className="border-t border-border bg-background text-foreground"
      data-site-footer
    >
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
            <Link href="/faq" className="inline-flex w-max min-h-8 items-center rounded-full border border-foreground/50 px-4 text-[0.625rem] font-medium tracking-[0.08em] no-underline uppercase">
              {config.market.marketLabel} / {config.market.currencyLabel}
            </Link>
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
    </footer>
  );
}
