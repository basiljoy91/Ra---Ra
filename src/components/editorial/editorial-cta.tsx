import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonStyles } from "@/components/ui/button";
import type { EditorialCtaConfig } from "@/types/editorial";

interface EditorialCtaProps {
  config: EditorialCtaConfig;
}

export function EditorialCta({ config }: EditorialCtaProps) {
  return (
    <Section aria-labelledby="editorial-cta-heading" spacing="lg" tone="muted">
      <Container width="content">
        <div className="text-center">
          {config.eyebrow ? (
            <p className="type-label text-accent">{config.eyebrow}</p>
          ) : null}
          <h2 className="type-section-heading mt-3" id="editorial-cta-heading">
            {config.heading}
          </h2>
          {config.description ? (
            <p className="type-body mx-auto mt-5 max-w-[38rem] text-foreground-muted">
              {config.description}
            </p>
          ) : null}
          <Link
            className={buttonStyles({ className: "mt-7" })}
            href={config.href}
          >
            {config.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
