import Image from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
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
  const { story } = entry;
  const media = story.heroMedia?.desktop;
  const mobileMedia = story.heroMedia?.mobile;
  const focalPoint = story.heroMedia?.focalPoint;
  const imageStyle: FocalPointStyle = {
    "--collection-hero-position-mobile": focalPoint?.mobile ?? "50% 50%",
    "--collection-hero-position-tablet": focalPoint?.tablet ?? "50% 50%",
    "--collection-hero-position-desktop": focalPoint?.desktop ?? "50% 50%",
  };

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative min-h-[21rem] overflow-hidden border-b border-white/10 bg-[#171513] text-white md:min-h-[23rem] lg:min-h-[25rem]"
    >
      {media ? (
        <picture className="absolute inset-0">
          {mobileMedia ? <source media="(max-width: 767px)" srcSet={mobileMedia.url} /> : null}
          <Image
            alt={media.alt}
            className="collection-shop-hero-image h-full w-full object-cover"
            fetchPriority="high"
            height={media.height ?? 1122}
            priority
            sizes="100vw"
            src={media.url}
            style={imageStyle}
            width={media.width ?? 1402}
          />
        </picture>
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,8,0.88)_0%,rgba(10,9,8,0.64)_34%,rgba(10,9,8,0.1)_72%),linear-gradient(0deg,rgba(10,9,8,0.58)_0%,transparent_55%)]" />
      <Container className="relative flex min-h-[21rem] items-end py-8 md:min-h-[23rem] md:items-center md:py-10 lg:min-h-[25rem]">
        <div className="max-w-[27rem]">
          {story.eyebrow ? (
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/75 uppercase md:text-xs">
              {story.eyebrow}
            </p>
          ) : null}
          <h1
            className="mt-2 font-serif text-[clamp(3rem,12vw,5rem)] font-normal italic leading-[0.82] tracking-[-0.045em] text-white md:text-[clamp(4.5rem,7vw,7rem)]"
            id="collection-heading"
          >
            {story.title}
          </h1>
          <p className="mt-3 max-w-[24rem] text-sm leading-6 text-white/82 md:text-base">
            {story.introduction}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a
              className="inline-flex min-h-11 items-center border border-white/75 bg-white px-5 text-xs font-semibold tracking-[0.1em] text-[#171513] no-underline hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="#collection-products-heading"
            >
              Explore products
            </a>
            {productCount !== undefined ? (
              <span className="text-xs text-white/70">
                {productCount} {productCount === 1 ? "product" : "products"}
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
