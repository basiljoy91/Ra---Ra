"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      onImageChange(nextImage.url);
    }
  }

  return (
    <div aria-label={`Product images for ${productTitle}`} role="region">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface">
        <Image
          alt={activeImage.alt}
          className="h-full w-full object-contain"
          fetchPriority="high"
          height={activeImage.height ?? 1254}
          loading="eager"
          sizes="(min-width: 1024px) 55vw, 100vw"
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
          <p className="type-caption absolute bottom-3 right-3 rounded-full bg-surface/95 px-3 py-1.5 font-semibold text-foreground">
            <span className="sr-only">Image </span>
            {activeIndex + 1} / {images.length}
          </p>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div
          aria-label="Choose product image"
          className="mt-3 flex gap-3 overflow-x-auto pb-1"
          role="group"
        >
          {images.map((image, index) => {
            const current = index === activeIndex;

            return (
              <button
                aria-label={`View image ${index + 1} of ${images.length}: ${image.alt}`}
                aria-pressed={current}
                className={cn(
                  "relative aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--radius-control)] border bg-surface",
                  current ? "border-foreground" : "border-border",
                )}
                key={image.url}
                onClick={() => onImageChange(image.url)}
                type="button"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                  fetchPriority="low"
                  height={96}
                  loading="eager"
                  sizes="5rem"
                  src={image.url}
                  width={96}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
