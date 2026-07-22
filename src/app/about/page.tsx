import type { Metadata } from "next";

import { EditorialCta } from "@/components/editorial/editorial-cta";
import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { RichText } from "@/components/editorial/rich-text";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { aboutContent, aboutHero, editorialCta } from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "About Ra & Ra";
const description =
  "Discover the theme-led idea behind Ra & Ra and why stories, meaningful connections and quiet design shape each collection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/about", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/about", siteConfig.siteUrl),
    images: [{ url: "/hero/hero-dog-owner.png", width: 1717, height: 916, alt: "Golden retriever presenting a dog-illustrated T-shirt to its owner in a warm home" }],
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
