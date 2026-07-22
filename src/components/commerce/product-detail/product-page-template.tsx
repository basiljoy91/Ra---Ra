import { ProductBreadcrumbs } from "@/components/commerce/product-detail/product-breadcrumbs";
import { ProductInformation } from "@/components/commerce/product-detail/product-information";
import { ProductPrimaryExperience } from "@/components/commerce/product-detail/product-primary-experience.client";
import { ProductStorySection } from "@/components/commerce/product-detail/product-story-section";
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
    <article>
      <Section as="div" spacing="sm">
        <Container>
          <ProductBreadcrumbs
            productTitle={product.title}
            {...(collection
              ? {
                  collectionHandle: collection.handle,
                  collectionTitle: collection.title,
                }
              : {})}
          />
          <div className="mt-6 md:mt-8">
            <ProductPrimaryExperience
              addToCartAction={addToCartAction}
              product={product}
              {...(collection ? { collectionTitle: collection.title } : {})}
            />
          </div>
        </Container>
      </Section>
      <ProductStorySection product={product} />
      <ProductInformation product={product} />
      <RelatedProducts products={relatedProducts} />
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </article>
  );
}
