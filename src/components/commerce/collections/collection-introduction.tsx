import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getStorefrontCollectionTheme } from "@/config/storefront-collection-themes";
import { cn } from "@/lib/utilities";
import type { CollectionCatalogEntry } from "@/types/collection";

interface CollectionIntroductionProps {
  entry: CollectionCatalogEntry;
}

export function CollectionIntroduction({
  entry,
}: CollectionIntroductionProps) {
  const { story } = entry;
  const quoteBlock = story.editorialBlocks?.find(
    (block) => block.type === "quote",
  );
  const theme = getStorefrontCollectionTheme(entry.collection.themeKey);

  if (!story.longDescription && !story.inspiration && !quoteBlock) {
    return null;
  }

  return (
    <Section className="border-b border-border" spacing="sm" tone="background">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <h2 className="type-label text-accent">The Collection Story</h2>
            {story.longDescription ? (
              <p className="type-subheading mt-4 text-foreground-muted">
                {story.longDescription}
              </p>
            ) : null}
            {story.inspiration ? (
              <p className="type-body mt-4 text-foreground-muted">
                {story.inspiration}
              </p>
            ) : null}
          </div>
          {quoteBlock ? (
            <blockquote
              className={cn(
                "rounded-[var(--radius-panel)] border p-6 sm:p-8",
                theme.storyClassName,
              )}
            >
              <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em]">
                “{quoteBlock.quote}”
              </p>
              {quoteBlock.attribution ? (
                <footer className="type-caption mt-5 text-foreground-muted">
                  {quoteBlock.attribution}
                </footer>
              ) : null}
            </blockquote>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
