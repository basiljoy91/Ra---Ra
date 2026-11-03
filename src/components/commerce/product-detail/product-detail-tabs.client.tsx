"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Ruler, Shirt, Sparkles } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { productPageConfig } from "@/config/product-page";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface ProductDetailTabsProps {
  product: Product;
}

const tabs = ["Details", "Materials", "Size & Fit", "Shipping & Returns"] as const;
type Tab = (typeof tabs)[number];

function getTabId(tab: Tab): string {
  return tab.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Details");
  const details = product.details;
  const detailImage = product.images[4] ?? product.images[1] ?? product.images[0];

  return (
    <section aria-labelledby="product-specifications-heading" className="py-8 sm:py-10">
      <Container>
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
                  {[
                    `${details?.fit ?? "Unisex"} fit`,
                    details?.material ?? "Heavyweight premium cotton",
                    details?.artworkPlacement ?? product.artworkPlacement,
                    details?.manufacturing ?? "Soft-hand print finish",
                    "Designed as a unisex style",
                  ].map((item) => (
                    <li className="flex items-start gap-3" key={item}>
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
                      {item}
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
                  <Sparkles aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.6} />
                  <div>
                    <p className="font-semibold">Finish</p>
                    <p className="mt-1 text-foreground-muted">
                      {details?.manufacturing ?? "Soft-hand screen print"}
                    </p>
                  </div>
                </div>
                {details?.care?.length ? (
                  <div>
                    <p className="font-semibold">Care</p>
                    <ul className="mt-2 grid gap-2 text-foreground-muted" role="list">
                      {details.care.map((instruction) => (
                        <li key={instruction}>— {instruction}</li>
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
                    <p className="font-semibold">{details?.fit ?? "Unisex"} fit</p>
                    <p className="mt-2 max-w-md leading-6 text-foreground-muted">
                      Available in S, M, L, XL and XXL. Select your usual size for the intended silhouette, or size down for a closer fit.
                    </p>
                  </div>
                </div>
                <Link className="mt-6 inline-flex font-semibold underline" href="/size-guide">
                  Open the complete size guide
                </Link>
              </div>
            ) : null}

            {activeTab === "Shipping & Returns" ? (
              <div className="grid gap-6 text-sm">
                <div>
                  <p className="font-semibold">Shipping</p>
                  <p className="mt-2 leading-6 text-foreground-muted">
                    {details?.shippingSummary ?? productPageConfig.shippingSummary}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Returns</p>
                  <p className="mt-2 leading-6 text-foreground-muted">
                    {details?.returnSummary ?? productPageConfig.returnSummary}
                  </p>
                </div>
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
      </Container>
    </section>
  );
}
