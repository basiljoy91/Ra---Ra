import { JournalCard } from "@/components/editorial/journal-card";
import type { JournalArticle } from "@/types/editorial";

interface JournalGridProps {
  articles: readonly JournalArticle[];
  headingLevel?: 2 | 3;
}

export function JournalGrid({
  articles,
  headingLevel = 2,
}: JournalGridProps) {
  if (articles.length === 0) {
    return (
      <p className="rounded-[var(--radius-panel)] border border-border bg-surface-muted p-6 text-foreground-muted">
        No journal articles are available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article) => (
        <JournalCard
          article={article}
          headingLevel={headingLevel}
          key={article.slug}
          variant="standard"
        />
      ))}
    </div>
  );
}
