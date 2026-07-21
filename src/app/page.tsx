import { HomepageDiscovery } from "@/components/commerce/discovery/homepage-discovery";
import { ShopByCollectionSection } from "@/components/commerce/collection-navigation/shop-by-collection-section";
import { FeaturedCollectionSection } from "@/components/commerce/featured-collection/featured-collection-section";
import { HomepageProductSection } from "@/components/commerce/product-showcase/homepage-product-section";
import { CampaignHero } from "@/components/storytelling/campaign-hero";
import { BrandPromiseSection } from "@/components/storytelling/brand-promise/brand-promise-section";
import {
  homepageBrandPromise,
  homepageCollections,
  homepageDiscovery,
  homepageFeaturedCollection,
  homepageHero,
  homepageNewArrivals,
} from "@/config/homepage";
import { developmentCollection } from "@/data/development/mock-commerce";
import { developmentQuickAdd } from "@/features/cart/development-quick-add";

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
    </>
  );
}
