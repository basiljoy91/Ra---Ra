import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utilities";

import { JourneyIllustration } from "./journey-illustration";
import styles from "./journey-loader.module.css";
import type { JourneyLoaderProps } from "./journey-loader.types";

export function JourneyLoader({
  size = "medium",
  fullscreen = false,
  className,
  label = "Loading",
  background,
}: JourneyLoaderProps) {
  const resolvedBackground = background ?? (fullscreen ? "surface" : "transparent");

  return (
    <div
      aria-atomic="true"
      aria-busy="true"
      aria-label={label}
      aria-live="polite"
      className={cn(styles.root, className)}
      data-background={resolvedBackground}
      data-fullscreen={fullscreen ? "true" : "false"}
      data-size={size}
      role="status"
    >
      <div className={styles.artwork}>
        <JourneyIllustration />
      </div>
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
}
