"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useTransition } from "react";

import { ProductPrice } from "@/components/commerce/product-card/product-price";
import { MobileStickyPurchaseAction } from "@/components/commerce/product-detail/mobile-sticky-purchase-action.client";
import { ProductGallery } from "@/components/commerce/product-detail/product-gallery.client";
import { ProductOptionSelector } from "@/components/commerce/product-detail/product-option-selector";
import { QuantitySelector } from "@/components/commerce/product-detail/quantity-selector";
import { Button } from "@/components/ui/button";
import { productPageConfig } from "@/config/product-page";
import type { Product, ProductImage, ProductVariant } from "@/lib/commerce";
import {
  getInitialProductSelections,
  getOptionSelectionKey,
  getProductOptions,
  isProductSoldOut,
  resolveProductVariant,
  selectedOptionsToRecord,
} from "@/lib/commerce";
import { cn, getMoneyRange } from "@/lib/utilities";
import type { AddToCartHandler } from "@/types/product-detail";

interface ProductPrimaryExperienceProps {
  product: Product;
  collectionTitle?: string;
  addToCartAction: AddToCartHandler;
}

interface PurchaseFeedback {
  kind: "success" | "error";
  message: string;
}

function matchesSelections(
  variant: ProductVariant,
  selections: Readonly<Record<string, string>>,
): boolean {
  const variantSelections = selectedOptionsToRecord(variant.selectedOptions);

  return Object.entries(selections).every(
    ([name, value]) => variantSelections[name] === value,
  );
}

function getInitialImageUrl(
  product: Product,
  selections: Readonly<Record<string, string>>,
): string | null {
  return (
    product.variants.find(
      (variant) => variant.available && matchesSelections(variant, selections),
    )?.image?.url ??
    product.images[0]?.url ??
    null
  );
}

function getGalleryImages(product: Product): readonly ProductImage[] {
  const images = new Map<string, ProductImage>();

  for (const image of product.images) {
    images.set(image.url, image);
  }

  for (const variant of product.variants) {
    if (variant.image) {
      images.set(variant.image.url, variant.image);
    }
  }

  return Array.from(images.values());
}

