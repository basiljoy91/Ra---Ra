import type { Metadata } from "next";

import { CollectionBreadcrumbs } from "@/components/commerce/collections/collection-breadcrumbs";
import { CollectionOverviewGrid } from "@/components/commerce/collections/collection-overview-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { getVisibleCollectionSummaries } from "@/data/development/mock-collections";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "Explore the Editions";
const description =
  "Each ra&ra edition begins with one connected idea, then explores it through artwork, fabric weight, proportion and placement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: buildAbsoluteUrl("/collections", siteConfig.siteUrl),
  },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/collections", siteConfig.siteUrl),
    images: [
      {
        url: "/campaign/hero-beyond-limits.png",
        width: 1672,
        height: 941,
        alt: "Beyond Limits campaign with two models and a fractured Atlas sculpture",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CollectionsOverviewPage() {
  const collections = getVisibleCollectionSummaries();

  return (
    <Section spacing="lg" tone="background">
      <Container>
        <CollectionBreadcrumbs />
        <header className="mt-8 max-w-3xl">
          <p className="type-label text-accent">Limited-edition chapters</p>
          <h1 className="type-page-heading mt-3">{title}</h1>
          <p className="type-subheading mt-5 text-foreground-muted">
            {description}
          </p>
        </header>
        <CollectionOverviewGrid collections={collections} />
      </Container>
    </Section>
  );
}
