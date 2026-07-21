import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import type { Collection } from "@/lib/commerce";
import type { FeaturedCollectionPresentation } from "@/types/featured-collection";

interface CollectionStoryProps {
  collection: Collection;
  presentation: FeaturedCollectionPresentation;
  headingId: string;
  eyebrowClassName: string;
}

export function CollectionStory({
  collection,
  presentation,
  headingId,
  eyebrowClassName,
}: CollectionStoryProps) {
  return (
    <div className="lg:py-8">
      <div className="flow-space-sm">
        {presentation.eyebrow ? (
          <p className={`type-label ${eyebrowClassName}`}>
            {presentation.eyebrow}
          </p>
        ) : null}
        <h2 className="type-page-heading max-w-[13ch]" id={headingId}>
          {collection.title}
        </h2>
      </div>

      {collection.story ? (
        <p className="type-subheading mt-6 max-w-[32rem] text-foreground">
          {collection.story}
        </p>
      ) : null}

      <p className="type-body mt-5 max-w-[34rem] text-foreground-muted">
        {collection.description}
      </p>

      {presentation.campaignLine ? (
        <p className="mt-6 font-serif text-2xl font-semibold text-foreground">
          {presentation.campaignLine}
        </p>
      ) : null}

      <Link
        className={buttonStyles({
          variant: "primary",
          size: "lg",
          className: "mt-8 w-full sm:w-auto",
        })}
        href={presentation.href}
      >
        {presentation.ctaLabel}
      </Link>
    </div>
  );
}
