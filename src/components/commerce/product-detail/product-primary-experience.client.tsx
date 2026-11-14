"use client";

import {
  Heart,
  CreditCard,
  LoaderCircle,
  PackageCheck,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type MouseEvent,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { MobileStickyPurchaseAction } from "@/components/commerce/product-detail/mobile-sticky-purchase-action.client";
import styles from "@/components/commerce/product-detail/product-detail-mobile.module.css";
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
import type {
  AddToCartHandler,
  BuyNowHandler,
} from "@/types/product-detail";

interface ProductPrimaryExperienceProps {
  product: Product;
  familyProducts: readonly Pick<
    Product,
    "handle" | "id" | "productType" | "title"
  >[];
  collectionTitle?: string;
  addToCartAction: AddToCartHandler;
  buyNowAction: BuyNowHandler;
}

const DESIGN_ORDER = [
  "Past Present Beyond",
  "Beyond Reality",
  "Beyond Fear",
  "Beyond Limits",
] as const;

const FIT_ORDER = [
  "Sculptural Boxy Tee",
  "Washed Art Tee",
  "Signature Regular Tee",
  "Relaxed Essential Tee",
] as const;

const MOBILE_PRODUCT_STORIES: Readonly<Record<string, string>> = {
  "Beyond Fear": "Courage is movement, not the absence of fear.",
  "Beyond Reality": "The visible world is only one version of what exists.",
  "Past Present Beyond": "The past arrives edited by everything that followed.",
  "Beyond Limits": "Strength can mean questioning the burden itself.",
};

function getProductDesign(title: string): string {
  return title.split(/\s+[—–-]\s+/u, 1)[0]?.trim() ?? title;
}

function getProductFit(
  product: Pick<Product, "productType" | "title">,
): string {
  const titleFit = product.title.split(/\s+[—–-]\s+/u)[1]?.trim();
  return product.productType?.trim() || titleFit || "T-shirt";
}

function getMobileProductStory(product: Product): string {
  const editorialStory = MOBILE_PRODUCT_STORIES[getProductDesign(product.title)];

  if (editorialStory) return editorialStory;

  const description =
    product.story?.shortStory ?? product.shortDescription ?? product.description;

  return description
    .split(/Planned specification:|Unisex sizing|Final production details/iu, 1)[0]
    ?.trim() || description;
}

function sortByPreferredOrder(
  left: string,
  right: string,
  order: readonly string[],
): number {
  const leftIndex = order.indexOf(left);
  const rightIndex = order.indexOf(right);

  if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
  if (leftIndex === -1) return 1;
  if (rightIndex === -1) return -1;
  return leftIndex - rightIndex;
}

function uniqueByLabel<T>(
  products: readonly T[],
  getLabel: (product: T) => string,
): readonly T[] {
  const seen = new Set<string>();

  return products.filter((product) => {
    const label = getLabel(product).toLocaleLowerCase();
    if (seen.has(label)) return false;
    seen.add(label);
    return true;
  });
}

function ProductFamilySelector({
  currentProduct,
  familyProducts,
}: {
  currentProduct: Product;
  familyProducts: ProductPrimaryExperienceProps["familyProducts"];
}) {
  const router = useRouter();
  const [pendingProductHandle, setPendingProductHandle] = useState<
    string | null
  >(null);
  const [isNavigating, startNavigation] = useTransition();
  const currentDesign = getProductDesign(currentProduct.title);
  const currentFit = getProductFit(currentProduct);
  const artworkProducts = uniqueByLabel(
    familyProducts
      .filter((candidate) => getProductFit(candidate) === currentFit)
      .toSorted((left, right) =>
        sortByPreferredOrder(
          getProductDesign(left.title),
          getProductDesign(right.title),
          DESIGN_ORDER,
        ),
      ),
    (candidate) => getProductDesign(candidate.title),
  );
  const fitProducts = uniqueByLabel(
    familyProducts
      .filter(
        (candidate) => getProductDesign(candidate.title) === currentDesign,
      )
      .toSorted((left, right) =>
        sortByPreferredOrder(
          getProductFit(left),
          getProductFit(right),
          FIT_ORDER,
        ),
      ),
    getProductFit,
  );
  const pendingProduct = familyProducts.find(
    (candidate) => candidate.handle === pendingProductHandle,
  );

  function handleProductNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    candidate: ProductPrimaryExperienceProps["familyProducts"][number],
  ) {
    if (candidate.id === currentProduct.id) {
      event.preventDefault();
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setPendingProductHandle(candidate.handle);
    startNavigation(() => {
      router.push(`/products/${candidate.handle}`, { scroll: false });
    });
  }

  if (artworkProducts.length < 2 && fitProducts.length < 2) return null;

  return (
    <div
      aria-busy={isNavigating}
      className={cn(
        `grid gap-5 border-t border-border pt-5 transition-opacity ${styles.familySelector}`,
        isNavigating && "pointer-events-none opacity-75",
      )}
    >
      {artworkProducts.length > 1 ? (
        <fieldset>
          <legend className="text-sm font-medium">
            Artwork: <span className="font-normal text-foreground-muted">{currentDesign}</span>
          </legend>
          <div className={`mt-3 flex flex-wrap gap-2 ${styles.artworkOptions}`}>
            {artworkProducts.map((candidate) => {
              const label = getProductDesign(candidate.title);
              const active = candidate.id === currentProduct.id;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    `inline-flex min-h-10 items-center justify-center rounded-sm border px-3 py-2 text-xs leading-tight transition-colors ${styles.familyOption}`,
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:border-foreground/60",
                  )}
                  href={`/products/${candidate.handle}`}
                  key={candidate.id}
                  onClick={(event) =>
                    handleProductNavigation(event, candidate)
                  }
                  prefetch
                  scroll={false}
                >
                  {pendingProductHandle === candidate.handle && isNavigating ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="mr-1.5 size-3.5 animate-spin"
                      strokeWidth={1.8}
                    />
                  ) : null}
                  {label}
                </Link>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {fitProducts.length > 1 ? (
        <fieldset>
          <legend className="text-sm font-medium">
            T-shirt fit: <span className="font-normal text-foreground-muted">{currentFit}</span>
          </legend>
          <div className={`mt-3 grid grid-cols-2 gap-2 ${styles.fitOptions}`}>
            {fitProducts.map((candidate) => {
              const label = getProductFit(candidate);
              const active = candidate.id === currentProduct.id;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    `inline-flex min-h-11 items-center rounded-sm border px-3 py-2 text-xs leading-tight transition-colors ${styles.familyOption}`,
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:border-foreground/60",
                  )}
                  href={`/products/${candidate.handle}`}
                  key={candidate.id}
                  onClick={(event) =>
                    handleProductNavigation(event, candidate)
                  }
                  prefetch
                  scroll={false}
                >
                  {pendingProductHandle === candidate.handle && isNavigating ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="mr-1.5 size-3.5 animate-spin"
                      strokeWidth={1.8}
                    />
                  ) : null}
                  {label}
                </Link>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {isNavigating ? (
        <div aria-live="polite" role="status">
          <div className="flex items-center gap-2 rounded-sm bg-surface-muted px-3 py-2.5 text-xs text-foreground-muted">
            <LoaderCircle
              aria-hidden="true"
              className="size-4 shrink-0 animate-spin text-foreground"
              strokeWidth={1.7}
            />
            <span>
              Updating to {pendingProduct?.title ?? "your selection"}…
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
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
    getGalleryImages(product)[0]?.url ??
    null
  );
}

function getLocalGalleryFallback(product: Product): readonly ProductImage[] {
  const fitSlugs = [
    "sculptural-boxy-black",
    "washed-art-charcoal",
    "signature-regular-off-white",
    "relaxed-essential-chocolate",
  ] as const;
  const fitSlug = fitSlugs.find((candidate) =>
    product.handle.endsWith(`-${candidate}`),
  );

  if (!fitSlug) return [];

  const designSlug = product.handle.slice(0, -(fitSlug.length + 1));
  const base = `/products/${designSlug}/${fitSlug}`;

  return [
    {
      url: `${base}/side-couple-black.png`,
      alt: `${product.title} worn by two models`,
    },
    {
      url: `${base}/lifestyle-back.png`,
      alt: `${product.title} back artwork`,
    },
    {
      url: `${base}/front-male-black.png`,
      alt: `${product.title} front view on a male model`,
    },
    {
      url: `${base}/front-female-black.png`,
      alt: `${product.title} front view on a female model`,
    },
  ];
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

  return images.size > 0
    ? Array.from(images.values())
    : getLocalGalleryFallback(product);
}

export function ProductPrimaryExperience({
  product,
  familyProducts,
  collectionTitle,
  addToCartAction,
  buyNowAction,
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
  const [pendingAction, setPendingAction] = useState<"add" | "buy" | null>(null);
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

  function resolvePurchaseVariant(): ProductVariant | null {
    setFeedback(null);

    if (soldOut) {
      setFeedback({
        kind: "error",
        message: "This product is currently sold out.",
      });
      return null;
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
      return null;
    }

    if (resolution.status === "invalid") {
      setFeedback({
        kind: "error",
        message:
          "This option combination is not available. Choose another colour or size.",
      });
      return null;
    }

    if (resolution.status === "unavailable") {
      setFeedback({
        kind: "error",
        message: "This combination is currently unavailable.",
      });
      return null;
    }

    return resolution.variant;
  }

  function handleAddToCart() {
    const variant = resolvePurchaseVariant();
    if (!variant) return;

    setPendingAction("add");
    startTransition(async () => {
      try {
        const result = await addToCartAction({
          productId: product.id,
          variantId: variant.id,
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
      } finally {
        setPendingAction(null);
      }
    });
  }

  function handleBuyNow() {
    const variant = resolvePurchaseVariant();
    if (!variant) return;

    setPendingAction("buy");
    startTransition(async () => {
      try {
        const result = await buyNowAction({
          productId: product.id,
          variantId: variant.id,
          quantity: 1,
        });
        if (result.status === "success") {
          publishCartUpdated(result.cartCount);
          window.location.assign(result.checkoutUrl);
          return;
        }
        setFeedback({ kind: "error", message: result.message });
      } catch {
        setFeedback({
          kind: "error",
          message: "Checkout could not be opened. Try again.",
        });
      } finally {
        setPendingAction(null);
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
      <div className={`grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-10 xl:gap-14 ${styles.primaryLayout}`}>
        <ProductGallery
          activeImageUrl={activeImageUrl}
          images={galleryImages}
          onImageChange={setActiveImageUrl}
          productTitle={product.title}
        />
        <div className={`lg:sticky lg:top-[calc(var(--header-height-desktop)+1.25rem)] ${styles.productInformation}`}>
          <div>
            <p className={`inline-flex rounded-full bg-surface-muted px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-foreground-muted ${styles.productBadge}`}>
              {product.isNew ? "New arrival" : "Limited edition"}
            </p>
            <h1 className={`mt-4 max-w-[14ch] font-serif text-[clamp(2.45rem,4.5vw,4rem)] font-medium leading-[0.94] tracking-[-0.025em] ${styles.productTitle}`}>
              {product.title}
            </h1>
            <p className={`mt-3 text-sm font-medium text-foreground-muted ${styles.productContext}`}>
              {collectionTitle ?? product.productType ?? "Ra & Ra"} · Unisex
            </p>
            <div className={`mt-5 ${styles.productPrice}`}>
              <ProductPrice
                compareAtPrice={selectedCompareAt}
                price={selectedPrice}
                size="large"
              />
            </div>
          </div>

          <p
            className={`mt-5 max-w-md text-sm leading-6 text-foreground-muted ${styles.productDescription} ${styles.desktopProductDescription}`}
          >
            {product.shortDescription ?? product.description}
          </p>
          <p
            className={`mt-5 max-w-md text-sm leading-6 text-foreground-muted ${styles.productDescription} ${styles.mobileProductDescription}`}
          >
            {getMobileProductStory(product)}
          </p>

          <div className="mt-6">
            <ProductFamilySelector
              currentProduct={product}
              familyProducts={familyProducts}
            />
          </div>

          <div className={`mt-6 grid gap-5 border-t border-border pt-5 ${styles.purchasePanel}`}>
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
                className={`inline-flex w-fit items-center gap-2 border-b border-foreground/60 pb-1 text-xs font-medium ${styles.sizeChartButton}`}
                onClick={() => setSizeGuideOpen(true)}
                type="button"
              >
                <Ruler aria-hidden="true" className="size-4" strokeWidth={1.7} />
                View size chart
              </button>
            ) : null}

            <div className={`grid grid-cols-[minmax(0,1fr)_3.5rem] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_3.5rem] ${styles.purchaseButtons}`}>
              <Button
                aria-describedby="product-purchase-status"
                className="w-full"
                data-main-purchase-action
                disabled={soldOut || isPending}
                onClick={handleAddToCart}
                size="lg"
              >
                <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.6} />
                {soldOut
                  ? "Sold Out"
                  : pendingAction === "add"
                    ? "Adding…"
                    : "Add to Cart"}
              </Button>
              <Button
                aria-describedby="product-purchase-status"
                className="col-span-2 row-start-2 w-full sm:col-span-1 sm:row-start-auto"
                disabled={soldOut || isPending}
                onClick={handleBuyNow}
                size="lg"
                variant="secondary"
              >
                <CreditCard aria-hidden="true" className="size-5" strokeWidth={1.6} />
                {pendingAction === "buy" ? "Opening checkout…" : "Buy now"}
              </Button>
              <Button
                aria-label="Save product"
                className="col-start-2 row-start-1 px-0 sm:col-start-auto sm:row-start-auto"
                size="lg"
                variant="secondary"
              >
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

          <div className={`mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5 text-center ${styles.purchaseBenefits}`}>
            <div className="grid justify-items-center gap-1.5">
              <Truck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <p className="text-[0.68rem] font-semibold">Delivery details</p>
              <p className="text-[0.6rem] text-foreground-muted">Shown at checkout</p>
            </div>
            <div className="grid justify-items-center gap-1.5">
              <PackageCheck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <p className="text-[0.68rem] font-semibold">Fit guidance</p>
              <p className="text-[0.6rem] text-foreground-muted">Product size chart</p>
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
