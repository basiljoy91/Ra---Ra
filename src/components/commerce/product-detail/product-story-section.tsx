import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Product } from "@/lib/commerce";

interface ProductStorySectionProps {
  product: Product;
}

export function ProductStorySection({ product }: ProductStorySectionProps) {
  const story = product.story;

  if (!story) {
    return null;
  }

  const storyImage = story.image ?? product.images[1];

  return (
    <Section aria-labelledby="product-story-heading" spacing="lg" tone="muted">
      <Container>
        <div
          className={
            storyImage
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(20rem,0.94fr)] lg:gap-16"
              : "mx-auto max-w-[var(--container-content)]"
          }
        >
          {storyImage ? (
            <figure className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-media)] bg-surface">
              <Image
                alt={storyImage.alt}
                className="h-full w-full object-contain"
                height={storyImage.height ?? 1254}
                loading="lazy"
                sizes="(min-width: 1024px) 52vw, 100vw"
                src={storyImage.url}
                width={storyImage.width ?? 1254}
              />
            </figure>
          ) : null}
          <div className="flow-space">
            <p className="type-label text-accent">
              {story.eyebrow ?? "The Story Behind the Design"}
            </p>
            <h2 className="type-section-heading" id="product-story-heading">
              {story.title}
            </h2>
            {story.corePhilosophy ? (
              <p className="type-subheading max-w-[40rem] text-foreground">
                {story.corePhilosophy}
              </p>
            ) : null}
            <div className="grid max-w-[42rem] gap-4 text-base leading-7 text-foreground-muted">
              {(story.productStoryParagraphs ?? [story.shortStory]).map(
                (paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
                ),
              )}
            </div>
            {story.emotionalMessage ? (
              <p className="type-body max-w-[40rem] text-foreground-muted">
                {story.emotionalMessage}
              </p>
            ) : null}
            {story.artworkMeaning ? (
              <div className="border-l border-accent pl-5">
                <p className="type-label text-foreground-muted">Artwork meaning</p>
                <p className="mt-2 text-foreground">{story.artworkMeaning}</p>
              </div>
            ) : null}
            {story.signatureStatement ?? story.quote ? (
              <blockquote className="border-l border-foreground pl-5 font-serif text-2xl leading-snug text-foreground">
                “{story.signatureStatement ?? story.quote}”
              </blockquote>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
