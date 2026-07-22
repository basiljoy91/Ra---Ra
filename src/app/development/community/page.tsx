import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CommunityGridSection } from "@/components/storytelling/community/community-grid-section";
import { developmentCommunityShowcase } from "@/config/homepage";
import {
  DEVELOPMENT_COMMUNITY_NOTICE,
  developmentCommunityItems,
} from "@/data/development/mock-community";

export const metadata: Metadata = {
  title: "Community Grid Development Showcase",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevelopmentCommunityPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <Section spacing="md" tone="muted">
        <Container width="content">
          <p className="type-label text-error">Development Only</p>
          <h1 className="type-page-heading mt-3">
            Community grid showcase
          </h1>
          <p className="type-body mt-5 text-foreground-muted" role="note">
            {DEVELOPMENT_COMMUNITY_NOTICE}
          </p>
        </Container>
      </Section>
      <CommunityGridSection
        config={developmentCommunityShowcase}
        items={developmentCommunityItems}
        contentStatus="development"
      />
    </>
  );
}
