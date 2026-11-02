import Link from "next/link";

import { cn } from "@/lib/utilities";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export function BrandLogo({
  className,
  compact = false,
  large = false,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="ra&ra home"
      {...(onClick ? { onClick } : {})}
      className={cn(
        "inline-flex min-h-11 items-center whitespace-nowrap font-serif font-medium leading-none tracking-[0.055em] no-underline",
        compact
          ? "text-[1.6rem]"
          : large
            ? "text-[clamp(2.5rem,5vw,4.25rem)]"
            : "text-[2rem]",
        className,
      )}
    >
      ra&amp;ra
    </Link>
  );
}
