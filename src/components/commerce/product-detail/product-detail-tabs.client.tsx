"use client";

import Image from "next/image";
import { Check, Layers3, Ruler, Shirt } from "lucide-react";
import { useState } from "react";

import { SizeGuideDrawer } from "@/components/commerce/product-detail/size-guide-drawer.client";
import styles from "@/components/commerce/product-detail/product-detail-mobile.module.css";
import { Container } from "@/components/layout/container";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface ProductDetailTabsProps {
  product: Product;
}

const tabs = ["Details", "Materials", "Size & Fit"] as const;
type Tab = (typeof tabs)[number];

function getTabId(tab: Tab): string {
  return tab.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const details = product.details;
  const detailImage =
    product.images.find((image) => image.url.includes("artwork-detail")) ??
    product.images.find((image) => image.url.includes("collar-detail")) ??
    product.images[1] ??
    product.images[0];
  const detailPoints = [
    { id: "fit", text: details?.fit ?? "Boxy oversized unisex fit" },
    { id: "material", text: details?.material ?? "280 GSM, 100% Supima cotton" },
    {
      id: "artwork-placement",
      text:
        details?.artworkPlacement ??
        product.artworkPlacement ??
        "Signature chest and back artwork",
    },
    { id: "surface", text: details?.surface ?? "Dense, smooth, matte and softly structured" },
    { id: "colour", text: "Solid deep black" },
  ];

  return (
    <section aria-label="Product information" className={`py-8 sm:py-10 ${styles.detailsSection}`}>
      <Container>
        <div className={styles.mobileDetails}>
          <h2 className="sr-only">Product information</h2>
          <details open>
            <summary>Details <span aria-hidden="true">+</span></summary>
            <div className={styles.mobileDetailContent}>
              <p>{product.description}</p>
              <ul role="list">
                {detailPoints.map(({ id, text }) => (
                  <li key={id}>
                    <Check aria-hidden="true" className="mt-1 size-3.5 shrink-0" strokeWidth={1.8} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <details>
            <summary>Materials &amp; care <span aria-hidden="true">+</span></summary>
            <div className={styles.mobileDetailContent}>
              <p><strong>Fabric:</strong> {details?.material ?? "280 GSM, 100% Supima cotton double jersey"}</p>
              <p className="mt-2"><strong>Surface:</strong> {details?.surface ?? "Dense, smooth, matte and softly structured"}</p>
              {details?.construction?.length ? (
                <ul role="list">
                  {details.construction.map((item, index) => (
                    <li key={`${index}-${item}`}>— {item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
          <details>
            <summary>Size &amp; fit <span aria-hidden="true">+</span></summary>
            <div className={styles.mobileDetailContent}>
              <p>{details?.fit ?? "Boxy oversized unisex"}. Measurements are provisional pending supplier sampling and fit approval.</p>
              <button onClick={() => setSizeGuideOpen(true)} type="button">
                <Ruler aria-hidden="true" className="size-4" strokeWidth={1.6} />
                Open this product’s size chart
              </button>
            </div>
          </details>
          {detailImage ? (
            <div className={styles.mobileDetailImage}>
              <Image alt={detailImage.alt} fill sizes="100vw" src={detailImage.url} />
            </div>
          ) : null}
        </div>

        <div className={styles.desktopDetails}>
        <h2 className="sr-only" id="product-specifications-heading">
          Product specifications
        </h2>
        <div
          aria-label="Product information sections"
          className="flex gap-7 overflow-x-auto border-b border-border"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              aria-controls={`product-tab-${getTabId(tab)}`}
              aria-selected={activeTab === tab}
              className={cn(
                "relative min-h-12 shrink-0 pb-3 text-xs font-semibold text-foreground-muted",
                activeTab === tab &&
                  "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-foreground",
              )}
              id={`product-tab-button-${getTabId(tab)}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-8 pt-7 md:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] md:items-stretch md:gap-12">
          <div
            aria-labelledby={`product-tab-button-${getTabId(activeTab)}`}
            className="min-h-64"
            id={`product-tab-${getTabId(activeTab)}`}
            role="tabpanel"
          >
            {activeTab === "Details" ? (
              <div>
                <p className="max-w-xl text-sm leading-6 text-foreground-muted">
                  {product.description}
                </p>
                <ul className="mt-6 grid gap-3 text-sm" role="list">
                  {detailPoints.map(({ id, text }) => (
                    <li className="flex items-start gap-3" key={id}>
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {activeTab === "Materials" ? (
              <div className="grid gap-6 text-sm">
                <div className="flex gap-4">
                  <Shirt aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.6} />
                  <div>
                    <p className="font-semibold">Fabric</p>
                    <p className="mt-1 text-foreground-muted">
                      {details?.material ?? "100% Supima cotton double jersey"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Layers3 aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.6} />
                  <div>
                    <p className="font-semibold">Surface and structure</p>
                    <p className="mt-1 text-foreground-muted">
                      {details?.surface ?? "Dense, smooth, matte and softly structured"}
                    </p>
                  </div>
                </div>
                {details?.construction?.length ? (
                  <div>
                    <p className="font-semibold">Construction</p>
                    <ul className="mt-2 grid gap-2 text-foreground-muted" role="list">
                      {details.construction.map((item, index) => (
                        <li key={`${index}-${item}`}>— {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeTab === "Size & Fit" ? (
              <div className="text-sm">
                <div className="flex gap-4">
                  <Ruler aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.6} />
                  <div>
                    <p className="font-semibold">{details?.fit ?? "Boxy oversized unisex"}</p>
                    <p className="mt-2 max-w-md leading-6 text-foreground-muted">
                      Available in S, M, L, XL and XXL. The chart lists proposed finished garment measurements, not body measurements. All dimensions remain provisional pending supplier sampling and fit approval.
                    </p>
                  </div>
                </div>
                <button
                  className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 font-medium"
                  onClick={() => setSizeGuideOpen(true)}
                  type="button"
                >
                  <Ruler aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  View this product’s size chart
                </button>
              </div>
            ) : null}

          </div>

          <div className="relative min-h-72 overflow-hidden rounded-xl bg-[#eeece8] md:min-h-[24rem]">
            {detailImage ? (
              <Image
                alt={detailImage.alt}
                className="h-full w-full object-cover"
                fill
                sizes="(min-width: 768px) 52vw, 100vw"
                src={detailImage.url}
              />
            ) : null}
          </div>
        </div>
        </div>
      </Container>
      <SizeGuideDrawer
        instanceId="details-tab"
        onClose={() => setSizeGuideOpen(false)}
        open={sizeGuideOpen}
        productType={product.productType}
      />
    </section>
  );
}
