import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ReviewSection } from "@/components/storytelling/reviews/review-section";
import { developmentReviewShowcase } from "@/config/homepage";
import {
  DEVELOPMENT_REVIEW_NOTICE,
  developmentReviews,
} from "@/data/development/mock-reviews";

export const metadata: Metadata = {
  title: "Review Interface Development Showcase",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevelopmentReviewsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <Section spacing="md" tone="muted">
        <Container width="content">
          <p className="type-label text-error">Development Only</p>
          <h1 className="type-page-heading mt-3">Review interface showcase</h1>
          <p className="type-body mt-5 text-foreground-muted" role="note">
            {DEVELOPMENT_REVIEW_NOTICE}
          </p>
        </Container>
      </Section>
      <ReviewSection
        config={developmentReviewShowcase}
        reviews={developmentReviews}
      />
    </>
  );
}
