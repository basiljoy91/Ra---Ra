import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utilities";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article";
  gap?: StackGap;
}

const gapClasses: Record<StackGap, string> = {
  xs: "gap-[var(--space-2)]",
  sm: "gap-[var(--space-3)]",
  md: "gap-[var(--space-5)]",
  lg: "gap-[var(--space-8)]",
  xl: "gap-[var(--space-12)]",
};

export function Stack({
  as: Element = "div",
  gap = "md",
  className,
  ...props
}: StackProps) {
  return (
    <Element className={cn("flex flex-col", gapClasses[gap], className)} {...props} />
  );
}
