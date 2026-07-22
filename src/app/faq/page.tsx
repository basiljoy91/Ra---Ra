import type { Metadata } from "next";

import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { FaqGroups } from "@/components/editorial/faq-groups";
import { FaqStructuredData } from "@/components/editorial/faq-structured-data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { faqCategories, faqHero } from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "Frequently Asked Questions";
const description =
  "Confirmed information and clearly labelled development guidance for Ra & Ra orders, shipping, products and sizing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/faq", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/faq", siteConfig.siteUrl),
  },
};

export default function FaqPage() {
  return (
    <EditorialLayout hero={faqHero}>
      <FaqStructuredData categories={faqCategories} />
      <Section spacing="lg">
        <Container>
          <FaqGroups categories={faqCategories} />
        </Container>
      </Section>
    </EditorialLayout>
  );
}
