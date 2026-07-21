import Image from "next/image";
import type { CSSProperties } from "react";

import type { HeroMedia as HeroMediaConfig } from "@/types/hero";

interface HeroMediaProps {
  media: HeroMediaConfig;
}

type HeroMediaStyle = CSSProperties & {
  "--hero-position-desktop"?: string;
  "--hero-position-tablet"?: string;
  "--hero-position-mobile"?: string;
};

export function HeroMedia({ media }: HeroMediaProps) {
  if (media.type !== "image") {
    throw new Error(
      "Video hero rendering is reserved until an approved production asset is supplied.",
    );
  }

  const focalPointStyle: HeroMediaStyle = {
    "--hero-position-desktop": media.focalPoint?.desktop ?? "50% 50%",
    "--hero-position-tablet": media.focalPoint?.tablet ?? "50% 50%",
    "--hero-position-mobile": media.focalPoint?.mobile ?? "50% 50%",
  };

  return (
    <div
      className="hero-media relative aspect-[5/4] w-full overflow-hidden bg-surface-muted sm:aspect-[2/1] min-[72rem]:absolute min-[72rem]:inset-0 min-[72rem]:aspect-auto min-[72rem]:h-full"
      style={focalPointStyle}
    >
      <Image
        src={media.desktopSrc}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="100vw"
        preload
        fetchPriority="high"
        className="hero-media-image absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
