import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";
import type { JournalArticle } from "@/types/editorial";

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function JournalIndexStructuredData({ articles }: { articles: readonly JournalArticle[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ra & Ra Journal",
    url: buildAbsoluteUrl("/journal", siteConfig.siteUrl),
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: buildAbsoluteUrl(`/journal/${article.slug}`, siteConfig.siteUrl),
    })),
  };

  return <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} type="application/ld+json" />;
}
