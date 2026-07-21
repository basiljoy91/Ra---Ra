import { Container } from "@/components/layout/container";
import { HeroActions } from "@/components/storytelling/hero-actions";
import { cn } from "@/lib/utilities";
import type { HeroConfig } from "@/types/hero";

interface HeroContentProps {
  config: HeroConfig;
  headingId: string;
}

export function HeroContent({ config, headingId }: HeroContentProps) {
  const alignment = config.alignment ?? "left";
  const theme = config.theme ?? "light";

  return (
    <Container
      className={cn(
        "relative z-[2] flex py-10 sm:py-12 min-[72rem]:min-h-[inherit] min-[72rem]:items-center min-[72rem]:py-16",
        alignment === "center" && "justify-center text-center",
      )}
    >
      <div
        data-alignment={alignment}
        className={cn(
          "hero-content-inner max-w-[31rem]",
          alignment === "center" && "flex flex-col items-center",
          theme === "dark"
            ? "text-primary-foreground"
            : "text-foreground",
        )}
      >
        <div>
          {config.eyebrow ? (
            <p
              className={cn(
                "type-label",
                theme === "dark" ? "text-primary-foreground/80" : "text-accent",
              )}
            >
              {config.eyebrow}
            </p>
          ) : null}

          <h1
            id={headingId}
            className="mt-4 font-serif text-[clamp(3.25rem,10vw,5rem)] font-medium tracking-[-0.04em] leading-[0.92] min-[72rem]:text-[clamp(4.5rem,7vw,6rem)]"
          >
            {config.heading}
          </h1>
        </div>

        <div className="hero-content-body">
          {config.description ? (
            <p
              className={cn(
                "hero-content-description type-subheading mt-6 max-w-[44ch]",
                theme === "dark"
                  ? "text-primary-foreground/85"
                  : "text-foreground-muted",
              )}
            >
              {config.description}
            </p>
          ) : null}

          <HeroActions actions={config.actions} />
        </div>
      </div>
    </Container>
  );
}
