import type { Metadata } from "next";

import { CartPageClient } from "@/components/commerce/cart/cart-page-client";
import { NewsletterSection } from "@/components/forms/newsletter/newsletter-section";
import { getCartServiceConfiguration, getFreeShippingThreshold } from "@/config/cart.server";
import { editorialHomepage } from "@/config/editorial-homepage";
import { commerceQuickAdd } from "@/features/cart/commerce-cart";
import { submitDevelopmentNewsletter } from "@/features/newsletter/development-newsletter-signup";
import { getProductByHandle, getProducts } from "@/lib/commerce/shopify/provider";
import { getCommerceRequestContext } from "@/lib/commerce/shopify/request-context";
import type { GiftWrapService } from "@/types/cart";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your RA & RA selection before continuing to Shopify checkout.",
  robots: { index: false, follow: false },
};

export default async function CartPage() {
  const context = await getCommerceRequestContext();
  const services = getCartServiceConfiguration();
  const [products, giftProduct] = await Promise.all([
    getProducts({ collectionHandle: "beyond", limit: 8 }, context).catch(() => []),
    services.giftWrapProductHandle
      ? getProductByHandle(services.giftWrapProductHandle, context).catch(() => null)
      : Promise.resolve(null),
  ]);
  const giftVariant = giftProduct?.variants.find(
    (variant) => variant.id === services.giftWrapVariantId,
  );
  const giftWrapService: GiftWrapService | undefined =
    giftProduct && giftVariant && services.giftWrapVariantId
      ? {
          variantId: services.giftWrapVariantId,
          productHandle: giftProduct.handle,
          title: giftProduct.title,
          price: giftVariant.price,
          ...(giftVariant.image ?? giftProduct.images[0]
            ? { image: giftVariant.image ?? giftProduct.images[0] }
            : {}),
          available: giftVariant.available,
        }
      : undefined;

  return (
    <div data-cart-page className="bg-[#f6f0ea] text-[#181512]">
      <CartPageClient
        freeShippingThreshold={getFreeShippingThreshold(context.countryCode)}
        giftWrapService={giftWrapService}
        quickAddAction={commerceQuickAdd}
        recommendations={products.filter(
          (product) => product.handle !== services.giftWrapProductHandle,
        )}
      />
      <NewsletterSection
        action={submitDevelopmentNewsletter}
        config={editorialHomepage.newsletter}
      />
    </div>
  );
}

