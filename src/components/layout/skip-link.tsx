import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utilities";

export type SkipLinkProps = ComponentPropsWithoutRef<"a">;

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, children = "Skip to main content", ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "fixed left-[var(--space-4)] top-[var(--space-4)] z-[var(--z-skip-link)] -translate-y-[200%] rounded-[var(--radius-control)] bg-primary px-[var(--space-4)] py-[var(--space-3)] text-primary-foreground shadow-[var(--shadow-raised)] transition-transform focus:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
);

SkipLink.displayName = "SkipLink";
