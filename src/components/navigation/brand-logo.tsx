import Link from "next/link";

import { cn } from "@/lib/utilities";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

export function BrandLogo({ className, compact = false, onClick }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Ra and Ra home"
      {...(onClick ? { onClick } : {})}
      className={cn(
        "inline-flex min-h-11 items-center whitespace-nowrap font-serif font-semibold leading-none tracking-[-0.035em] no-underline",
        compact ? "text-[1.55rem]" : "text-[1.85rem]",
        className,
      )}
    >
      Ra &amp; Ra
    </Link>
  );
}
