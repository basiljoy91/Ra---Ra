import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";
import type { JournalArticle } from "@/types/editorial";

interface ArticleStructuredDataProps {
  article: JournalArticle;
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const articleUrl = buildAbsoluteUrl(`/journal/${article.slug}`, siteConfig.siteUrl);
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: articleUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    ...(article.heroImage
      ? { image: buildAbsoluteUrl(article.heroImage.url, siteConfig.siteUrl) }
      : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    ...(article.author
      ? { author: { "@type": "Person", name: article.author } }
      : {}),
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildAbsoluteUrl("/", siteConfig.siteUrl),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: buildAbsoluteUrl("/journal", siteConfig.siteUrl),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleData) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }}
        type="application/ld+json"
      />
    </>
  );
}
