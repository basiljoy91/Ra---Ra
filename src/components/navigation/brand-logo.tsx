import Link from "next/link";
import Image from "next/image";

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
  const isLockup = large;

  return (
    <Link
      href="/"
      aria-label="Ra & Ra home"
      {...(onClick ? { onClick } : {})}
      className={cn(
        "brand-logo inline-flex min-h-11 items-center justify-center no-underline",
        isLockup
          ? "w-[7.75rem] sm:w-[8.75rem]"
          : compact
            ? "w-9"
            : "w-11",
        className,
      )}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="brand-logo__image h-auto w-full"
        height={isLockup ? 1222 : 945}
        priority={!isLockup}
        sizes={isLockup ? "140px" : compact ? "36px" : "44px"}
        unoptimized
        src={
          isLockup
            ? "/brand/ra-ra-lockup-embroidered.png"
            : "/brand/ra-ra-monogram-embroidered.png"
        }
        width={isLockup ? 1287 : 960}
      />
    </Link>
  );
}
