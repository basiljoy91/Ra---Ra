import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleMetadata } from "@/components/editorial/article-metadata";
import { ArticleStructuredData } from "@/components/editorial/article-structured-data";
import { ContentBreadcrumbs } from "@/components/editorial/content-breadcrumbs";
import { EditorialCta } from "@/components/editorial/editorial-cta";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { JournalGrid } from "@/components/editorial/journal-grid";
import { RichText } from "@/components/editorial/rich-text";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import {
  editorialCta,
  getJournalArticle,
  getRelatedJournalArticles,
  journalArticles,
} from "@/data/development/editorial-content";
import { buildAbsoluteUrl } from "@/lib/utilities";

interface JournalArticleRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: JournalArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);

  if (!article) {
    return {};
  }

  const canonicalUrl = buildAbsoluteUrl(`/journal/${article.slug}`, siteConfig.siteUrl);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      type: "article",
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      ...(article.heroImage
        ? {
            images: [{
              url: article.heroImage.url,
              ...(article.heroImage.width ? { width: article.heroImage.width } : {}),
              ...(article.heroImage.height ? { height: article.heroImage.height } : {}),
              alt: article.heroImage.alt,
            }],
          }
        : {}),
    },
  };
}

export default async function JournalArticlePage({ params }: JournalArticleRouteProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedJournalArticles(article);

  return (
    <article>
      <ArticleStructuredData article={article} />
      <EditorialHero
        config={{
          eyebrow: article.category ?? "Journal",
          title: article.title,
          lead: article.excerpt,
          developmentNotice: "Development article. No publication date or author is being claimed.",
          ...(article.heroImage ? { image: article.heroImage } : {}),
        }}
      />
      <Section spacing="lg">
        <Container width="content">
          <ContentBreadcrumbs current={article.title} parent={{ label: "Journal", href: "/journal" }} />
          <div className="mt-8">
            <ArticleMetadata article={article} />
          </div>
          <RichText blocks={article.content} className="mt-10" />
        </Container>
      </Section>
      {relatedArticles.length > 0 ? (
        <Section aria-labelledby="related-articles-heading" spacing="lg" tone="muted">
          <Container>
            <p className="type-label text-accent">Continue reading</p>
            <h2 className="type-section-heading mt-3" id="related-articles-heading">
              Related ideas
            </h2>
            <div className="mt-8">
              <JournalGrid articles={relatedArticles} headingLevel={3} />
            </div>
          </Container>
        </Section>
      ) : null}
      <EditorialCta config={editorialCta} />
    </article>
  );
}
