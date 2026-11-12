import { EditorialStorefront } from "@/components/homepage/editorial-storefront";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";
import { getProducts } from "@/lib/commerce/shopify/provider";
import { getCommerceRequestContext } from "@/lib/commerce/shopify/request-context";

export default async function Home() {
  const context = await getCommerceRequestContext();
  const products = await getProducts(
    { collectionHandle: "beyond", limit: 16 },
    context,
  );
  return (
    <EditorialStorefront
      newsletterAction={submitDevelopmentNewsletter}
      products={products}
    />
  );
}
