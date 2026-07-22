import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { FooterConfig } from "@/types/footer";

type FooterMarketInformationProps = {
  market: FooterConfig["market"];
};

export function FooterMarketInformation({
  market,
}: FooterMarketInformationProps) {
  return (
    <dl className="type-caption flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-2)] text-primary-foreground/70">
      <div>
        <dt>
          <VisuallyHidden>Market</VisuallyHidden>
        </dt>
        <dd>{market.marketLabel}</dd>
      </div>
      <div>
        <dt>
          <VisuallyHidden>Currency</VisuallyHidden>
        </dt>
        <dd>{market.currencyLabel}</dd>
      </div>
      <div>
        <dt>
          <VisuallyHidden>Language</VisuallyHidden>
        </dt>
        <dd>{market.languageLabel}</dd>
      </div>
    </dl>
  );
}
