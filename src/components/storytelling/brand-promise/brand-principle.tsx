import type { BrandPrincipleData } from "@/types/brand-promise";

interface BrandPrincipleProps {
  index: number;
  principle: BrandPrincipleData;
}

export function BrandPrinciple({
  index,
  principle,
}: BrandPrincipleProps) {
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <li className="grid content-start gap-4 border-t border-border pt-5 sm:pt-6 sm:last:col-span-2 lg:last:col-span-1">
      <span aria-hidden="true" className="type-label text-accent">
        {displayIndex}
      </span>
      <h3 className="type-subheading">{principle.title}</h3>
      <p className="type-body text-foreground-muted">
        {principle.description}
      </p>
    </li>
  );
}
