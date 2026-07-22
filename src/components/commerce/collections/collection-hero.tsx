import Image from "next/image";
import type { CSSProperties } from "react";

import { CollectionBreadcrumbs } from "@/components/commerce/collections/collection-breadcrumbs";
import { Container } from "@/components/layout/container";
import { getStorefrontCollectionTheme } from "@/config/storefront-collection-themes";
import { cn } from "@/lib/utilities";
import type { CollectionCatalogEntry } from "@/types/collection";

interface CollectionHeroProps {
  entry: CollectionCatalogEntry;
  productCount?: number;
}

type FocalPointStyle = CSSProperties & {
  "--collection-hero-position-mobile"?: string;
  "--collection-hero-position-tablet"?: string;
  "--collection-hero-position-desktop"?: string;
};

export function CollectionHero({ entry, productCount }: CollectionHeroProps) {
  const { collection, story } = entry;
  const theme = getStorefrontCollectionTheme(collection.themeKey);
  const media = story.heroMedia?.desktop;
  const focalPoint = story.heroMedia?.focalPoint;
  const imageStyle: FocalPointStyle = {
    "--collection-hero-position-mobile": focalPoint?.mobile ?? "50% 50%",
    "--collection-hero-position-tablet": focalPoint?.tablet ?? "50% 50%",
    "--collection-hero-position-desktop": focalPoint?.desktop ?? "50% 50%",
  };
  const mediaFirst = entry.heroLayout === "story-right";

  return (
    <section
      aria-labelledby="collection-heading"
      className={cn("border-b", theme.heroClassName)}
      data-collection-theme={collection.themeKey}
    >
      <Container className="py-[var(--section-space-sm)] lg:py-[var(--section-space-md)]">
        <CollectionBreadcrumbs currentLabel={story.title} />
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] md:gap-8 lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
          <div className={cn("max-w-xl", mediaFirst && "md:order-2")}>
            <div className="flex flex-wrap items-center gap-3">
              {story.eyebrow ? (
                <p className={cn("type-label", theme.eyebrowClassName)}>
                  {story.eyebrow}
                </p>
              ) : null}
              <span
                className={cn(
                  "type-caption rounded-full border px-3 py-1 font-semibold",
                  theme.statusClassName,
                )}
              >
                {entry.status === "active" ? "Active Collection" : "Coming Soon"}
              </span>
            </div>
            <h1 className="type-page-heading mt-4" id="collection-heading">
              {story.title}
            </h1>
            <p className="type-body mt-5 text-foreground-muted">
              {story.introduction}
            </p>
            {story.campaignLine ? (
              <p className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em]">
                {story.campaignLine}
              </p>
            ) : null}
            {productCount !== undefined ? (
              <p className="type-caption mt-5 text-foreground-muted">
                {productCount} development {productCount === 1 ? "product" : "products"}
              </p>
            ) : null}
          </div>

          <div
            className={cn(
              "relative aspect-[5/4] overflow-hidden rounded-[var(--radius-panel)] border md:aspect-[4/3] xl:aspect-[3/2]",
              theme.mediaClassName,
              mediaFirst && "md:order-1",
            )}
          >
            {media ? (
              <Image
                alt={media.alt}
                className="collection-hero-image h-full w-full object-cover"
                fetchPriority="high"
                height={media.height ?? 1122}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={media.url}
                style={imageStyle}
                width={media.width ?? 1402}
              />
            ) : (
              <div
                className={cn(
                  "grid h-full place-items-center p-8 text-center",
                  theme.placeholderClassName,
                )}
              >
                <div className="max-w-sm">
                  <p className="type-label opacity-75">Development Theme</p>
                  <p className="mt-4 font-serif text-[clamp(2rem,6vw,4.5rem)] leading-none tracking-[-0.035em]">
                    A story still to come.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
