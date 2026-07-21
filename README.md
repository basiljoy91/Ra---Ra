# Ra & Ra storefront

Phase 1 establishes the technical foundation for the Ra & Ra story-led apparel storefront. The current root route is intentionally a temporary development screen, not the production homepage.

## Foundation

- Next.js App Router, React and strict TypeScript
- Tailwind CSS with centralized semantic tokens
- `next/font` display and body font variables
- Accessible root layout, skip link, focus and reduced-motion defaults
- Provider-neutral commerce contracts and isolated mock data
- Reusable layout and button primitives

## Local scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Copy `.env.example` to `.env.local` only when local overrides or integrations are introduced. Never commit secrets.
