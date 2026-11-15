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
  "Provisional finished garment measurements for the RA & RA BEYOND boxy oversized unisex T-shirt.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/size-guide", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/size-guide", siteConfig.siteUrl),
    images: [{ url: "/products/beyond-time/male-front.png", width: 1086, height: 1448, alt: "Male model wearing the black Beyond Time T-shirt from the front" }],
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
              BEYOND size chart
            </h2>
            <p className="mt-5 text-foreground-muted">
              These are proposed finished garment measurements in centimetres, not body measurements. They remain provisional until supplier sampling and fit approval.
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
