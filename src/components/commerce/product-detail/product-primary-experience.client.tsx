"use client";

import {
  Heart,
  PackageCheck,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMemo, useRef, useState, useTransition } from "react";

import { MobileStickyPurchaseAction } from "@/components/commerce/product-detail/mobile-sticky-purchase-action.client";
import { ProductGallery } from "@/components/commerce/product-detail/product-gallery.client";
import { ProductOptionSelector } from "@/components/commerce/product-detail/product-option-selector";
import { ProductPrice } from "@/components/commerce/product-card/product-price";
import { SizeGuideDrawer } from "@/components/commerce/product-detail/size-guide-drawer.client";
import { Button } from "@/components/ui/button";
import type { Product, ProductImage, ProductVariant } from "@/lib/commerce";
import {
  getInitialProductSelections,
  getOptionSelectionKey,
  getProductOptions,
  isProductSoldOut,
  resolveProductVariant,
  selectedOptionsToRecord,
} from "@/lib/commerce";
import { publishCartUpdated } from "@/lib/commerce/cart-events";
import { cn } from "@/lib/utilities";
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
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(() =>
    getInitialImageUrl(product, initialSelections),
  );
  const [feedback, setFeedback] = useState<PurchaseFeedback | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const sizeSelectorRef = useRef<HTMLFieldSetElement>(null);
  const options = getProductOptions(product);
  const galleryImages = getGalleryImages(product);
  const resolution = resolveProductVariant(product, selections);
  const soldOut = isProductSoldOut(product);
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
        message: "This product is currently sold out.",
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
          quantity: 1,
        });
        setFeedback({ kind: result.status, message: result.message });
        if (result.status === "success" && result.cartCount !== undefined) {
          publishCartUpdated(result.cartCount);
        }
      } catch {
        setFeedback({
          kind: "error",
          message: "The item could not be added. Try again.",
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
  const selectedPrice =
    resolution.status === "available" || resolution.status === "unavailable"
      ? resolution.variant.price
      : product.price;
  const selectedCompareAt =
    resolution.status === "available" || resolution.status === "unavailable"
      ? resolution.variant.compareAtPrice
      : product.compareAtPrice;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-10 xl:gap-14">
        <ProductGallery
          activeImageUrl={activeImageUrl}
          images={galleryImages}
          onImageChange={setActiveImageUrl}
          productTitle={product.title}
        />
        <div className="lg:sticky lg:top-[calc(var(--header-height-desktop)+1.25rem)]">
          <div>
            <p className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-foreground-muted">
              {product.isNew ? "New arrival" : "Limited edition"}
            </p>
            <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.45rem,4.5vw,4rem)] font-medium leading-[0.94] tracking-[-0.025em]">
              {product.title}
            </h1>
            <p className="mt-3 text-sm font-medium text-foreground-muted">
              {collectionTitle ?? product.productType ?? "Ra & Ra"} · Unisex
            </p>
            <div className="mt-5">
              <ProductPrice
                compareAtPrice={selectedCompareAt}
                price={selectedPrice}
                size="large"
              />
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-foreground-muted">
            {product.shortDescription ?? product.description}
          </p>

          <div className="mt-6 grid gap-5 border-t border-border pt-5">
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
              <button
                className="inline-flex w-fit items-center gap-2 border-b border-foreground/60 pb-1 text-xs font-medium"
                onClick={() => setSizeGuideOpen(true)}
                type="button"
              >
                <Ruler aria-hidden="true" className="size-4" strokeWidth={1.7} />
                View size chart
              </button>
            ) : null}

            <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] gap-3">
              <Button
                aria-describedby="product-purchase-status"
                className="w-full"
                data-main-purchase-action
                disabled={soldOut || isPending}
                onClick={handleAddToCart}
                size="lg"
              >
                <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.6} />
                {soldOut ? "Sold Out" : isPending ? "Adding…" : "Add to Cart"}
              </Button>
              <Button aria-label="Save product" className="px-0" size="lg" variant="secondary">
                <Heart aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </Button>
            </div>
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

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5 text-center">
            <div className="grid justify-items-center gap-1.5">
              <Truck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <p className="text-[0.68rem] font-semibold">Free shipping</p>
              <p className="text-[0.6rem] text-foreground-muted">On launch orders</p>
            </div>
            <div className="grid justify-items-center gap-1.5">
              <PackageCheck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <p className="text-[0.68rem] font-semibold">Easy returns</p>
              <p className="text-[0.6rem] text-foreground-muted">Policy coming soon</p>
            </div>
            <div className="grid justify-items-center gap-1.5">
              <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <p className="text-[0.68rem] font-semibold">Secure checkout</p>
              <p className="text-[0.6rem] text-foreground-muted">Protected payment</p>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideDrawer
        instanceId="primary-product"
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={(size) => handleOptionSelect("Size", size)}
        open={sizeGuideOpen}
        productType={product.productType}
        selectedSize={selections.size}
      />

      <MobileStickyPurchaseAction
        actionLabel={stickyActionLabel}
        disabled={
          soldOut ||
          resolution.status === "unavailable" ||
          resolution.status === "invalid"
        }
        onAction={handleAddToCart}
        pending={isPending}
        productTitle={product.title}
        price={selectedPrice}
        compareAtPrice={selectedCompareAt}
      />
    </>
  );
}
