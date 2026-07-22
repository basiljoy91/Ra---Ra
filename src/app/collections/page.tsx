import type { Metadata } from "next";

import { CollectionBreadcrumbs } from "@/components/commerce/collections/collection-breadcrumbs";
import { CollectionOverviewGrid } from "@/components/commerce/collections/collection-overview-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { getVisibleCollectionSummaries } from "@/data/development/mock-collections";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "Explore Our Collections";
const description =
  "Each Ra & Ra collection begins with a theme, passion or connection that means something beyond the garment itself.";

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
        url: "/featured-collection/dogs-and-humans-campaign.jpeg",
        width: 1402,
        height: 1122,
        alt: "Black and white dog-illustrated T-shirts from the development pet collection",
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
          <p className="type-label text-accent">Stories to Wear</p>
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
