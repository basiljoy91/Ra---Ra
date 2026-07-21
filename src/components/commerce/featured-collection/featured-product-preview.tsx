import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/commerce";
import { cn, formatMoney } from "@/lib/utilities";

interface FeaturedProductPreviewProps {
  product: Product;
  frameClassName: string;
}

export function FeaturedProductPreview({
  product,
  frameClassName,
}: FeaturedProductPreviewProps) {
  const image = product.images[0];
  const formattedPrice = formatMoney(product.price);

  return (
    <Link
      aria-label={product.title}
      className="group block rounded-[var(--radius-panel)] no-underline"
      href={`/products/${product.handle}`}
    >
      <article>
        <div
          className={cn(
            "relative aspect-[5/4] overflow-hidden rounded-[var(--radius-media)] border transition-colors duration-[var(--duration-base)] group-hover:border-accent/60 group-focus-visible:border-accent",
            frameClassName,
          )}
        >
          {image ? (
            <Image
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-[1.02]"
              height={image.height ?? 1122}
              loading="lazy"
              sizes="(min-width: 1024px) 19vw, (min-width: 640px) 31vw, 45vw"
              src={image.url}
              width={image.width ?? 1402}
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid h-full place-items-center bg-surface"
            >
              <span className="font-serif text-lg text-foreground-muted">
                Ra &amp; Ra
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-1 px-0.5 pt-3">
          <h4 className="font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
            {product.title}
          </h4>
          <p className="type-small font-semibold tabular-nums text-foreground-muted">
            {formattedPrice}
          </p>
        </div>
      </article>
    </Link>
  );
}
