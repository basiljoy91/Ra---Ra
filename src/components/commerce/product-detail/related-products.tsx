import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { ProductPrice } from "@/components/commerce/product-card/product-price";
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
    <Section aria-labelledby="related-products-heading" className="pb-12 pt-8" spacing="sm">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em]" id="related-products-heading">
            {productPageConfig.relatedProductsHeading}
          </h2>
          <Link className="inline-flex items-center gap-2 text-xs font-semibold no-underline" href="/collections/beyond">
            View all
            <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
          </Link>
        </div>
        <ul
          className="product-rail-scroll -mx-[var(--page-gutter)] mt-5 grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(13rem,72vw)] gap-4 overflow-x-auto px-[var(--page-gutter)] pb-5 sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          role="list"
        >
          {products.slice(0, 4).map((product) => {
            const image = product.images[1] ?? product.images[0];

            return (
              <li className="min-w-0 snap-start" key={product.id}>
                <article className="overflow-hidden rounded-xl border border-border bg-surface">
                  <Link
                    aria-label={`View ${product.title}`}
                    className="relative block aspect-[4/5] overflow-hidden bg-[#eeece8] no-underline"
                    href={`/products/${product.handle}`}
                  >
                    {image ? (
                      <Image
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                        fill
                        sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 72vw"
                        src={image.url}
                      />
                    ) : null}
                  </Link>
                  <div className="grid grid-cols-[minmax(0,1fr)_2.75rem] gap-2 p-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium">
                        <Link className="no-underline" href={`/products/${product.handle}`}>
                          {product.title}
                        </Link>
                      </h3>
                      <div className="mt-2">
                        <ProductPrice
                          compareAtPrice={product.compareAtPrice}
                          price={product.price}
                        />
                      </div>
                    </div>
                    <button aria-label={`Save ${product.title}`} className="grid size-11 place-items-center rounded-full" type="button">
                      <Heart aria-hidden="true" className="size-4" strokeWidth={1.7} />
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
