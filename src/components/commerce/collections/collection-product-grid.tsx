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
      className="hidden gap-x-4 gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3 min-[80rem]:grid-cols-4"
      role="list"
    >
      {products.map((product) => (
        <li className="min-w-0" key={product.id}>
          <ProductCard
            collectionLabel={collectionLabel}
            headingLevel={3}
            imageSizes="(min-width: 1280px) 18vw, (min-width: 1024px) 24vw, (min-width: 768px) 46vw, 1px"
            priority={false}
            product={product}
            {...(quickAddAction ? { quickAddAction } : {})}
          />
        </li>
      ))}
    </ul>
  );
}
