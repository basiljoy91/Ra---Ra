import { ProductDetailTabs } from "@/components/commerce/product-detail/product-detail-tabs.client";
import { ProductPrimaryExperience } from "@/components/commerce/product-detail/product-primary-experience.client";
import { RelatedProducts } from "@/components/commerce/product-detail/related-products";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Product } from "@/lib/commerce";
import type { AddToCartHandler } from "@/types/product-detail";

interface ProductPageTemplateProps {
  product: Product;
  relatedProducts: readonly Product[];
  collection?: { handle: string; title: string };
  addToCartAction: AddToCartHandler;
}

export function ProductPageTemplate({
  product,
  relatedProducts,
  collection,
  addToCartAction,
}: ProductPageTemplateProps) {
  return (
    <article className="product-detail-page">
      <Section as="div" className="pb-6 pt-5 sm:pb-8 sm:pt-7" spacing="sm">
        <Container>
          <ProductPrimaryExperience
            addToCartAction={addToCartAction}
            product={product}
            {...(collection ? { collectionTitle: collection.title } : {})}
          />
        </Container>
      </Section>
      <ProductDetailTabs product={product} />
      <RelatedProducts products={relatedProducts} />
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </article>
  );
}
