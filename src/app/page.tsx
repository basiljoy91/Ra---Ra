import { HomepageDiscovery } from "@/components/commerce/discovery/homepage-discovery";
import { FeaturedCollectionSection } from "@/components/commerce/featured-collection/featured-collection-section";
import { CampaignHero } from "@/components/storytelling/campaign-hero";
import {
  homepageDiscovery,
  homepageFeaturedCollection,
  homepageHero,
} from "@/config/homepage";
import { developmentCollection } from "@/data/development/mock-commerce";

export default function Home() {
  const featuredProducts = homepageFeaturedCollection.featuredProductIds.flatMap(
    (productId) =>
      developmentCollection.products.filter(
        (product) => product.id === productId,
      ),
  );

  return (
    <>
      <CampaignHero config={homepageHero} />
      <HomepageDiscovery config={homepageDiscovery} />
      <FeaturedCollectionSection
        collection={developmentCollection}
        featuredProducts={featuredProducts}
        presentation={homepageFeaturedCollection}
      />
    </>
  );
}
