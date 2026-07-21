import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utilities";
import type { ProductImage } from "@/lib/commerce";
import type { FeaturedCollectionFocalPoint } from "@/types/featured-collection";

interface CollectionCampaignMediaProps {
  image?: ProductImage | undefined;
  focalPoint?: FeaturedCollectionFocalPoint | undefined;
  frameClassName: string;
}

type CampaignMediaStyle = CSSProperties & {
  "--collection-media-position-desktop"?: string;
  "--collection-media-position-mobile"?: string;
};

export function CollectionCampaignMedia({
  image,
  focalPoint,
  frameClassName,
}: CollectionCampaignMediaProps) {
  const focalPointStyle: CampaignMediaStyle = {
    "--collection-media-position-desktop": focalPoint?.desktop ?? "50% 50%",
    "--collection-media-position-mobile": focalPoint?.mobile ?? "50% 50%",
  };

  return (
    <figure
      className={cn(
        "relative aspect-[5/4] overflow-hidden rounded-[var(--radius-panel)] border",
        frameClassName,
      )}
      style={focalPointStyle}
    >
      {image ? (
        <Image
          alt={image.alt}
          className="featured-collection-media-image h-full w-full object-cover"
          height={image.height ?? 1122}
          loading="lazy"
          sizes="(min-width: 1024px) 58vw, (min-width: 768px) 94vw, 100vw"
          src={image.url}
          width={image.width ?? 1402}
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid h-full place-items-center bg-[linear-gradient(145deg,var(--surface),var(--accent-soft))]"
        >
          <span className="font-serif text-2xl tracking-[0.12em] text-foreground-muted">
            Ra &amp; Ra
          </span>
        </div>
      )}
    </figure>
  );
}
