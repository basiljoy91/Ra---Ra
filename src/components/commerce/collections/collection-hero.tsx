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
  const mobileMedia = story.heroMedia?.mobile;
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
      className={cn(
        "overflow-hidden border-b lg:relative lg:min-h-[25rem] lg:border-b-0 lg:bg-[#171513] lg:text-white",
        theme.heroClassName,
      )}
      data-collection-theme={collection.themeKey}
    >
      <Container className="relative py-[var(--section-space-sm)] lg:flex lg:min-h-[25rem] lg:items-center lg:py-12">
        <div className="lg:hidden">
          <CollectionBreadcrumbs currentLabel={story.title} />
        </div>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] md:gap-8 lg:mt-0 lg:block lg:w-full">
          <div
            className={cn(
              "max-w-xl lg:relative lg:z-10 lg:flex lg:max-w-[36rem] lg:flex-col lg:py-8",
              mediaFirst && "md:order-2 lg:order-none",
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              {story.eyebrow ? (
                <p className={cn("type-label lg:text-white/75", theme.eyebrowClassName)}>
                  {story.eyebrow}
                </p>
              ) : null}
              <span
                className={cn(
                  "type-caption rounded-full border px-3 py-1 font-semibold lg:hidden",
                  theme.statusClassName,
                )}
              >
                {entry.status === "active" ? "Active Collection" : "Coming Soon"}
              </span>
            </div>
            <h1
              className="type-page-heading mt-4 lg:max-w-[10ch] lg:text-[clamp(3.8rem,6vw,6.8rem)] lg:leading-[0.84] lg:text-white"
              id="collection-heading"
            >
              {story.title}
            </h1>
            <p className="type-body mt-5 text-foreground-muted lg:order-2 lg:max-w-[31rem] lg:text-base lg:leading-7 lg:text-white/82">
              {story.introduction}
            </p>
            {story.campaignLine ? (
              <p className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em] lg:order-1 lg:mt-4 lg:max-w-[18ch] lg:text-[clamp(2rem,3vw,3.25rem)] lg:italic lg:text-white">
                {story.campaignLine}
              </p>
            ) : null}
            {productCount !== undefined ? (
              <p className="type-caption mt-5 text-foreground-muted lg:hidden">
                {productCount} {productCount === 1 ? "product" : "products"}
              </p>
            ) : null}
            <a
              className="mt-7 hidden min-h-11 w-fit items-center border border-white/70 bg-white px-5 text-xs font-semibold tracking-[0.12em] text-[#151311] no-underline transition-colors hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:order-3 lg:inline-flex"
              href="#collection-products-heading"
            >
              Shop the collection
            </a>
          </div>

          <div
            className={cn(
              "relative aspect-[5/4] overflow-hidden rounded-[var(--radius-panel)] border md:aspect-[4/3] lg:absolute lg:inset-y-0 lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:rounded-none lg:border-0 lg:after:absolute lg:after:inset-0 lg:after:bg-[linear-gradient(90deg,rgba(12,11,10,0.88)_0%,rgba(12,11,10,0.63)_35%,rgba(12,11,10,0.10)_72%,rgba(12,11,10,0.18)_100%)] xl:aspect-auto",
              theme.mediaClassName,
              mediaFirst && "md:order-1 lg:order-none",
            )}
          >
            {media ? (
              <picture>
                {mobileMedia ? (
                  <source media="(max-width: 767px)" srcSet={mobileMedia.url} />
                ) : null}
                <Image
                  alt={media.alt}
                  className="collection-hero-image h-full w-full object-cover lg:absolute lg:inset-0"
                  fetchPriority="high"
                  height={media.height ?? 1122}
                  priority
                  sizes="100vw"
                  src={media.url}
                  style={imageStyle}
                  width={media.width ?? 1402}
                />
              </picture>
            ) : (
              <div
                className={cn(
                  "grid h-full place-items-center p-8 text-center",
                  theme.placeholderClassName,
                )}
              >
                <div className="max-w-sm">
                  <p className="type-label opacity-75">Future collection</p>
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
