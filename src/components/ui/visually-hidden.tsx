import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utilities";

export type VisuallyHiddenProps = ComponentPropsWithoutRef<"span">;

export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]",
      className,
    )}
    {...props}
  />
));

VisuallyHidden.displayName = "VisuallyHidden";
