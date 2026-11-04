import { EditorialStorefront } from "@/components/homepage/editorial-storefront";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";

export default function Home() {
  return <EditorialStorefront newsletterAction={submitDevelopmentNewsletter} />;
}
