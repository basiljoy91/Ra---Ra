import type { HeroTheme } from "@/types/hero";

interface HeroOverlayProps {
  theme: HeroTheme;
}

export function HeroOverlay({ theme }: HeroOverlayProps) {
  return (
    <div
      aria-hidden="true"
      data-theme={theme}
      className="hero-overlay pointer-events-none absolute inset-0 z-[1] hidden min-[72rem]:block"
    />
  );
}
