import { EditorialStorefront } from "@/components/homepage/editorial-storefront";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";
import { getProducts } from "@/lib/commerce/shopify/provider";

export default async function Home() {
  const products = await getProducts({ collectionHandle: "beyond", limit: 16 });
  return (
    <EditorialStorefront
      newsletterAction={submitDevelopmentNewsletter}
      products={products}
    />
  );
}
