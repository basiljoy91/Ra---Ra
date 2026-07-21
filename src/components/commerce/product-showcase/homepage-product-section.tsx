import { ProductGrid } from "@/components/commerce/product-showcase/product-grid";
import { ProductSectionHeader } from "@/components/commerce/product-showcase/product-section-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Product } from "@/lib/commerce";
import type { HomepageProductSectionConfig } from "@/types/homepage-product-section";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface HomepageProductSectionProps {
  config: HomepageProductSectionConfig;
  products: readonly Product[];
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}

export function HomepageProductSection({
  config,
  products,
  quickAddAction,
}: HomepageProductSectionProps) {
  if (products.length === 0 && config.hideWhenEmpty !== false) {
    return null;
  }

  const headingId = `${config.id}-heading`;

  return (
    <Section
      aria-labelledby={headingId}
      className="border-t border-border"
      data-homepage-product-section={config.id}
      spacing="lg"
      tone={config.tone ?? "background"}
    >
      <Container>
        <ProductSectionHeader
          cta={config.cta}
          description={config.description}
          eyebrow={config.eyebrow}
          heading={config.heading}
          headingId={headingId}
        />

        {products.length > 0 ? (
          <ProductGrid
            collectionLabel={config.collectionLabel}
            mobileLayout={config.mobileLayout}
            products={products}
            quickAddAction={quickAddAction}
          />
        ) : (
          <p
            className="type-body mt-10 rounded-[var(--radius-panel)] border border-border bg-surface p-6 text-foreground-muted"
            role="status"
          >
            {config.emptyMessage ?? "New products will appear here soon."}
          </p>
        )}
      </Container>
    </Section>
  );
}
