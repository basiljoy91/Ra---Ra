import { JournalCard } from "@/components/editorial/journal-card";
import type { JournalArticle } from "@/types/editorial";

export function JournalFeaturedStories({
  primary,
  secondary,
}: {
  primary: JournalArticle;
  secondary: readonly JournalArticle[];
}) {
  return (
    <section aria-labelledby="featured-stories-heading" className="mt-9 md:mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[#171513] sm:text-4xl" id="featured-stories-heading">
          Featured stories
        </h2>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-[#cfc6bb] sm:block" />
      </div>
      <div className={secondary.length > 0 ? "grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.85fr)]" : undefined}>
        <JournalCard article={primary} headingLevel={3} priority variant="primary" />
        {secondary.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {secondary.map((article) => (
              <JournalCard article={article} headingLevel={3} key={article.slug} variant="secondary" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
