import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utilities";

type SectionSpacing = "sm" | "md" | "lg" | "xl";
type SectionTone = "background" | "surface" | "muted";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  spacing?: SectionSpacing;
  tone?: SectionTone;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-[var(--section-space-sm)]",
  md: "py-[var(--section-space-md)]",
  lg: "py-[var(--section-space-lg)]",
  xl: "py-[var(--section-space-xl)]",
};

const toneClasses: Record<SectionTone, string> = {
  background: "bg-background",
  surface: "bg-surface",
  muted: "bg-surface-muted",
};

export function Section({
  as: Element = "section",
  spacing = "lg",
  tone = "background",
  className,
  ...props
}: SectionProps) {
  return (
    <Element
      className={cn(spacingClasses[spacing], toneClasses[tone], className)}
      {...props}
    />
  );
}
