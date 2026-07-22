import Image from "next/image";
import Link from "next/link";

import { getStorefrontCollectionTheme } from "@/config/storefront-collection-themes";
import { cn } from "@/lib/utilities";
import type { CollectionSummary } from "@/types/collection";

interface CollectionOverviewCardProps {
  summary: CollectionSummary;
}

function CollectionOverviewCardContent({
  summary,
}: CollectionOverviewCardProps) {
  const theme = getStorefrontCollectionTheme(summary.themeKey);
  const active = summary.status === "active";

  return (
    <>
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden border-b",
          theme.mediaClassName,
        )}
      >
        {summary.image ? (
          <Image
            alt={summary.image.alt}
            className={cn(
              "h-full w-full object-cover transition-transform duration-[var(--duration-slow)]",
              active && "group-hover:scale-[1.015]",
            )}
            height={summary.image.height ?? 1000}
            loading="lazy"
            sizes="(min-width: 768px) 50vw, 100vw"
            src={summary.image.url}
            width={summary.image.width ?? 1600}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "grid h-full place-items-center p-8 text-center",
              theme.placeholderClassName,
            )}
          >
            <div className="max-w-sm">
              <p className="type-label opacity-75">Ra & Ra</p>
              <p className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.5rem)] leading-none tracking-[-0.03em]">
                A future story.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-4 p-6 sm:p-8">
        <span
          className={cn(
            "type-caption w-fit rounded-full border px-3 py-1 font-semibold",
            theme.statusClassName,
          )}
        >
          {active ? "Active Collection" : "Coming Soon"}
        </span>
        <h2 className="type-section-heading">{summary.title}</h2>
        {summary.subtitle ? (
          <p className="type-small font-semibold text-foreground-muted">
            {summary.subtitle}
          </p>
        ) : null}
        <p className="type-body max-w-[42rem] text-foreground-muted">
          {summary.description}
        </p>
        {summary.developmentNotice ? (
          <p className="type-caption border-l-2 border-accent pl-3 text-foreground-muted">
            {summary.developmentNotice}
          </p>
        ) : null}
        {active ? (
          <span className="type-small mt-1 font-semibold underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] group-hover:decoration-foreground">
            Explore the Collection <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
    </>
  );
}

export function CollectionOverviewCard({
  summary,
}: CollectionOverviewCardProps) {
  const theme = getStorefrontCollectionTheme(summary.themeKey);
  const className = cn(
    "group block h-full overflow-hidden rounded-[var(--radius-panel)] border no-underline",
    theme.heroClassName,
  );

  if (summary.status === "active" && summary.href) {
    return (
      <Link
        aria-label={`Explore the Collection: ${summary.title}`}
        className={className}
        href={summary.href}
      >
        <CollectionOverviewCardContent summary={summary} />
      </Link>
    );
  }

  return (
    <article className={className}>
      <CollectionOverviewCardContent summary={summary} />
    </article>
  );
}
