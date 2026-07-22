import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { productPageConfig } from "@/config/product-page";
import type { Product } from "@/lib/commerce";

interface ProductInformationProps {
  product: Product;
}

export function ProductInformation({ product }: ProductInformationProps) {
  const details = product.details;
  const hasProductDetails = Boolean(
    details?.material ||
      details?.fit ||
      details?.care?.length ||
      details?.artworkPlacement ||
      details?.manufacturing,
  );

  return (
    <Section aria-labelledby="product-information-heading" spacing="lg" tone="surface">
      <Container width="content">
        <div className="text-center">
          <p className="type-label text-accent">Useful Details</p>
          <h2 className="type-section-heading mt-3" id="product-information-heading">
            Product Information
          </h2>
        </div>
        <div className="mt-10 border-y border-border">
          {hasProductDetails ? (
            <details className="group border-b border-border py-1" open>
              <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-3 font-semibold marker:content-none">
                Product details
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform group-open:rotate-180"
                  strokeWidth={1.6}
                />
              </summary>
              <dl className="grid gap-4 pb-6 text-sm sm:grid-cols-2">
                {details?.material ? (
                  <div>
                    <dt className="font-semibold">Material</dt>
                    <dd className="mt-1 text-foreground-muted">{details.material}</dd>
                  </div>
                ) : null}
                {details?.fit ? (
                  <div>
                    <dt className="font-semibold">Fit</dt>
                    <dd className="mt-1 text-foreground-muted">{details.fit}</dd>
                  </div>
                ) : null}
                {details?.artworkPlacement ? (
                  <div>
                    <dt className="font-semibold">Artwork placement</dt>
                    <dd className="mt-1 text-foreground-muted">
                      {details.artworkPlacement}
                    </dd>
                  </div>
                ) : null}
                {details?.manufacturing ? (
                  <div>
                    <dt className="font-semibold">Production</dt>
                    <dd className="mt-1 text-foreground-muted">
                      {details.manufacturing}
                    </dd>
                  </div>
                ) : null}
                {details?.care?.length ? (
                  <div className="sm:col-span-2">
                    <dt className="font-semibold">Care</dt>
                    <dd className="mt-1 text-foreground-muted">
                      <ul className="list-disc space-y-1 pl-5">
                        {details.care.map((instruction) => (
                          <li key={instruction}>{instruction}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </details>
          ) : null}
          <details className="group border-b border-border py-1">
            <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-3 font-semibold marker:content-none">
              Shipping information
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform group-open:rotate-180"
                strokeWidth={1.6}
              />
            </summary>
            <div className="pb-6 text-sm text-foreground-muted">
              <p>{details?.shippingSummary ?? productPageConfig.shippingSummary}</p>
              <Link className="mt-3 inline-block font-semibold text-foreground" href="/shipping">
                View shipping information
              </Link>
            </div>
          </details>
          <details className="group py-1">
            <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-3 font-semibold marker:content-none">
              Return information
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform group-open:rotate-180"
                strokeWidth={1.6}
              />
            </summary>
            <div className="pb-6 text-sm text-foreground-muted">
              <p>{details?.returnSummary ?? productPageConfig.returnSummary}</p>
              <Link className="mt-3 inline-block font-semibold text-foreground" href="/returns">
                View return information
              </Link>
            </div>
          </details>
        </div>
      </Container>
    </Section>
  );
}
