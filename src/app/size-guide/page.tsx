import type { Metadata } from "next";

import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { RichText } from "@/components/editorial/rich-text";
import { SizeChart } from "@/components/editorial/size-chart";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import {
  sizeChart,
  sizeGuideHero,
  sizeGuideInstructions,
  sizeGuideNotes,
} from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "Size Guide";
const description =
  "Development structure for Ra & Ra garment measurements, fit guidance and care information.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/size-guide", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/size-guide", siteConfig.siteUrl),
    images: [{ url: "/featured-collection/dogs-and-humans-campaign.jpeg", width: 1402, height: 1122, alt: "Development dog-illustrated T-shirt campaign image" }],
  },
};

export default function SizeGuidePage() {
  return (
    <EditorialLayout hero={sizeGuideHero}>
      <Section spacing="lg">
        <Container width="content">
          <RichText blocks={sizeGuideInstructions} />
        </Container>
      </Section>
      <Section aria-labelledby="size-chart-heading" spacing="lg" tone="muted">
        <Container>
          <div className="max-w-3xl">
            <p className="type-label text-accent">Measurements</p>
            <h2 className="type-section-heading mt-3" id="size-chart-heading">
              Development size table
            </h2>
            <p className="mt-5 text-foreground-muted">
              Every value remains pending until an approved supplier chart identifies the measurement points, units and tolerances.
            </p>
          </div>
          <div className="mt-8">
            <SizeChart chart={sizeChart} />
          </div>
        </Container>
      </Section>
      <Section spacing="lg">
        <Container width="content">
          <RichText blocks={sizeGuideNotes} />
        </Container>
      </Section>
    </EditorialLayout>
  );
}
