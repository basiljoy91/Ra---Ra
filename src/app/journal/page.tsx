import type { Metadata } from "next";
import Link from "next/link";

import { JournalCampaignBanner } from "@/components/editorial/journal-campaign-banner";
import { JournalCategoryNavigation } from "@/components/editorial/journal-category-navigation";
import { JournalFeaturedStories } from "@/components/editorial/journal-featured-stories";
import { JournalGrid } from "@/components/editorial/journal-grid";
import { JournalIndexHero } from "@/components/editorial/journal-index-hero";
import { JournalIndexStructuredData } from "@/components/editorial/journal-index-structured-data";
import { JournalNewsletter } from "@/components/editorial/journal-newsletter";
import { JournalSearch } from "@/components/editorial/journal-search";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import {
  journalArticles,
  journalIndexHero,
  journalNewsletter,
} from "@/data/development/editorial-content";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";
import {
  filterJournalArticles,
  getJournalCategories,
  resolveJournalQuery,
  sortJournalArticles,
} from "@/lib/journal";
import { buildAbsoluteUrl } from "@/lib/utilities";

const title = "The Journal";
const description =
  "Read the definitive stories behind Beyond Time, Beyond Fear, Beyond Reality and Beyond Limits.";

interface JournalIndexPageProps {
  searchParams: Promise<Record<string, string | readonly string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: JournalIndexPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const faceted = Boolean(resolved.category || resolved.q);

  return {
    title,
    description,
    alternates: { canonical: buildAbsoluteUrl("/journal", siteConfig.siteUrl) },
    openGraph: {
      title,
      description,
      url: buildAbsoluteUrl("/journal", siteConfig.siteUrl),
      images: [
        {
          url: "/campaign/beyond-v2/desktop/collection.png",
          width: 1672,
          height: 941,
          alt: "Models wearing black RA & RA BEYOND T-shirts in an urban landscape",
        },
      ],
    },
    robots: { index: !faceted, follow: true },
  };
}

export default async function JournalIndexPage({
  searchParams,
}: JournalIndexPageProps) {
  const resolved = await searchParams;
  const categories = getJournalCategories(journalArticles);
  const state = resolveJournalQuery(resolved.category, resolved.q, categories);
  const filtered = sortJournalArticles(filterJournalArticles(journalArticles, state));
  const primary = filtered.find((article) => article.featured) ?? filtered[0];
  const remaining = primary
    ? filtered.filter((article) => article.slug !== primary.slug)
    : [];
  const secondary = remaining.slice(0, 2);
  const latest = remaining.slice(2);

  return (
    <div
      className="bg-[#f4eee7] text-[#171513] [--accent:#171513] [--background:#f4eee7] [--border:#cfc6bb] [--button:#171513] [--button-foreground:#fff] [--foreground:#171513] [--foreground-muted:#686057] [--surface-muted:#e8dfd5] [--surface:#faf7f2] [color-scheme:light]"
      data-journal-index
    >
      <JournalIndexStructuredData articles={journalArticles} />
      <JournalIndexHero config={journalIndexHero} />
      <JournalCategoryNavigation
        categories={categories}
        state={state}
        totalArticles={journalArticles.length}
      />

      <div className="py-9 md:py-12 lg:py-14" id="journal-stories">
        <Container>
          <JournalSearch
            resultCount={filtered.length}
            state={state}
            totalArticles={journalArticles.length}
          />

          {primary ? (
            <>
              <JournalFeaturedStories primary={primary} secondary={secondary} />
              {latest.length > 0 ? (
                <section aria-labelledby="latest-stories-heading" className="mt-14 md:mt-18">
                  <div className="mb-6 flex items-end justify-between gap-5 border-b border-[#cfc6bb] pb-4">
                    <h2 className="font-serif text-4xl font-semibold tracking-[-0.025em] text-[#171513] sm:text-5xl" id="latest-stories-heading">
                      Latest stories
                    </h2>
                    <Link className="inline-flex min-h-11 items-center text-xs font-semibold tracking-[0.08em] text-[#171513] uppercase underline underline-offset-8" href="/journal">
                      View all articles
                    </Link>
                  </div>
                  <JournalGrid articles={latest} headingLevel={3} />
                </section>
              ) : null}
            </>
          ) : (
            <section aria-labelledby="journal-no-results-heading" className="mt-10 border border-[#cfc6bb] bg-[#faf7f2] px-6 py-12 text-center" role="status">
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-[#6a625a] uppercase">No results</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#171513]" id="journal-no-results-heading">
                No Journal stories match this search.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#686057]">
                Try a different word or return to the complete Journal.
              </p>
              <Link className="mt-6 inline-flex min-h-11 items-center bg-[#171513] px-5 text-xs font-semibold tracking-[0.08em] text-white uppercase no-underline" href="/journal">
                View all articles
              </Link>
            </section>
          )}
        </Container>
      </div>

      <JournalCampaignBanner />
      {siteConfig.newsletterEnabled ? (
        <JournalNewsletter
          action={submitDevelopmentNewsletter}
          config={journalNewsletter}
        />
      ) : null}
    </div>
  );
}
