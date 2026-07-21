import Image from "next/image";
import Link from "next/link";

import { ProductBadgeList } from "@/components/commerce/product-card/product-badge-list";
import type { ProductImage } from "@/lib/commerce";
import { cn } from "@/lib/utilities";
import type {
  ProductBadgeKind,
  ProductCardImageRatio,
} from "@/types/product-card";

interface ProductCardMediaProps {
  productTitle: string;
  productHref: string;
  primaryImage?: ProductImage | undefined;
  alternateImage?: ProductImage | undefined;
  badges: readonly ProductBadgeKind[];
  soldOut: boolean;
  imageRatio: ProductCardImageRatio;
  showAlternateImage: boolean;
  priority: boolean;
  sizes: string;
}

const ratioClasses: Record<ProductCardImageRatio, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function ProductCardMedia({
  productTitle,
  productHref,
  primaryImage,
  alternateImage,
  badges,
  soldOut,
  imageRatio,
  showAlternateImage,
  priority,
  sizes,
}: ProductCardMediaProps) {
  return (
    <div
      className={cn(
        "product-card-media group/media relative overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface",
        ratioClasses[imageRatio],
      )}
    >
      <Link
        aria-label={`View product image: ${productTitle}`}
        className="block h-full no-underline"
        href={productHref}
      >
        {primaryImage ? (
          <Image
            alt={primaryImage.alt}
            className="absolute inset-0 h-full w-full object-contain"
            height={primaryImage.height ?? 1122}
            sizes={sizes}
            src={primaryImage.url}
            width={primaryImage.width ?? 1402}
            {...(priority
              ? { preload: true }
              : { loading: "lazy" as const })}
          />
        ) : (
          <div
            aria-label={`Product image pending for ${productTitle}`}
            className="grid h-full place-items-center bg-surface-muted px-5 text-center"
            data-missing-product-image="true"
            role="img"
          >
            <span className="type-small font-semibold text-foreground-muted">
              Product image pending
            </span>
          </div>
        )}

        {showAlternateImage && alternateImage ? (
          <Image
            alt=""
            aria-hidden="true"
            className="product-card-alternate pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-[var(--duration-base)]"
            height={alternateImage.height ?? 1122}
            loading="lazy"
            quality={65}
            sizes={sizes}
            src={alternateImage.url}
            width={alternateImage.width ?? 1402}
          />
        ) : null}

        {soldOut ? (
          <span className="absolute inset-x-3 bottom-3 rounded-[var(--radius-control)] bg-surface/95 px-3 py-2 text-center text-sm font-semibold text-foreground">
            Sold Out
          </span>
        ) : null}
      </Link>

      <ProductBadgeList badges={badges} />
    </div>
  );
}
