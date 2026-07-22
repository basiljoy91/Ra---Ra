import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { NewsletterSection } from "@/components/forms/newsletter/newsletter-section";
import { developmentNewsletterShowcase } from "@/config/homepage";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";

export const metadata: Metadata = {
  title: "Newsletter Interface Development Showcase",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevelopmentNewsletterPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <Section spacing="md" tone="surface">
        <Container width="content">
          <p className="type-label text-error">Development Only</p>
          <h1 className="type-page-heading mt-3">
            Newsletter interface showcase
          </h1>
          <p className="type-body mt-5 text-foreground-muted" role="note">
            This form validates interface states only. It does not store the
            submitted address or create a marketing subscription.
          </p>
        </Container>
      </Section>
      <NewsletterSection
        config={developmentNewsletterShowcase}
        action={submitDevelopmentNewsletter}
      />
    </>
  );
}
