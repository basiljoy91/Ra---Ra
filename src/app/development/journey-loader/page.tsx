import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JourneyLoader } from "@/components/ui/journey-loader";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Journey Loader Development Showcase",
  robots: {
    index: false,
    follow: false,
  },
};

interface JourneyLoaderShowcaseProps {
  searchParams: Promise<{ fullscreen?: string }>;
}

export default async function JourneyLoaderShowcase({
  searchParams,
}: JourneyLoaderShowcaseProps) {
  const { fullscreen } = await searchParams;

  if (fullscreen === "true") {
    return (
      <JourneyLoader
        background="surface"
        fullscreen
        label="Previewing full-screen loading"
        size="large"
      />
    );
  }

  return (
    <>
      <Section spacing="md" tone="surface">
        <Container>
          <p className="type-label text-accent">Development showcase</p>
          <h1 className="type-page-heading mt-3">Journey Loader</h1>
          <p className="type-body mt-5 max-w-2xl text-foreground-muted">
            Inline size, background, duplicate-instance and full-screen states
            for visual and accessibility verification.
          </p>
          <Link
            className={buttonStyles({ variant: "secondary", className: "mt-7" })}
            href="/development/journey-loader?fullscreen=true"
          >
            Preview full-screen state
          </Link>
        </Container>
      </Section>
      <Section aria-labelledby="loader-sizes-heading" spacing="md">
        <Container>
          <h2 className="type-section-heading" id="loader-sizes-heading">
            Inline sizes
          </h2>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-3">
            <div className="rounded-[var(--radius-panel)] border border-border p-5">
              <JourneyLoader label="Loading small preview" size="small" />
            </div>
            <div className="rounded-[var(--radius-panel)] border border-border p-5">
              <JourneyLoader label="Loading medium preview" />
            </div>
            <JourneyLoader
              background="surface"
              label="Loading large preview"
              size="large"
            />
          </div>
        </Container>
      </Section>
      <Section aria-labelledby="duplicate-loaders-heading" spacing="md" tone="muted">
        <Container>
          <h2 className="type-section-heading" id="duplicate-loaders-heading">
            Duplicate-instance safety
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <JourneyLoader label="Loading first duplicate preview" size="small" />
            <JourneyLoader label="Loading second duplicate preview" size="small" />
          </div>
        </Container>
      </Section>
    </>
  );
}
