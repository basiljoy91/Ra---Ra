import { ProductCard } from "@/components/commerce/product-card/product-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { productPageConfig } from "@/config/product-page";
import type { Product } from "@/lib/commerce";

interface RelatedProductsProps {
  products: readonly Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="related-products-heading" spacing="lg">
      <Container>
        <div className="max-w-2xl">
          <p className="type-label text-accent">Related Designs</p>
          <h2 className="type-section-heading mt-3" id="related-products-heading">
            {productPageConfig.relatedProductsHeading}
          </h2>
          <p className="type-body mt-4 text-foreground-muted">
            {productPageConfig.relatedProductsDescription}
          </p>
        </div>
        <ul
          className="product-rail-scroll -mx-[var(--page-gutter)] mt-10 grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(16rem,82vw)] gap-5 overflow-x-auto px-[var(--page-gutter)] pb-5 sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          role="list"
        >
          {products.slice(0, 4).map((product) => (
            <li className="min-w-0 snap-start" key={product.id}>
              <ProductCard
                headingLevel={3}
                imageSizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 82vw"
                product={product}
                showAlternateImage={false}
                showBadges={false}
                showColourOptions={false}
                showQuickAdd={false}
                variant="compact"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
