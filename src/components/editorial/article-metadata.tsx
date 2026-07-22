import type { JournalArticle } from "@/types/editorial";

interface ArticleMetadataProps {
  article: JournalArticle;
}

export function ArticleMetadata({ article }: ArticleMetadataProps) {
  const metadata = [
    article.category,
    article.publishedAt,
    article.readingTime,
    article.author ? `By ${article.author}` : undefined,
  ].filter(Boolean);

  if (metadata.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-6 text-sm text-foreground-muted" role="list">
      {metadata.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}
