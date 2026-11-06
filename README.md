# ra&ra storefront

Editorial storefront for ra&ra, built on Next.js App Router, React, strict
TypeScript, and Tailwind CSS.

## Implemented

- Dark editorial homepage with campaign hero, four-product edit, promise strip,
  quality story, limited-edition banner, image gallery, and newsletter section
- Responsive desktop, tablet, and mobile navigation
- Local catalogue search and direct product links
- Responsive collection and product pages backed by Shopify when configured,
  with local ₹699 test fixtures as a safe fallback
- Persistent Shopify cart, quantity controls, inventory-aware variants, and
  Shopify-hosted checkout
- Accessible dialogs, focus management, reduced-motion support, and responsive
  image loading

Newsletter delivery, customer accounts, production legal policies, and the EU
launch configuration remain intentionally disabled. Commerce uses the Shopify
Storefront API only when all required Shopify environment variables are set.

## Shopify test connection

Copy `.env.example` to `.env.local` and provide the test store's
`*.myshopify.com` domain and private Storefront token. Keep the token server-only
and never prefix it with `NEXT_PUBLIC_`. Products must be active, included in the
India market, and published to the Headless sales channel. The expected
collection handle is `beyond`.

## Local scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Copy `.env.example` to `.env.local` only when local overrides or integrations
are introduced. Do not commit secrets.