export function ProductPrimaryExperience({
  product,
  collectionTitle,
  addToCartAction,
}: ProductPrimaryExperienceProps) {
  const initialSelections = useMemo(
    () => getInitialProductSelections(product),
    [product],
  );
  const [selections, setSelections] = useState(initialSelections);
  const [quantity, setQuantity] = useState(1);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(() =>
    getInitialImageUrl(product, initialSelections),
  );
  const [feedback, setFeedback] = useState<PurchaseFeedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const sizeSelectorRef = useRef<HTMLFieldSetElement>(null);
  const options = getProductOptions(product);
  const galleryImages = getGalleryImages(product);
  const resolution = resolveProductVariant(product, selections);
  const soldOut = isProductSoldOut(product);
  const matchingAvailableVariants = product.variants.filter(
    (variant) => variant.available && matchesSelections(variant, selections),
  );
  const priceRange = getMoneyRange(
    matchingAvailableVariants.map((variant) => variant.price),
  );
  const currentPrice =
    resolution.status === "available" || resolution.status === "unavailable"
      ? resolution.variant.price
      : priceRange?.min ?? product.price;
  const currentCompareAtPrice =
    resolution.status === "available" || resolution.status === "unavailable"
      ? resolution.variant.compareAtPrice
      : product.compareAtPrice;
  const hasSizeOption = options.some(
    (option) => getOptionSelectionKey(option.name) === "size",
  );

  function focusRequiredOption() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    sizeSelectorRef.current?.scrollIntoView({ behavior, block: "center" });
    sizeSelectorRef.current?.focus({ preventScroll: true });
  }

  function handleOptionSelect(optionName: string, value: string) {
    const key = getOptionSelectionKey(optionName);
    const nextSelections = { ...selections, [key]: value };
    const nextResolution = resolveProductVariant(product, nextSelections);
    const matchingVariant =
      nextResolution.status === "available" ||
      nextResolution.status === "unavailable"
        ? nextResolution.variant
        : product.variants.find(
            (variant) =>
              variant.available && matchesSelections(variant, nextSelections),
          );

    setSelections(nextSelections);
    setFeedback(null);

    if (matchingVariant?.image) {
      setActiveImageUrl(matchingVariant.image.url);
    }
  }

  function handleAddToCart() {
    setFeedback(null);

    if (soldOut) {
      setFeedback({
        kind: "error",
        message: "This development product is currently sold out.",
      });
      return;
    }

    if (resolution.status === "incomplete") {
      const missingSize = resolution.missingOptions.some(
        (name) => getOptionSelectionKey(name) === "size",
      );
      setFeedback({
        kind: "error",
        message: missingSize
          ? "Select a size to continue."
          : `Select ${resolution.missingOptions.join(" and ")} to continue.`,
      });
      if (missingSize) {
        requestAnimationFrame(focusRequiredOption);
      }
      return;
    }

    if (resolution.status === "invalid") {
      setFeedback({
        kind: "error",
        message:
          "This option combination is not available. Choose another colour or size.",
      });
      return;
    }

    if (resolution.status === "unavailable") {
      setFeedback({
        kind: "error",
        message: "This combination is currently unavailable.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await addToCartAction({
          productId: product.id,
          variantId: resolution.variant.id,
          quantity,
        });
        setFeedback({ kind: result.status, message: result.message });
      } catch {
        setFeedback({
          kind: "error",
          message: "The development action could not be completed. Try again.",
        });
      }
    });
  }

  const stickyActionLabel = soldOut
    ? "Sold Out"
    : resolution.status === "incomplete"
      ? hasSizeOption
        ? "Choose Size"
        : "Choose Options"
      : resolution.status === "available"
        ? "Add to Cart"
        : "Unavailable";

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-start lg:gap-16">
        <ProductGallery
          activeImageUrl={activeImageUrl}
          images={galleryImages}
          onImageChange={setActiveImageUrl}
          productTitle={product.title}
        />
        <div className="lg:sticky lg:top-[calc(var(--header-height-desktop)+2rem)]">
          <div className="flow-space-sm">
            <p className="type-label text-accent">
              {collectionTitle ?? product.productType ?? "Ra & Ra"}
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,4.5vw,4rem)] font-medium leading-none tracking-[-0.025em]">
              {product.title}
            </h1>
            <ProductPrice
              compareAtPrice={currentCompareAtPrice}
              price={currentPrice}
              priceRange={
                resolution.status === "incomplete" ? priceRange : undefined
              }
              size="large"
            />
          </div>

          <p className="type-body mt-6 text-foreground-muted">
            {product.shortDescription ?? product.description}
          </p>
          {product.contentStatus === "development" ? (
            <p className="type-caption mt-4 rounded-[var(--radius-control)] border border-warning/35 bg-accent-soft/45 px-4 py-3 text-foreground">
              {productPageConfig.developmentNotice}
            </p>
          ) : null}

          <div className="mt-8 grid gap-6">
            {options.map((option) => {
              const isSize = getOptionSelectionKey(option.name) === "size";

              return (
                <ProductOptionSelector
                  key={option.id}
                  onSelect={handleOptionSelect}
                  option={option}
                  product={product}
                  ref={isSize ? sizeSelectorRef : undefined}
                  selections={selections}
                />
              );
            })}

            {hasSizeOption ? (
              <Link className="w-fit text-sm font-semibold" href="/size-guide">
                View size guide
              </Link>
            ) : null}

            <p
              className={cn(
                "text-sm font-semibold",
                soldOut || resolution.status === "unavailable"
                  ? "text-error"
                  : "text-success",
              )}
            >
              {soldOut
                ? "Sold out — the product page remains available to view."
                : resolution.status === "available"
                  ? "Selected variant available in this development fixture."
                  : resolution.status === "unavailable"
                    ? "This combination is currently unavailable."
                    : "Choose the required options to confirm availability."}
            </p>

            <QuantitySelector
              disabled={soldOut || isPending}
              onChange={setQuantity}
              quantity={quantity}
            />

            <Button
              aria-describedby="product-purchase-status"
              className="w-full"
              data-main-purchase-action
              disabled={soldOut || isPending}
              onClick={handleAddToCart}
              size="lg"
            >
              {soldOut ? "Sold Out" : isPending ? "Adding…" : "Add to Cart"}
            </Button>
            <p
              aria-live="polite"
              className={cn(
                "type-small min-h-6",
                feedback?.kind === "success" && "text-success",
                feedback?.kind === "error" && "text-error",
              )}
              id="product-purchase-status"
              role="status"
            >
              {feedback?.message ?? ""}
            </p>
          </div>

          <div className="mt-8 grid gap-4 border-t border-border pt-6 text-sm">
            <div>
              <p className="font-semibold">Shipping</p>
              <p className="mt-1 text-foreground-muted">
                {product.details?.shippingSummary ??
                  productPageConfig.shippingSummary}
              </p>
              <Link className="mt-2 inline-block font-semibold" href="/shipping">
                Shipping information
              </Link>
            </div>
            <div>
              <p className="font-semibold">Returns</p>
              <p className="mt-1 text-foreground-muted">
                {product.details?.returnSummary ?? productPageConfig.returnSummary}
              </p>
              <Link className="mt-2 inline-block font-semibold" href="/returns">
                Return information
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MobileStickyPurchaseAction
        actionLabel={stickyActionLabel}
        disabled={
          soldOut ||
          resolution.status === "unavailable" ||
          resolution.status === "invalid"
        }
        onAction={handleAddToCart}
        pending={isPending}
        price={currentPrice}
        productTitle={product.title}
      />
    </>
  );
}
