import Link from "next/link";

import { CollectionCardMedia } from "@/components/commerce/collection-navigation/collection-card-media";
import { getCollectionCardTheme } from "@/config/collection-card-themes";
import { cn } from "@/lib/utilities";
import type {
  CollectionCardData,
  ShopByCollectionConfig,
} from "@/types/collection-card";

interface CollectionCardProps {
  collection: CollectionCardData;
  labels: Pick<
    ShopByCollectionConfig,
    "activeCtaLabel" | "activeStatusLabel" | "comingSoonStatusLabel"
  >;
}

function CollectionCardContent({
  collection,
  labels,
}: CollectionCardProps) {
  const theme = getCollectionCardTheme(collection.themeKey);
  const active = collection.status === "active";

  return (
    <>
      <CollectionCardMedia
        image={collection.image}
        interactive={active}
        placeholderClassName={theme.placeholderClassName}
        placeholderLabel={collection.placeholderLabel}
      />
      <div className="grid gap-4 p-6 sm:p-8">
        <span
          className={cn(
            "type-caption w-fit rounded-full border px-3 py-1 font-semibold",
            theme.statusClassName,
          )}
        >
          {active ? labels.activeStatusLabel : labels.comingSoonStatusLabel}
        </span>
        <h3 className="type-subheading">{collection.title}</h3>
        {collection.description ? (
          <p className="type-body max-w-[38rem] text-foreground-muted">
            {collection.description}
          </p>
        ) : null}
        {active ? (
          <span className="type-small mt-1 font-semibold underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] group-hover:decoration-foreground">
            {labels.activeCtaLabel}
            <span aria-hidden="true"> →</span>
          </span>
        ) : null}
      </div>
    </>
  );
}

export function CollectionCard({
  collection,
  labels,
}: CollectionCardProps) {
  const theme = getCollectionCardTheme(collection.themeKey);
  const className = cn(
    "group block h-full overflow-hidden rounded-[var(--radius-panel)] border no-underline",
    theme.frameClassName,
  );

  if (collection.status === "active") {
    return (
      <Link
        aria-label={`${labels.activeCtaLabel}: ${collection.title}`}
        className={className}
        href={collection.href}
      >
        <CollectionCardContent collection={collection} labels={labels} />
      </Link>
    );
  }

  return (
    <article className={className}>
      <CollectionCardContent collection={collection} labels={labels} />
    </article>
  );
}
