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
      className="relative aspect-square overflow-hidden bg-surface-muted md:aspect-[4/3] lg:min-h-[38rem] lg:aspect-auto"
      style={style}
    >
      <Image
        alt={media.alt}
        className="editorial-banner-image absolute inset-0 h-full w-full scale-[1.25] object-cover md:scale-[1.5] lg:scale-[1.1] xl:scale-[1.4]"
        height={media.height}
        loading="lazy"
        sizes="(min-width: 1024px) 62vw, 100vw"
        src={media.src}
        width={media.width}
      />
    </figure>
  );
}
