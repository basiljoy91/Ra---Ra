import Link from "next/link";

import { ProductCardActions } from "@/components/commerce/product-card/product-card-actions.client";
import { ProductCardMedia } from "@/components/commerce/product-card/product-card-media";
import { ProductPrice } from "@/components/commerce/product-card/product-price";
import type { Product } from "@/lib/commerce";
import {
  getProductBadges,
  getProductCardActionVariants,
  getProductColourOptions,
  isProductSoldOut,
} from "@/lib/commerce";
import { getMoneyRange } from "@/lib/utilities";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

export function CollectionMobileProductCard({
  product,
  quickAddAction,
}: {
  product: Product;
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}) {
  const productHref = `/products/${product.handle}`;
  const soldOut = isProductSoldOut(product);
  const colourOptions = getProductColourOptions(product);
  const actionVariants = getProductCardActionVariants(product);
  const priceRange = getMoneyRange(
    product.variants
      .filter((variant) => variant.available)
      .map((variant) => variant.price),
  );

  return (
    <article className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-[#d8d0c6] py-5 first:pt-0 min-[390px]:grid-cols-[8.5rem_minmax(0,1fr)]">
      <ProductCardMedia
        alternateImage={product.images[1]}
        badges={getProductBadges(product, soldOut)}
        imageRatio="portrait"
        primaryImage={product.images[0]}
        priority={false}
        productHref={productHref}
        productTitle={product.title}
        showAlternateImage={false}
        sizes="(max-width: 767px) 136px, 1px"
        soldOut={soldOut}
      />
      <div className="flex min-w-0 flex-col">
        <h3 className="font-serif text-lg font-semibold leading-tight text-[#171513]">
          <Link className="no-underline hover:underline" href={productHref}>
            {product.title}
          </Link>
        </h3>
        {product.shortDescription ? (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#686057]">
            {product.shortDescription}
          </p>
        ) : null}
        <div className="mt-2">
          <ProductPrice
            compareAtPrice={product.compareAtPrice}
            pending={Boolean(product.priceIsPlaceholder)}
            price={product.price}
            priceRange={priceRange}
          />
        </div>
        <div className="mt-auto">
          <ProductCardActions
            actionLabel="Add to Cart"
            colourOptions={colourOptions}
            productHref={productHref}
            productId={product.id}
            productTitle={product.title}
            quickAddAction={quickAddAction}
            showColourOptions={colourOptions.length > 0}
            showQuickAdd={!product.priceIsPlaceholder}
            soldOut={soldOut}
            variants={actionVariants}
          />
        </div>
      </div>
    </article>
  );
}
