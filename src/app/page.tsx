import { HomepageDiscovery } from "@/components/commerce/discovery/homepage-discovery";
import { ShopByCollectionSection } from "@/components/commerce/collection-navigation/shop-by-collection-section";
import { FeaturedCollectionSection } from "@/components/commerce/featured-collection/featured-collection-section";
import { HomepageProductSection } from "@/components/commerce/product-showcase/homepage-product-section";
import { CampaignHero } from "@/components/storytelling/campaign-hero";
import { BrandPromiseSection } from "@/components/storytelling/brand-promise/brand-promise-section";
import { EmotionalEditorialBanner } from "@/components/storytelling/editorial-banner/emotional-editorial-banner";
import { ReviewSection } from "@/components/storytelling/reviews/review-section";
import { NewsletterSection } from "@/components/forms/newsletter/newsletter-section";
import { CommunityGridSection } from "@/components/storytelling/community/community-grid-section";
import {
  homepageBrandPromise,
  homepageBestSellers,
  homepageCollections,
  homepageCommunity,
  homepageDiscovery,
  homepageEditorialBanner,
  homepageFeaturedCollection,
  homepageHero,
  homepageNewArrivals,
  homepageNewsletter,
  homepageReviews,
} from "@/config/homepage";
import { siteConfig } from "@/config/site";
import { developmentCollection } from "@/data/development/mock-commerce";
import { developmentQuickAdd } from "@/features/cart/development-quick-add";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";

export default function Home() {
  const featuredProducts = homepageFeaturedCollection.featuredProductIds.flatMap(
    (productId) =>
      developmentCollection.products.filter(
        (product) => product.id === productId,
      ),
  );
  const newArrivalProducts = developmentCollection.products
    .filter((product) => "isNew" in product && product.isNew)
    .slice(0, homepageNewArrivals.productLimit);
  const bestSellerProducts = developmentCollection.products
    .filter((product) => "isBestSeller" in product && product.isBestSeller)
    .slice(0, homepageBestSellers.productLimit);

  return (
    <>
      <CampaignHero config={homepageHero} />
      <HomepageDiscovery config={homepageDiscovery} />
      <FeaturedCollectionSection
        collection={developmentCollection}
        featuredProducts={featuredProducts}
        presentation={homepageFeaturedCollection}
      />
      <HomepageProductSection
        config={homepageNewArrivals}
        products={newArrivalProducts}
        quickAddAction={developmentQuickAdd}
      />
      <BrandPromiseSection config={homepageBrandPromise} />
      <ShopByCollectionSection config={homepageCollections} />
      <HomepageProductSection
        config={homepageBestSellers}
        products={bestSellerProducts}
        quickAddAction={developmentQuickAdd}
      />
      <EmotionalEditorialBanner config={homepageEditorialBanner} />
      {siteConfig.reviewsEnabled ? (
        <ReviewSection config={homepageReviews} reviews={[]} />
      ) : null}
      {siteConfig.newsletterEnabled ? (
        <NewsletterSection
          config={homepageNewsletter}
          action={submitDevelopmentNewsletter}
        />
      ) : null}
      {siteConfig.communityEnabled ? (
        <CommunityGridSection config={homepageCommunity} items={[]} />
      ) : null}
    </>
  );
}
