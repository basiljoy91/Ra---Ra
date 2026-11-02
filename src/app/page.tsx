import { BenefitStrip } from "@/components/homepage/benefit-strip";
import { CampaignBanner } from "@/components/homepage/campaign-banner";
import { EditorialHero } from "@/components/homepage/editorial-hero";
import { EditorialJourney } from "@/components/homepage/editorial-journey";
import { FeaturedEdit } from "@/components/homepage/featured-edit";
import { HomepageNewsletter } from "@/components/homepage/homepage-newsletter";
import styles from "@/components/homepage/homepage.module.css";
import { QualityStory } from "@/components/homepage/quality-story";
import { RevealOnScroll } from "@/components/homepage/reveal-on-scroll.client";
import { editorialHomepage } from "@/config/editorial-homepage";
import { developmentProducts } from "@/data/development/mock-commerce";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";

function findProduct(productId: string) {
  return developmentProducts.find((product) => product.id === productId);
}

export default function Home() {
  const featuredItems = editorialHomepage.featuredEdit.items.flatMap((item) => {
    const product = findProduct(item.productId);

    return product
      ? [
          {
            product,
            displayName: item.displayName,
            category: item.category,
            imagePosition: item.imagePosition,
          },
        ]
      : [];
  });
  return (
    <div className={styles.page}>
      <EditorialHero content={editorialHomepage.hero} />
      <FeaturedEdit items={featuredItems} />

      <RevealOnScroll>
        <BenefitStrip items={editorialHomepage.benefits} />
      </RevealOnScroll>

      <RevealOnScroll>
        <QualityStory content={editorialHomepage.quality} />
      </RevealOnScroll>

      <RevealOnScroll>
        <CampaignBanner content={editorialHomepage.campaign} />
      </RevealOnScroll>

      <RevealOnScroll>
        <EditorialJourney content={editorialHomepage.journey} />
      </RevealOnScroll>

      <RevealOnScroll>
        <HomepageNewsletter
          action={submitDevelopmentNewsletter}
          config={editorialHomepage.newsletter}
        />
      </RevealOnScroll>
    </div>
  );
}
