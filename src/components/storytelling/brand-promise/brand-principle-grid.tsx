import { BrandPrinciple } from "@/components/storytelling/brand-promise/brand-principle";
import type { BrandPrincipleData } from "@/types/brand-promise";

interface BrandPrincipleGridProps {
  principles: readonly BrandPrincipleData[];
}

export function BrandPrincipleGrid({
  principles,
}: BrandPrincipleGridProps) {
  return (
    <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-x-10">
      {principles.map((principle, index) => (
        <BrandPrinciple
          index={index}
          key={principle.id}
          principle={principle}
        />
      ))}
    </ol>
  );
}
