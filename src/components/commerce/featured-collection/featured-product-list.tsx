import { FeaturedProductPreview } from "@/components/commerce/featured-collection/featured-product-preview";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface FeaturedProductListProps {
  products: readonly Product[];
  heading: string;
  frameClassName: string;
}

export function FeaturedProductList({
  products,
  heading,
  frameClassName,
}: FeaturedProductListProps) {
  if (products.length === 0) {
    return null;
  }

  const visibleProducts = products.slice(0, 3);

  return (
    <section aria-labelledby="featured-products-heading" className="mt-8">
      <h3
        className="type-label mb-4 text-foreground-muted"
        id="featured-products-heading"
      >
        {heading}
      </h3>
      <ul
        className={cn(
          "grid gap-4 sm:grid-cols-3 sm:gap-5",
          visibleProducts.length > 1 ? "grid-cols-2" : "grid-cols-1",
        )}
        role="list"
      >
        {visibleProducts.map((product, index) => (
          <li className={cn(index === 2 && "hidden sm:block")} key={product.id}>
            <FeaturedProductPreview
              frameClassName={frameClassName}
              product={product}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
