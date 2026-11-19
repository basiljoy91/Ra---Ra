import { CollectionMobileProductCard } from "@/components/commerce/collections/collection-mobile-product-card";
import type { Product } from "@/lib/commerce";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

export function CollectionMobileProductList({
  products,
  quickAddAction,
}: {
  products: readonly Product[];
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}) {
  return (
    <ul className="mt-6 md:hidden" role="list">
      {products.map((product) => (
        <li key={product.id}>
          <CollectionMobileProductCard
            product={product}
            quickAddAction={quickAddAction}
          />
        </li>
      ))}
    </ul>
  );
}
