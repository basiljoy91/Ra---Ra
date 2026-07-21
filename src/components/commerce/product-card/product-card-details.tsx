import Link from "next/link";
import type { ReactNode } from "react";

import { ProductPrice } from "@/components/commerce/product-card/product-price";
import type { Money } from "@/lib/commerce";
import { cn, type MoneyRange } from "@/lib/utilities";
import type {
  ProductCardHeadingLevel,
  ProductCardVariant,
} from "@/types/product-card";

interface ProductCardDetailsProps {
  title: string;
  productHref: string;
  price: Money;
  compareAtPrice?: Money | undefined;
  priceRange?: MoneyRange | undefined;
  collectionLabel?: string | undefined;
  headingLevel: ProductCardHeadingLevel;
  variant: ProductCardVariant;
  children?: ReactNode;
}

const titleClasses: Record<ProductCardVariant, string> = {
  standard: "text-lg",
  compact: "text-base",
  editorial: "text-xl sm:text-2xl",
};

export function ProductCardDetails({
  title,
  productHref,
  price,
  compareAtPrice,
  priceRange,
  collectionLabel,
  headingLevel,
  variant,
  children,
}: ProductCardDetailsProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className={cn("grid gap-2 pt-4", variant === "compact" && "pt-3")}>
      {collectionLabel && variant === "editorial" ? (
        <p className="type-label text-foreground-muted">{collectionLabel}</p>
      ) : null}
      <Heading
        className={cn(
          "font-serif font-semibold leading-snug text-foreground",
          titleClasses[variant],
        )}
      >
        <Link className="no-underline hover:underline" href={productHref}>
          {title}
        </Link>
      </Heading>
      <ProductPrice
        compareAtPrice={compareAtPrice}
        price={price}
        priceRange={priceRange}
      />
      {children}
    </div>
  );
}
