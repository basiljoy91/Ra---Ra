import Image from "next/image";
import type { CSSProperties } from "react";

import type { EditorialBannerMedia as EditorialBannerMediaData } from "@/types/editorial-banner";

interface EditorialBannerMediaProps {
  media: EditorialBannerMediaData;
}

type EditorialMediaStyle = CSSProperties & {
  "--editorial-position-mobile"?: string;
  "--editorial-position-desktop"?: string;
};

export function EditorialBannerMedia({
  media,
}: EditorialBannerMediaProps) {
  const style: EditorialMediaStyle = {
    "--editorial-position-mobile": media.focalPoint?.mobile ?? "76% 50%",
    "--editorial-position-desktop": media.focalPoint?.desktop ?? "76% 50%",
  };

  return (
    <figure
      className="relative aspect-square overflow-hidden bg-surface-muted lg:min-h-[38rem] lg:aspect-auto"
      style={style}
    >
      <Image
        alt={media.alt}
        className="editorial-banner-image absolute inset-0 h-full w-full scale-[1.16] object-cover"
        height={media.height}
        loading="lazy"
        sizes="(min-width: 1024px) 62vw, 100vw"
        src={media.src}
        width={media.width}
      />
    </figure>
  );
}
