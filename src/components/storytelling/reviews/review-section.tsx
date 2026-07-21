import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ReviewGrid } from "@/components/storytelling/reviews/review-grid";
import type { Review, ReviewSectionConfig } from "@/types/review";

interface ReviewSectionProps {
  config: ReviewSectionConfig;
  reviews: readonly Review[];
}

export function ReviewSection({ config, reviews }: ReviewSectionProps) {
  if (reviews.length === 0 && config.hideWhenEmpty !== false) {
    return null;
  }

  const headingId = `${config.id}-heading`;

  return (
    <Section
      aria-labelledby={headingId}
      className="border-t border-border"
      data-review-section={config.id}
      spacing="lg"
      tone="surface"
    >
      <Container>
        <header className="max-w-2xl">
          {config.eyebrow ? (
            <p className="type-label text-accent">{config.eyebrow}</p>
          ) : null}
          <h2 className="type-section-heading mt-3" id={headingId}>
            {config.heading}
          </h2>
          {config.description ? (
            <p className="type-body mt-4 text-foreground-muted">
              {config.description}
            </p>
          ) : null}
        </header>

        {reviews.length > 0 ? (
          <ReviewGrid reviews={reviews} />
        ) : (
          <p className="type-body mt-10 text-foreground-muted" role="status">
            Genuine customer reviews will appear here when they are available.
          </p>
        )}
      </Container>
    </Section>
  );
}
