import { CreditCard } from "lucide-react";

import { Container } from "@/components/layout/container";
import { BackToTop } from "@/components/layout/footer/back-to-top.client";
import { FooterBrand } from "@/components/layout/footer/footer-brand";
import { FooterMarketInformation } from "@/components/layout/footer/footer-market-information";
import { FooterNavigation } from "@/components/layout/footer/footer-navigation";
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
        <div className="grid gap-10 py-[clamp(2.75rem,6vw,5rem)] md:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-[clamp(2rem,6vw,7rem)]">
          <FooterBrand
            brandStatement={config.brandStatement}
            socialLinks={config.socialLinks}
          />
          <FooterNavigation groups={config.navigationGroups} />
          <div className="flex items-center gap-3 text-foreground-muted md:flex-col md:items-end md:gap-2">
            <CreditCard aria-hidden="true" size={22} strokeWidth={1.2} />
            <p className="max-w-32 text-[0.625rem] leading-relaxed tracking-[0.08em] uppercase">
              Payment options shown at checkout launch
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-foreground-muted">
            {config.copyrightNotice}
          </p>
          <FooterMarketInformation market={config.market} />
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
