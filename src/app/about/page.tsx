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
  "Discover how ra&ra turns questions about courage, perception, time and limitation into considered limited-edition apparel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/about", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/about", siteConfig.siteUrl),
    images: [{ url: "/campaign/hero-beyond-limits.png", width: 1672, height: 941, alt: "Two models in Beyond Limits T-shirts beside a fractured Atlas sculpture" }],
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
