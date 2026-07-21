import { ProductCard } from "@/components/commerce/product-card/product-card";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";
import type { HomepageProductMobileLayout } from "@/types/homepage-product-section";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface ProductGridProps {
  products: readonly Product[];
  collectionLabel?: string | undefined;
  maxColumns?: 2 | 3 | 4 | undefined;
  mobileLayout?: HomepageProductMobileLayout | undefined;
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}

export function ProductGrid({
  products,
  collectionLabel,
  maxColumns = 4,
  mobileLayout = "grid",
  quickAddAction,
}: ProductGridProps) {
  const imageSizes =
    mobileLayout === "rail"
      ? "(min-width: 1280px) 22vw, (min-width: 768px) 31vw, (min-width: 640px) 50vw, 82vw"
      : maxColumns === 2
        ? "(min-width: 1024px) 28rem, (min-width: 640px) 50vw, 100vw"
        : maxColumns === 3
          ? "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          : "(min-width: 1280px) 22vw, (min-width: 768px) 31vw, (min-width: 640px) 50vw, 100vw";

  return (
    <ul
      className={cn(
        "mt-10 gap-x-5 gap-y-12 md:mt-12",
        mobileLayout === "rail"
          ? "product-rail-scroll -mx-[var(--page-gutter)] grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(16rem,82vw)] overflow-x-auto px-[var(--page-gutter)] pb-5 sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-4"
          : cn(
              "grid grid-cols-1 sm:grid-cols-2",
              maxColumns === 2 && "lg:mx-auto lg:max-w-4xl",
              maxColumns === 3 && "lg:grid-cols-3",
              maxColumns === 4 && "md:grid-cols-3 xl:grid-cols-4",
            ),
      )}
    >
      {products.map((product) => (
        <li
          className={cn(
            "min-w-0",
            mobileLayout === "rail" && "snap-start",
          )}
          key={product.id}
        >
          <ProductCard
            headingLevel={3}
            imageSizes={imageSizes}
            priority={false}
            product={product}
            {...(collectionLabel ? { collectionLabel } : {})}
            {...(quickAddAction ? { quickAddAction } : {})}
          />
        </li>
      ))}
    </ul>
  );
}
