import type { Metadata } from "next";

import { EditorialLayout } from "@/components/editorial/editorial-layout";
import { JournalCard } from "@/components/editorial/journal-card";
import { JournalGrid } from "@/components/editorial/journal-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { journalArticles, journalIndexHero } from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "The Journal";
const description =
  "Read the myths, material decisions and visual histories behind the ra&ra Beyond collection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: buildAbsoluteUrl("/journal", siteConfig.siteUrl) },
  openGraph: {
    title,
    description,
    url: buildAbsoluteUrl("/journal", siteConfig.siteUrl),
    images: [{ url: "/campaign/hero-beyond-time.png", width: 1672, height: 941, alt: "Models wearing the Past Present Beyond artwork beside a fractured classical portrait" }],
  },
};

export default function JournalIndexPage() {
  const featured = journalArticles.find(
    (article) => "featured" in article && article.featured,
  );
  const remaining = journalArticles.filter((article) => article.slug !== featured?.slug);

  return (
    <EditorialLayout hero={journalIndexHero}>
      <Section spacing="lg">
        <Container>
          {featured ? <JournalCard article={featured} featured headingLevel={2} /> : null}
          <section aria-labelledby="journal-more-heading" className="mt-16 sm:mt-20">
            <p className="type-label text-accent">Continue looking</p>
            <h2 className="type-section-heading mt-3" id="journal-more-heading">
              More from the collection journal
            </h2>
            <div className="mt-8">
              <JournalGrid articles={remaining} headingLevel={3} />
            </div>
          </section>
        </Container>
      </Section>
    </EditorialLayout>
  );
}
