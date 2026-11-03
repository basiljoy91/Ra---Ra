import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/components/homepage/homepage.module.css";
import { Container } from "@/components/layout/container";
import type { Product, ProductImage } from "@/lib/commerce";

export interface FeaturedEditItem {
  product: Product;
  displayName: string;
  category: string;
  imagePosition: string;
}

function displayImage(product: Product): ProductImage | undefined {
  return product.images[0];
}

export function FeaturedEdit({ items }: { items: readonly FeaturedEditItem[] }) {
  return (
    <section
      className={styles.featured}
      aria-labelledby="featured-edit-title"
    >
      <Container>
        <h2 id="featured-edit-title" className="sr-only">
          Featured collection
        </h2>
        <div className={styles.featuredGrid}>
          {items.map(({ product, displayName, category, imagePosition }) => {
            const image = displayImage(product);

            return (
              <Link
                className={styles.productCard}
                href={`/products/${product.handle}`}
                key={product.id}
              >
                {image ? (
                  <Image
                    alt={image.alt}
                    className={styles.productCardImage}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 47vw, 76vw"
                    src={image.url}
                    style={{ objectPosition: imagePosition }}
                    loading="lazy"
                  />
                ) : null}
                <div className={styles.productCardContent}>
                  <div>
                    <h3 className={styles.productCardName}>{displayName}</h3>
                    <p className={styles.productCardCategory}>{category}</p>
                  </div>
                  <span className={styles.productCardArrow} aria-hidden="true">
                    <ArrowRight size={21} strokeWidth={1.1} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
