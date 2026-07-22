import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { NewsletterForm } from "@/components/forms/newsletter/newsletter-form";
import type {
  NewsletterFormAction,
  NewsletterSectionConfig,
} from "@/types/newsletter";

type NewsletterSectionProps = {
  config: NewsletterSectionConfig;
  action: NewsletterFormAction;
};

export function NewsletterSection({
  config,
  action,
}: NewsletterSectionProps) {
  const headingId = `${config.id}-heading`;

  return (
    <Section
      spacing="lg"
      tone="muted"
      aria-labelledby={headingId}
      data-newsletter-section
    >
      <Container>
        <div className="grid gap-[var(--space-10)] border-y border-border py-[var(--space-10)] lg:grid-cols-[minmax(0,0.85fr)_minmax(28rem,1.15fr)] lg:items-start lg:gap-[var(--space-16)] lg:py-[var(--space-12)]">
          <div className="max-w-xl">
            {config.eyebrow ? (
              <p className="type-label text-accent">{config.eyebrow}</p>
            ) : null}
            <h2 id={headingId} className="type-section-heading mt-3">
              {config.heading}
            </h2>
            <p className="type-body mt-5 max-w-lg text-foreground-muted">
              {config.description}
            </p>
          </div>
          <NewsletterForm config={config} action={action} />
        </div>
      </Container>
    </Section>
  );
}
