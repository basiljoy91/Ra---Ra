import type { Metadata } from "next";

import { CartPageClient } from "@/components/commerce/cart/cart-page-client";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review your ra&ra selection before continuing to Shopify checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <Section spacing="lg" tone="background">
      <Container>
        <header className="mb-8 sm:mb-10">
          <p className="type-label text-accent">Your selection</p>
          <h1 className="type-page-heading mt-3">Your bag</h1>
        </header>
        <CartPageClient />
      </Container>
    </Section>
  );
}

