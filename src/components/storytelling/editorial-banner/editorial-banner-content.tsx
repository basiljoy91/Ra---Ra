import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import type { EditorialBannerConfig } from "@/types/editorial-banner";

interface EditorialBannerContentProps {
  config: EditorialBannerConfig;
  headingId: string;
}

export function EditorialBannerContent({
  config,
  headingId,
}: EditorialBannerContentProps) {
  return (
    <div className="flex flex-col justify-center bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-16 lg:px-12 xl:px-16">
      {config.eyebrow ? (
        <p className="type-label text-accent-soft">{config.eyebrow}</p>
      ) : null}
      <h2 className="type-page-heading mt-4 max-w-[12ch]" id={headingId}>
        {config.heading}
      </h2>
      <p className="type-subheading mt-6 max-w-[34rem] text-primary-foreground/80">
        {config.description}
      </p>
      {config.action ? (
        <Link
          className={buttonStyles({
            variant: "secondary",
            size: "md",
            className: "mt-8 w-fit",
          })}
          href={config.action.href}
        >
          {config.action.label}
        </Link>
      ) : null}
    </div>
  );
}
