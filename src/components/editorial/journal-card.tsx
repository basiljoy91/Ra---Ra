import Image from "next/image";
import Link from "next/link";

import type { JournalArticle } from "@/types/editorial";

interface JournalCardProps {
  article: JournalArticle;
  featured?: boolean;
  headingLevel?: 2 | 3;
}

export function JournalCard({
  article,
  featured = false,
  headingLevel = 2,
}: JournalCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/journal/${article.slug}`;

  return (
    <article
      className={
        featured
          ? "grid gap-6 border-y border-border py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-center md:gap-10"
          : "grid content-start"
      }
    >
      <Link
        aria-label={`Read ${article.title}`}
        className="group block overflow-hidden rounded-[var(--radius-media)] bg-surface-muted no-underline"
        href={href}
      >
        {article.heroImage ? (
          <Image
            alt={article.heroImage.alt}
            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[var(--duration-slow)] motion-safe:group-hover:scale-[1.015]"
            height={article.heroImage.height ?? 1000}
            loading="lazy"
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"}
            src={article.heroImage.url}
            width={article.heroImage.width ?? 1600}
          />
        ) : (
          <span className="grid aspect-[16/10] place-items-center text-sm font-semibold text-foreground-muted">
            Article image pending
          </span>
        )}
      </Link>
      <div className={featured ? "py-2" : "pt-5"}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="type-label text-accent">
            {article.category ?? "Journal"}
          </span>
          {article.contentStatus === "development" ? (
            <span className="type-caption rounded-full border border-border px-2 py-1 text-foreground-muted">
              Development article
            </span>
          ) : null}
        </div>
        <Heading
          className={
            featured
              ? "mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              : "mt-3 font-serif text-2xl font-semibold leading-tight"
          }
        >
          <Link className="no-underline hover:underline" href={href}>
            {article.title}
          </Link>
        </Heading>
        <p className="type-body mt-4 text-foreground-muted">{article.excerpt}</p>
        {article.readingTime || article.publishedAt ? (
          <p className="type-caption mt-4 text-foreground-muted">
            {[article.publishedAt, article.readingTime].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
