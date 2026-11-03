import { cn } from "@/lib/utilities";

interface PricePlaceholderProps {
  size?: "small" | "large";
  className?: string;
}

export function PricePlaceholder({
  size = "large",
  className,
}: PricePlaceholderProps) {
  return (
    <div
      aria-label="Price placeholder"
      className={cn("flex items-center gap-3", className)}
      data-price-placeholder
      role="status"
    >
      <span
        aria-hidden="true"
        className={cn(
          "block rounded-full bg-foreground/12",
          size === "large" ? "h-7 w-28" : "h-3.5 w-16",
        )}
      />
      <span className="sr-only">Price will be added later.</span>
    </div>
  );
}
