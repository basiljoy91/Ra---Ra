import { ProductCard } from "@/components/commerce/product-card/product-card";
import type { Product } from "@/lib/commerce";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface CollectionProductGridProps {
  products: readonly Product[];
  collectionLabel: string;
  quickAddAction?: ProductCardQuickAddHandler;
}

export function CollectionProductGrid({
  products,
  collectionLabel,
  quickAddAction,
}: CollectionProductGridProps) {
  return (
    <ul
      className="mt-8 grid grid-cols-1 gap-x-5 gap-y-12 min-[25rem]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 min-[86rem]:grid-cols-4"
      role="list"
    >
      {products.map((product) => (
        <li className="min-w-0" key={product.id}>
          <ProductCard
            collectionLabel={collectionLabel}
            headingLevel={3}
            imageSizes="(min-width: 1376px) 18vw, (min-width: 1280px) 24vw, (min-width: 1024px) 34vw, (min-width: 768px) 31vw, (min-width: 400px) 50vw, 100vw"
            priority={false}
            product={product}
            {...(quickAddAction ? { quickAddAction } : {})}
          />
        </li>
      ))}
    </ul>
  );
}
