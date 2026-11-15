import type { Metadata } from "next";

import { EditorialCta } from "@/components/editorial/editorial-cta";
import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { RichText } from "@/components/editorial/rich-text";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { aboutContent, aboutHero, editorialCta } from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "About ra&ra";
const description =
  "Discover BEYOND: four designs translating Time, Fear, Reality and Limits into a visual language of lines, forms, light and space.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/about", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/about", siteConfig.siteUrl),
    images: [{ url: "/campaign/beyond-v2/desktop/collection.png", width: 1672, height: 941, alt: "Models wearing black RA & RA BEYOND T-shirts in an urban landscape" }],
  },
};

export default function AboutPage() {
  return (
    <EditorialLayout as="article" hero={aboutHero}>
      <Section spacing="lg">
        <Container width="content">
          <RichText blocks={aboutContent} />
        </Container>
      </Section>
      <EditorialCta config={editorialCta} />
    </EditorialLayout>
  );
}
