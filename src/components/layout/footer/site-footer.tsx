import { Container } from "@/components/layout/container";
import { FooterBottomBar } from "@/components/layout/footer/footer-bottom-bar";
import { FooterBrand } from "@/components/layout/footer/footer-brand";
import { FooterMarketInformation } from "@/components/layout/footer/footer-market-information";
import { FooterNavigation } from "@/components/layout/footer/footer-navigation";
import type { FooterConfig } from "@/types/footer";

type SiteFooterProps = {
  config: FooterConfig;
};

export function SiteFooter({ config }: SiteFooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground" data-site-footer>
      <Container>
        <div className="grid gap-[var(--space-12)] py-[var(--space-16)] lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,1.5fr)] lg:gap-[var(--space-20)] lg:py-[var(--space-20)]">
          <FooterBrand
            brandStatement={config.brandStatement}
            socialLinks={config.socialLinks}
          />
          <FooterNavigation groups={config.navigationGroups} />
        </div>
        <div className="border-t border-primary-foreground/15 py-[var(--space-5)]">
          <FooterMarketInformation market={config.market} />
        </div>
        <FooterBottomBar
          copyrightNotice={config.copyrightNotice}
          cookieSettings={config.cookieSettings}
        />
      </Container>
    </footer>
  );
}
