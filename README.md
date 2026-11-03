# ra&ra storefront

Editorial storefront for ra&ra, built on Next.js App Router, React, strict
TypeScript, and Tailwind CSS.

## Implemented

- Dark editorial homepage with campaign hero, four-product edit, promise strip,
  quality story, limited-edition banner, image gallery, and newsletter section
- Responsive desktop, tablet, and mobile navigation
- Local catalogue search and direct product links
- Responsive collection and product pages backed by development fixtures
- Honest account, cart, newsletter, and checkout availability states
- Accessible dialogs, focus management, reduced-motion support, and responsive
  image loading

The catalogue, prices, availability, newsletter delivery, cart, checkout, and
legal policies remain development fixtures until an approved commerce and email
provider is connected.

## Local scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Copy `.env.example` to `.env.local` only when local overrides or integrations
are introduced. Do not commit secrets.
