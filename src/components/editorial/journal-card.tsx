import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utilities";
import type { JournalArticle } from "@/types/editorial";

export type JournalCardVariant = "primary" | "secondary" | "standard";

interface JournalCardProps {
  article: JournalArticle;
  variant?: JournalCardVariant;
  headingLevel?: 2 | 3;
  priority?: boolean;
}

function JournalMetadata({ article }: { article: JournalArticle }) {
  const metadata = [article.publishedAt, article.readingTime].filter(Boolean);

  return metadata.length > 0 ? (
    <p className="mt-3 text-[0.68rem] tracking-[0.08em] text-current/70 uppercase">
      {metadata.join(" · ")}
    </p>
  ) : null;
}

function ArticleImage({
  article,
  priority,
  sizes,
}: {
  article: JournalArticle;
  priority: boolean;
  sizes: string;
}) {
  return article.heroImage ? (
    <Image
      alt={article.heroImage.alt}
      className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
      height={article.heroImage.height ?? 1000}
      sizes={sizes}
      src={article.heroImage.url}
      width={article.heroImage.width ?? 1600}
      {...(priority ? { priority: true } : { loading: "lazy" as const })}
    />
  ) : (
    <span className="grid h-full w-full place-items-center bg-[#e8dfd5] px-5 text-center text-sm font-semibold text-[#6a625a]">
      Article image pending
    </span>
  );
}

export function JournalCard({
  article,
  variant = "standard",
  headingLevel = 2,
  priority = false,
}: JournalCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/journal/${article.slug}`;

  if (variant === "primary" || variant === "secondary") {
    const primary = variant === "primary";

    return (
      <article className={cn("h-full min-w-0", primary && "lg:min-h-[32rem]")}>
        <Link
          className={cn(
            "group relative grid h-full min-h-[19rem] overflow-hidden bg-[#171513] text-white no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171513]",
            primary
              ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[32rem]"
              : "aspect-[16/11] min-h-[14rem] lg:aspect-auto lg:min-h-0",
          )}
          href={href}
        >
          <div className="absolute inset-0">
            <ArticleImage
              article={article}
              priority={priority}
              sizes={
                primary
                  ? "(min-width: 1024px) 62vw, 100vw"
                  : "(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
              }
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,9,8,0.9)_0%,rgba(10,9,8,0.42)_55%,rgba(10,9,8,0.08)_100%)]" />
          <div className={cn("relative mt-auto", primary ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6")}>
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-white/75 uppercase">
              {article.category ?? "Journal"}
            </p>
            <Heading
              className={cn(
                "mt-3 font-serif font-medium leading-[0.95] tracking-[-0.025em]",
                primary ? "text-4xl sm:text-5xl lg:text-6xl" : "text-2xl sm:text-3xl",
              )}
            >
              {article.title}
            </Heading>
            <p className={cn("mt-3 text-white/82", primary ? "max-w-2xl text-sm leading-6 sm:text-base" : "line-clamp-2 text-sm leading-5")}>
              {article.excerpt}
            </p>
            <JournalMetadata article={article} />
            <span className="mt-5 inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-[0.1em] uppercase underline decoration-white/45 underline-offset-8">
              Read article <ArrowRight aria-hidden="true" size={16} />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group grid min-w-0 content-start border-b border-[#cfc6bb] pb-7">
      <Link
        aria-label={`Read ${article.title}`}
        className="block aspect-[16/10] overflow-hidden bg-[#e8dfd5] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171513]"
        href={href}
      >
        <ArticleImage
          article={article}
          priority={priority}
          sizes="(min-width: 1280px) 23vw, (min-width: 640px) 47vw, 100vw"
        />
      </Link>
      <div className="pt-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#6a625a] uppercase">
          {article.category ?? "Journal"}
        </p>
        <Heading className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#171513]">
          <Link className="no-underline hover:underline" href={href}>
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 text-sm leading-6 text-[#686057]">{article.excerpt}</p>
        <JournalMetadata article={article} />
        <Link
          className="mt-4 inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-[0.08em] text-[#171513] uppercase underline decoration-[#8b8177] underline-offset-8"
          href={href}
        >
          Read more <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  );
}
