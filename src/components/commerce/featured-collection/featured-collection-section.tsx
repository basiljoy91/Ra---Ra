import { CollectionCampaignMedia } from "@/components/commerce/featured-collection/collection-campaign-media";
import { CollectionStory } from "@/components/commerce/featured-collection/collection-story";
import { FeaturedProductList } from "@/components/commerce/featured-collection/featured-product-list";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getFeaturedCollectionTheme } from "@/config/collection-themes";
import type { Collection, Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";
import type { FeaturedCollectionPresentation } from "@/types/featured-collection";

interface FeaturedCollectionSectionProps {
  collection: Collection;
  featuredProducts: readonly Product[];
  presentation: FeaturedCollectionPresentation;
}

const HEADING_ID = "featured-collection-heading";

export function FeaturedCollectionSection({
  collection,
  featuredProducts,
  presentation,
}: FeaturedCollectionSectionProps) {
  const theme = getFeaturedCollectionTheme(collection.themeKey);
  const storyRight = presentation.layout === "story-right";

  return (
    <Section
      aria-labelledby={HEADING_ID}
      className="border-t border-border"
      data-collection-theme={collection.themeKey}
      spacing="lg"
      tone={theme.sectionTone}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className={cn(storyRight && "lg:order-2")}>
            <CollectionStory
              collection={collection}
              eyebrowClassName={theme.eyebrowClassName}
              headingId={HEADING_ID}
              presentation={presentation}
            />
          </div>

          <div className={cn(storyRight && "lg:order-1")}>
            <CollectionCampaignMedia
              focalPoint={presentation.mediaFocalPoint}
              frameClassName={theme.campaignFrameClassName}
              image={collection.heroImage}
            />
            <FeaturedProductList
              frameClassName={theme.productFrameClassName}
              heading={presentation.productPreviewHeading}
              products={featuredProducts}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
