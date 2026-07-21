import type { Metadata } from "next";

import { ProductCard } from "@/components/commerce/product-card/product-card";
import { ProductCardSkeleton } from "@/components/commerce/product-card/product-card-skeleton";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { developmentProducts } from "@/data/development/mock-commerce";
import { developmentQuickAdd } from "@/features/cart/development-quick-add";

export const metadata: Metadata = {
  title: "Product Card Development Showcase",
  description:
    "Development-only verification page for the Ra & Ra product-card system.",
  robots: { index: false, follow: false },
};

export default function ProductCardDevelopmentPage() {
  const standardProducts = developmentProducts;
  const compactProduct = developmentProducts[1];
  const editorialProduct = developmentProducts[2];

  return (
    <>
      <Section spacing="md" tone="surface">
        <Container width="content">
          <p className="type-label text-accent">Development-only route</p>
          <h1 className="type-page-heading mt-3">Product Card System</h1>
          <p className="type-body mt-5 text-foreground-muted">
            Temporary component verification for available, multi-option,
            alternate-image, badged, sold-out, long-title and missing-image
            states. Quick add validates selections without updating a real cart.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="standard-cards-heading" spacing="md">
        <Container>
          <h2 className="type-section-heading" id="standard-cards-heading">
            Standard cards
          </h2>
          <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {standardProducts.map((product) => (
              <ProductCard
                collectionLabel="Development Pet Stories"
                key={product.id}
                product={product}
                quickAddAction={developmentQuickAdd}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby="presentation-variants-heading"
        spacing="md"
        tone="muted"
      >
        <Container>
          <h2
            className="type-section-heading"
            id="presentation-variants-heading"
          >
            Controlled variants
          </h2>
          <div className="mt-8 grid items-start gap-10 md:grid-cols-2">
            {compactProduct ? (
              <div className="max-w-[20rem]">
                <p className="type-label mb-4 text-foreground-muted">Compact</p>
                <ProductCard
                  imageRatio="square"
                  product={compactProduct}
                  variant="compact"
                />
              </div>
            ) : null}
            {editorialProduct ? (
              <div>
                <p className="type-label mb-4 text-foreground-muted">
                  Editorial
                </p>
                <ProductCard
                  collectionLabel="Development Pet Stories"
                  product={editorialProduct}
                  variant="editorial"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="skeleton-heading" spacing="md">
        <Container>
          <h2 className="type-section-heading" id="skeleton-heading">
            Loading skeleton
          </h2>
          <p className="sr-only" role="status">
            Loading products
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton className="hidden lg:block" />
          </div>
        </Container>
      </Section>
    </>
  );
}
