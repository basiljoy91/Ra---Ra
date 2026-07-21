import { ProductCard } from "@/components/commerce/product-card/product-card";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";
import type { HomepageProductMobileLayout } from "@/types/homepage-product-section";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface ProductGridProps {
  products: readonly Product[];
  collectionLabel?: string | undefined;
  mobileLayout?: HomepageProductMobileLayout | undefined;
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}

export function ProductGrid({
  products,
  collectionLabel,
  mobileLayout = "grid",
  quickAddAction,
}: ProductGridProps) {
  return (
    <ul
      className={cn(
        "mt-10 gap-x-5 gap-y-12 md:mt-12",
        mobileLayout === "rail"
          ? "product-rail-scroll -mx-[var(--page-gutter)] grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(16rem,82vw)] overflow-x-auto px-[var(--page-gutter)] pb-5 sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 xl:grid-cols-4"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
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
