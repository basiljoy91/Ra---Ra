import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Product } from "@/lib/commerce";

export function CollectionStorySections({
  products,
}: {
  products: readonly Product[];
}) {
  const stories = products.filter(
    (product) => product.story?.collectionStoryParagraphs?.length,
  );

  if (!stories.length) return null;

  return (
    <Section aria-labelledby="collection-design-stories" spacing="lg" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <p className="type-label text-accent">The four stories</p>
          <h2 className="type-section-heading mt-3" id="collection-design-stories">
            Time. Fear. Reality. Limits.
          </h2>
        </div>
        <div className="mt-12 grid gap-16">
          {stories.map((product, index) => {
            const story = product.story!;
            const image = product.images[2] ?? product.images[0];

            return (
              <article
                className="grid items-start gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(16rem,0.78fr)_minmax(0,1.22fr)] lg:gap-14"
                id={product.handle}
                key={product.id}
              >
                <div className="lg:sticky lg:top-[calc(var(--header-height-desktop)+2rem)]">
                  <p className="type-label text-foreground-muted">
                    {String(index + 1).padStart(2, "0")} / 04
                  </p>
                  <h3 className="mt-3 font-serif text-[clamp(2.1rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                    {product.title}
                  </h3>
                  {story.collectionStoryHeading ? (
                    <p className="mt-4 text-sm font-semibold tracking-[0.12em]">
                      {story.collectionStoryHeading}
                    </p>
                  ) : null}
                  {image ? (
                    <div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] bg-surface">
                      <Image
                        alt={image.alt}
                        className="object-cover"
                        fill
                        sizes="(min-width: 1024px) 32vw, 100vw"
                        src={image.url}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="grid gap-5 text-base leading-8 text-foreground-muted">
                  {story.collectionStoryParagraphs?.map((paragraph, paragraphIndex) => (
                    <p key={`${paragraphIndex}-${paragraph.slice(0, 36)}`}>{paragraph}</p>
                  ))}
                  {story.signatureStatement ? (
                    <blockquote className="mt-3 border-l border-foreground pl-6 font-serif text-2xl leading-snug text-foreground">
                      “{story.signatureStatement}”
                    </blockquote>
                  ) : null}
                  <Link
                    className="mt-3 w-fit border-b border-foreground pb-1 text-sm font-semibold"
                    href={`/products/${product.handle}`}
                  >
                    Explore {product.title}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
