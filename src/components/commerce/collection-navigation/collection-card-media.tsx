import Image from "next/image";

import type { ProductImage } from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface CollectionCardMediaProps {
  image?: ProductImage | undefined;
  placeholderLabel?: string | undefined;
  placeholderClassName: string;
  interactive: boolean;
}

export function CollectionCardMedia({
  image,
  placeholderLabel,
  placeholderClassName,
  interactive,
}: CollectionCardMediaProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
      {image ? (
        <Image
          alt={image.alt}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-out",
            interactive && "group-hover:scale-[1.02]",
          )}
          height={image.height ?? 1000}
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={image.url}
          width={image.width ?? 1600}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "grid h-full place-items-center p-8 text-center",
            placeholderClassName,
          )}
        >
          <div className="max-w-sm">
            <p className="type-label text-accent">Ra & Ra</p>
            <p className="mt-4 font-serif text-[clamp(1.75rem,5vw,3rem)] leading-tight tracking-[-0.025em]">
              {placeholderLabel ?? "A new story will begin here."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
