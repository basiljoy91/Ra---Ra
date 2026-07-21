import { ProductCardActions } from "@/components/commerce/product-card/product-card-actions.client";
import { ProductCardDetails } from "@/components/commerce/product-card/product-card-details";
import { ProductCardMedia } from "@/components/commerce/product-card/product-card-media";
import type { Product } from "@/lib/commerce";
import {
  getProductBadges,
  getProductCardActionVariants,
  getProductColourOptions,
  isProductSoldOut,
} from "@/lib/commerce";
import { cn, getMoneyRange } from "@/lib/utilities";
import type {
  ProductCardHeadingLevel,
  ProductCardImageRatio,
  ProductCardQuickAddHandler,
  ProductCardVariant,
} from "@/types/product-card";

export interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  imageRatio?: ProductCardImageRatio;
  showAlternateImage?: boolean;
  showBadges?: boolean;
  showColourOptions?: boolean;
  showQuickAdd?: boolean;
  priority?: boolean;
  headingLevel?: ProductCardHeadingLevel;
  collectionLabel?: string;
  quickAddAction?: ProductCardQuickAddHandler;
  className?: string;
}

export function ProductCard({
  product,
  variant = "standard",
  imageRatio = "portrait",
  showAlternateImage,
  showBadges = true,
  showColourOptions,
  showQuickAdd,
  priority = false,
  headingLevel = 3,
  collectionLabel,
  quickAddAction,
  className,
}: ProductCardProps) {
  const productHref = `/products/${product.handle}`;
  const soldOut = isProductSoldOut(product);
  const badges = showBadges ? getProductBadges(product, soldOut) : [];
  const colourOptions = getProductColourOptions(product);
  const actionVariants = getProductCardActionVariants(product);
  const priceRange = getMoneyRange(
    product.variants
      .filter((productVariant) => productVariant.available)
      .map((productVariant) => productVariant.price),
  );
  const resolvedShowAlternate =
    showAlternateImage ?? variant === "standard";
  const resolvedShowColours = showColourOptions ?? variant === "standard";
  const resolvedShowQuickAdd = showQuickAdd ?? variant === "standard";

  return (
    <article
      data-product-id={product.id}
      className={cn(
        "product-card min-w-0",
        variant === "editorial" && "max-w-[34rem]",
        className,
      )}
      data-product-card-variant={variant}
    >
      <ProductCardMedia
        alternateImage={product.images[1]}
        badges={badges}
        imageRatio={imageRatio}
        primaryImage={product.images[0]}
        priority={priority}
        productHref={productHref}
        productTitle={product.title}
        showAlternateImage={resolvedShowAlternate}
        soldOut={soldOut}
      />
      <ProductCardDetails
        collectionLabel={collectionLabel}
        compareAtPrice={product.compareAtPrice}
        headingLevel={headingLevel}
        price={product.price}
        priceRange={priceRange}
        productHref={productHref}
        title={product.title}
        variant={variant}
      >
        <ProductCardActions
          colourOptions={colourOptions}
          productHref={productHref}
          productId={product.id}
          productTitle={product.title}
          quickAddAction={quickAddAction}
          showColourOptions={resolvedShowColours}
          showQuickAdd={resolvedShowQuickAdd}
          soldOut={soldOut}
          variants={actionVariants}
        />
      </ProductCardDetails>
    </article>
  );
}
