import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`motion-safe:animate-pulse rounded-sm bg-surface-muted ${className}`}
    />
  );
}

export default function ProductLoading() {
  return (
    <article aria-busy="true" aria-label="Loading product">
      <Section as="div" className="pb-6 pt-5 sm:pb-8 sm:pt-7" spacing="sm">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-10 xl:gap-14">
            <div className="grid gap-3 sm:grid-cols-[5rem_minmax(0,1fr)]">
              <div className="hidden gap-3 sm:grid">
                {Array.from({ length: 5 }, (_, index) => (
                  <Skeleton className="aspect-[4/5] w-full" key={index} />
                ))}
              </div>
              <Skeleton className="aspect-[4/5] w-full" />
            </div>

            <div className="grid gap-5 lg:pt-6">
              <Skeleton className="h-7 w-28 rounded-full" />
              <div className="grid gap-3">
                <Skeleton className="h-14 w-full max-w-sm" />
                <Skeleton className="h-14 w-4/5 max-w-xs" />
              </div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-36" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-border pt-5">
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton className="h-11 w-full" key={index} />
                ))}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <Skeleton className="size-12" key={index} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
