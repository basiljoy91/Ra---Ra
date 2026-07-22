import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

interface CollectionEmptyStateProps {
  kind: "collection-empty" | "no-matches";
  clearHref?: string;
  collectionHref: string;
}

export function CollectionEmptyState({
  kind,
  clearHref,
  collectionHref,
}: CollectionEmptyStateProps) {
  const noMatches = kind === "no-matches";

  return (
    <div className="rounded-[var(--radius-panel)] border border-border bg-surface px-6 py-12 text-center sm:px-10">
      <p className="type-label text-accent">
        {noMatches ? "No Matches" : "Collection Preview"}
      </p>
      <h2 className="type-section-heading mt-3">
        {noMatches
          ? "No products match your current filters."
          : "This collection does not have any products yet."}
      </h2>
      <p className="type-body mx-auto mt-4 max-w-xl text-foreground-muted">
        {noMatches
          ? "Remove one or more filters to return to the complete development collection."
          : "The reusable story and theme are ready, but no future inventory has been fabricated for this development collection."}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {noMatches && clearHref ? (
          <Link className={buttonStyles()} href={clearHref}>
            Clear All Filters
          </Link>
        ) : null}
        <Link
          className={buttonStyles({
            variant: noMatches ? "secondary" : "primary",
          })}
          href={noMatches ? collectionHref : "/collections"}
        >
          {noMatches ? "Return to All Products" : "Explore Collections"}
        </Link>
      </div>
    </div>
  );
}
