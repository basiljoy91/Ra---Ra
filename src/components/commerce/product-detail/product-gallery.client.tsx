"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { ProductImage } from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface ProductGalleryProps {
  productTitle: string;
  images: readonly ProductImage[];
  activeImageUrl: string | null;
  onImageChange: (url: string) => void;
}

export function ProductGallery({
  productTitle,
  images,
  activeImageUrl,
  onImageChange,
}: ProductGalleryProps) {
  const [zoomed, setZoomed] = useState(false);
  const activeIndex = Math.max(
    0,
    images.findIndex((image) => image.url === activeImageUrl),
  );
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <div
        aria-label={`Product image pending for ${productTitle}`}
        className="grid aspect-[5/4] place-items-center rounded-[var(--radius-media)] border border-border bg-surface-muted px-6 text-center"
        data-missing-product-image="true"
        role="img"
      >
        <span className="type-small font-semibold text-foreground-muted">
          Product image pending
        </span>
      </div>
    );
  }

  function moveImage(direction: -1 | 1) {
    const nextIndex = (activeIndex + direction + images.length) % images.length;
    const nextImage = images[nextIndex];

    if (nextImage) {
      setZoomed(false);
      onImageChange(nextImage.url);
    }
  }

  return (
    <div
      aria-label={`Product images for ${productTitle}`}
      className="grid gap-3 md:grid-cols-[4.75rem_minmax(0,1fr)]"
      role="region"
    >
      {images.length > 1 ? (
        <div
          aria-label="Choose product image"
          className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible"
          role="group"
        >
          {images.map((image, index) => {
            const current = index === activeIndex;

            return (
              <button
                aria-label={`View image ${index + 1} of ${images.length}: ${image.alt}`}
                aria-pressed={current}
                className={cn(
                  "relative aspect-[3/4] w-[4.75rem] shrink-0 overflow-hidden rounded-lg border-2 bg-[#eeece8] transition-colors",
                  current ? "border-foreground" : "border-transparent",
                )}
                key={image.url}
                onClick={() => {
                  setZoomed(false);
                  onImageChange(image.url);
                }}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  fetchPriority="low"
                  height={112}
                  loading="eager"
                  sizes="4.75rem"
                  src={image.url}
                  width={84}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="relative order-1 aspect-[3/4] overflow-hidden rounded-xl bg-[#eeece8] md:order-2">
        <Image
          alt={activeImage.alt}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            zoomed && "scale-150 cursor-zoom-out",
          )}
          fetchPriority="high"
          height={activeImage.height ?? 1254}
          loading="eager"
          onClick={() => setZoomed((value) => !value)}
          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 65vw, 100vw"
          src={activeImage.url}
          width={activeImage.width ?? 1402}
        />
        {images.length > 1 ? (
          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between lg:hidden">
            <Button
              aria-label="View previous product image"
              className="size-11 rounded-full bg-surface/95 p-0 shadow-[var(--shadow-soft)]"
              onClick={() => moveImage(-1)}
              variant="secondary"
            >
              <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.6} />
            </Button>
            <Button
              aria-label="View next product image"
              className="size-11 rounded-full bg-surface/95 p-0 shadow-[var(--shadow-soft)]"
              onClick={() => moveImage(1)}
              variant="secondary"
            >
              <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.6} />
            </Button>
          </div>
        ) : null}
        {images.length > 1 ? (
          <p className="type-caption absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1.5 font-semibold text-foreground">
            <span className="sr-only">Image </span>
            {activeIndex + 1} / {images.length}
          </p>
        ) : null}
        <button
          aria-label={zoomed ? "Reset product image zoom" : "Zoom product image"}
          className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-border bg-surface/95 shadow-sm"
          onClick={() => setZoomed((value) => !value)}
          type="button"
        >
          <ZoomIn aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </button>
      </div>
    </div>
  );
}
