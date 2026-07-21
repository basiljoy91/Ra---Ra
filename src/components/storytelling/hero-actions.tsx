import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import type { HeroAction } from "@/types/hero";

interface HeroActionsProps {
  actions: readonly HeroAction[];
}

export function HeroActions({ actions }: HeroActionsProps) {
  return (
    <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {actions.map((action) => (
        <Link
          key={`${action.href}-${action.label}`}
          href={action.href}
          className={buttonStyles({
            variant: action.variant,
            size: "lg",
            className: "w-full sm:w-auto",
          })}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}
