import { CreditCard } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BackToTop } from "@/components/layout/footer/back-to-top.client";
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
        <div className="grid items-center gap-8 py-8 md:grid-cols-[auto_1fr_auto]">
          <BrandLogo className="text-foreground" />
          <nav aria-label="Footer navigation">
            <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 md:justify-center" role="list">
              {config.navigationGroups.flatMap((group) => group.links).map((link) => (
                <li key={link.id}>
                  <Link className="text-[0.6875rem] text-foreground-muted no-underline transition-colors hover:text-foreground" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3 text-foreground-muted">
            <span className="text-[0.6875rem] font-semibold italic text-foreground">VISA</span>
            <span className="text-[0.6875rem] font-semibold text-foreground">Mastercard</span>
            <span className="text-[0.6875rem] font-semibold italic text-foreground">PayPal</span>
            <CreditCard aria-hidden="true" size={20} strokeWidth={1.2} />
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-foreground-muted">
            {config.copyrightNotice}
          </p>
          <div className="flex items-center justify-between gap-8">
            <p className="text-[0.625rem] tracking-[0.18em] text-foreground-muted uppercase">
              {config.tagline}
            </p>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
