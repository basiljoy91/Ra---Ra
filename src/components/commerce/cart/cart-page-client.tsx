"use client";

import {
  ArrowRight,
  Gift,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/commerce/product-card/product-card";
import { Button, buttonStyles } from "@/components/ui/button";
import {
  getCartAction,
  removeCartLineAction,
  updateCartLineAction,
  updateDiscountCodeAction,
  updateGiftMessageAction,
  updateGiftWrapAction,
} from "@/features/cart/commerce-cart";
import type { Cart, CartLine, Money, Product } from "@/lib/commerce";
import { CART_UPDATED_EVENT, publishCartUpdated } from "@/lib/commerce/cart-events";
import {
  cn,
  compareMoney,
  formatMoney,
  getMoneyProgress,
  subtractMoney,
} from "@/lib/utilities";
import type { FreeShippingThreshold, GiftWrapService } from "@/types/cart";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface CartPageClientProps {
  recommendations: readonly Product[];
  quickAddAction: ProductCardQuickAddHandler;
  giftWrapService?: GiftWrapService | undefined;
  freeShippingThreshold?: FreeShippingThreshold | undefined;
}

type Feedback = { kind: "success" | "error"; message: string } | null;

function quantityWithoutService(cart: Cart, giftVariantId?: string): number {
  return cart.lines
    .filter((line) => line.variant.id !== giftVariantId)
    .reduce((sum, line) => sum + line.quantity, 0);
}

function CartHero({ quantity }: { quantity: number }) {
  return (
    <section className="relative isolate h-[12rem] overflow-hidden bg-[#171512] text-white sm:h-[14rem] lg:h-[17rem]" aria-labelledby="cart-page-title">
      <Image
        alt="Models wearing black RA & RA BEYOND T-shirts in an urban landscape"
        className="hidden object-cover object-[62%_43%] opacity-70 sm:block"
        fill
        priority
        sizes="100vw"
        src="/campaign/beyond-v2/desktop/collection.png"
      />
      <Image
        alt="Models wearing black RA & RA BEYOND T-shirts in a mountain landscape"
        className="object-cover object-[58%_42%] opacity-65 sm:hidden"
        fill
        priority
        sizes="100vw"
        src="/campaign/beyond-v2/mobile/collection.png"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="relative mx-auto flex h-full w-full max-w-[96rem] flex-col justify-center px-5 sm:px-8 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]">Your cart</p>
        <h1 id="cart-page-title" className="mt-3 max-w-[9ch] font-serif text-[2.45rem] italic leading-[0.86] sm:text-5xl lg:text-6xl">
          The pieces you carry forward.
        </h1>
        <p className="mt-4 text-sm text-white/78">
          {quantity} {quantity === 1 ? "piece" : "pieces"} selected
        </p>
      </div>
    </section>
  );
}

function CartSkeleton() {
  return (
    <div className="mx-auto max-w-[96rem] px-5 py-10 sm:px-8 lg:px-12" aria-label="Loading cart" role="status">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-44 rounded bg-black/10" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="space-y-3">
            {[0, 1].map((item) => <div className="h-44 rounded-sm bg-black/8" key={item} />)}
          </div>
          <div className="h-80 rounded-sm bg-black/8" />
        </div>
      </div>
      <span className="sr-only">Loading your cart</span>
    </div>
  );
}

function BenefitStrip() {
  const benefits = [
    { icon: ShieldCheck, label: "Secure Shopify checkout", href: "/faq" },
    { icon: Truck, label: "Shipping calculated at checkout", href: "/faq" },
    { icon: Ruler, label: "Provisional size guidance", href: "/size-guide" },
  ] as const;
  return (
    <div className="grid border-y border-black/15 sm:grid-cols-3">
      {benefits.map(({ icon: Icon, label, href }) => (
        <Link className="flex min-h-20 items-center justify-center gap-3 border-black/15 px-4 text-center text-xs font-semibold uppercase tracking-[0.12em] no-underline sm:border-r sm:last:border-r-0" href={href} key={label}>
          <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

function Recommendations({
  cart,
  products,
  quickAddAction,
  giftWrapService,
  title = "You may also like",
}: {
  cart: Cart | null;
  products: readonly Product[];
  quickAddAction: ProductCardQuickAddHandler;
  giftWrapService?: GiftWrapService | undefined;
  title?: string | undefined;
}) {
  const handles = new Set(cart?.lines.map((line) => line.product.handle) ?? []);
  const visible = products
    .filter((product) => product.handle !== giftWrapService?.productHandle && !handles.has(product.handle))
    .filter((product) => product.variants.some((variant) => variant.available))
    .slice(0, 4);
  if (visible.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-[96rem] px-5 py-12 sm:px-8 lg:px-12 lg:py-16" aria-labelledby="cart-recommendations-title">
      <div className="mb-6 flex items-end justify-between gap-5">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">Continue exploring</p>
          <h2 className="mt-2 font-serif text-3xl italic sm:text-4xl" id="cart-recommendations-title">{title}</h2>
        </div>
        <Link className="hidden text-xs font-semibold uppercase tracking-[0.14em] underline underline-offset-4 sm:inline" href="/collections/beyond">View collection</Link>
      </div>
      <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard
            className="w-[72vw] shrink-0 snap-start sm:w-auto"
            imageRatio="portrait"
            imageSizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 72vw"
            key={product.id}
            product={product}
            quickAddAction={quickAddAction}
            showAlternateImage
            showColourOptions={false}
            showQuickAdd
          />
        ))}
      </div>
    </section>
  );
}

function EmptyCart({
  configured,
  recommendations,
  quickAddAction,
  feedback,
}: {
  configured: boolean;
  recommendations: readonly Product[];
  quickAddAction: ProductCardQuickAddHandler;
  feedback: Feedback;
}) {
  return (
    <>
      <section className="mx-auto grid min-h-[33rem] max-w-[96rem] bg-[#eee5dd] lg:grid-cols-2" aria-labelledby="cart-page-title">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em]">Your cart</p>
          <h1 id="cart-page-title" className="mt-5 max-w-[10ch] font-serif text-5xl italic leading-[0.9] sm:text-6xl lg:text-7xl">Your cart is empty.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-black/68">
            {configured
              ? "Explore the four BEYOND stories and choose the piece that stays with you."
              : "Live Shopify cart and checkout are not connected in this environment yet."}
          </p>
          <Link className={buttonStyles({ size: "lg", className: "mt-8 w-full sm:w-fit sm:min-w-64" })} href="/collections/beyond">
            Continue shopping <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <p aria-live="polite" className={cn("mt-4 text-sm", feedback?.kind === "error" && "text-red-700")} role="status">{feedback?.message ?? ""}</p>
        </div>
        <div className="relative min-h-[22rem] lg:min-h-full">
          <Image alt="Two models wearing black RA & RA BEYOND T-shirts beside a misty lake" className="object-cover" fill priority sizes="(min-width: 1024px) 50vw, 100vw" src="/campaign/beyond-v2/desktop/beyond-reality.png" />
        </div>
      </section>
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12"><BenefitStrip /></div>
      <Recommendations cart={null} giftWrapService={undefined} products={recommendations} quickAddAction={quickAddAction} title="Explore BEYOND" />
    </>
  );
}

function CartLineItem({
  line,
  pending,
  onQuantity,
}: {
  line: CartLine;
  pending: boolean;
  onQuantity: (lineId: string, quantity: number) => void;
}) {
  const maximum = line.variant.quantityAvailable;
  const atMaximum = maximum !== undefined && line.quantity >= maximum;
  return (
    <li className="grid grid-cols-[7.25rem_minmax(0,1fr)] gap-4 border-t border-black/15 py-5 first:border-t-0 sm:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1fr)_9rem_7rem] lg:items-center lg:gap-6" key={line.id}>
      <Link className="relative aspect-[4/5] overflow-hidden bg-[#e8dfd7]" href={`/products/${line.product.handle}`}>
        {line.variant.image ? <Image alt={line.variant.image.alt} className="object-cover" fill sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 116px" src={line.variant.image.url} /> : null}
      </Link>
      <div className="min-w-0 self-start lg:self-center">
        <Link className="font-serif text-xl font-semibold leading-tight no-underline sm:text-2xl" href={`/products/${line.product.handle}`}>{line.product.title}</Link>
        <p className="mt-2 text-xs uppercase tracking-[0.08em] text-black/58">{line.variant.selectedOptions.map((option) => `${option.name}: ${option.value}`).join(" · ")}</p>
        <p className="mt-3 text-sm tabular-nums lg:hidden">{formatMoney(line.variant.price)} each</p>
        <button className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] underline underline-offset-4 disabled:opacity-45 lg:hidden" disabled={pending} onClick={() => onQuantity(line.id, 0)} type="button">
          <Trash2 aria-hidden="true" className="size-4" /> Remove
        </button>
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
        <div className="inline-grid grid-cols-3 items-center border border-black/20 bg-white/35">
          <button aria-label={`Decrease ${line.product.title} quantity`} className="grid size-11 place-items-center disabled:opacity-40" disabled={pending} onClick={() => onQuantity(line.id, line.quantity - 1)} type="button"><Minus aria-hidden="true" className="size-4" /></button>
          <span className="min-w-9 text-center text-sm tabular-nums">{line.quantity}</span>
          <button aria-label={`Increase ${line.product.title} quantity`} className="grid size-11 place-items-center disabled:opacity-40" disabled={pending || atMaximum} onClick={() => onQuantity(line.id, line.quantity + 1)} type="button"><Plus aria-hidden="true" className="size-4" /></button>
        </div>
        <span className="font-semibold tabular-nums lg:hidden">{formatMoney(line.total)}</span>
      </div>
      <div className="hidden text-right lg:block">
        <p className="font-semibold tabular-nums">{formatMoney(line.total)}</p>
        <button aria-label={`Remove ${line.product.title}`} className="mt-2 inline-grid size-11 place-items-center disabled:opacity-40" disabled={pending} onClick={() => onQuantity(line.id, 0)} type="button"><Trash2 aria-hidden="true" className="size-4" /></button>
      </div>
    </li>
  );
}

function GiftOptions({
  cart,
  giftWrapService,
  pendingKey,
  onGiftWrap,
  onGiftMessage,
}: {
  cart: Cart;
  giftWrapService?: GiftWrapService | undefined;
  pendingKey: string | null;
  onGiftWrap: (enabled: boolean) => void;
  onGiftMessage: (enabled: boolean, message: string) => Promise<boolean>;
}) {
  const savedMessage = cart.attributes.find((attribute) => attribute.key === "_ra_gift_message")?.value ?? "";
  const savedEnabled = cart.attributes.some((attribute) => attribute.key === "_ra_is_gift" && attribute.value === "true");
  const wrapped = Boolean(giftWrapService && cart.lines.some((line) => line.variant.id === giftWrapService.variantId));
  const [messageEnabled, setMessageEnabled] = useState(savedEnabled);
  const [message, setMessage] = useState(savedMessage);
  const [dirty, setDirty] = useState(false);

  return (
    <section className="mt-8 border border-black/15 bg-white/28 p-5 sm:p-7" aria-labelledby="gift-options-title">
      <div className="flex items-center gap-3"><Gift aria-hidden="true" className="size-5" strokeWidth={1.5} /><h2 className="font-serif text-2xl italic" id="gift-options-title">Make it a gift</h2></div>
      <div className="mt-6 space-y-5">
        <label className={cn("flex gap-3", !giftWrapService?.available && "opacity-60")}>
          <input checked={wrapped} className="mt-1 size-5 accent-black" disabled={!giftWrapService?.available || pendingKey !== null} onChange={(event) => onGiftWrap(event.target.checked)} type="checkbox" />
          <span><span className="font-semibold">Add gift wrapping{giftWrapService ? ` (${formatMoney(giftWrapService.price)})` : ""}</span><span className="mt-1 block text-sm text-black/60">{giftWrapService?.available ? "Added as a real Shopify service item, quantity fixed at one." : "Paid gift wrapping is not currently configured or available."}</span></span>
        </label>
        <div>
          <label className="flex gap-3">
            <input checked={messageEnabled} className="mt-1 size-5 accent-black" disabled={pendingKey !== null} onChange={(event) => {
              const enabled = event.target.checked;
              setMessageEnabled(enabled);
              setDirty(true);
              if (!enabled) void onGiftMessage(false, "").then((saved) => saved && setDirty(false));
            }} type="checkbox" />
            <span><span className="font-semibold">Add a gift message (free)</span><span className="mt-1 block text-sm text-black/60">Stored securely with this Shopify cart and passed into order data.</span></span>
          </label>
          {messageEnabled ? (
            <div className="ml-8 mt-3">
              <label className="sr-only" htmlFor="gift-message">Gift message</label>
              <textarea aria-describedby="gift-message-help gift-message-count" className="min-h-28 w-full resize-y border border-black/25 bg-white/50 p-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/15" id="gift-message" maxLength={120} onChange={(event) => { setMessage(event.target.value); setDirty(true); }} placeholder="Write a short message for the recipient" value={message} />
              <div className="mt-2 flex items-center justify-between gap-4 text-xs text-black/55"><span id="gift-message-help">Maximum 120 characters.</span><span id="gift-message-count">{message.length} / 120</span></div>
              <Button className="mt-3" disabled={!dirty || !message.trim() || pendingKey !== null} onClick={() => void onGiftMessage(true, message).then((saved) => saved && setDirty(false))} size="sm" variant="secondary">{pendingKey === "gift-message" ? "Saving…" : "Save message"}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FreeShippingProgress({ current, config }: { current: Money; config?: FreeShippingThreshold | undefined }) {
  if (!config || current.currencyCode !== config.threshold.currencyCode) return null;
  const progress = getMoneyProgress(current, config.threshold);
  const comparison = compareMoney(current, config.threshold);
  if (progress === null || comparison === null) return null;
  const unlocked = comparison >= 0;
  const remaining = unlocked ? null : subtractMoney(config.threshold, current);
  return (
    <section className="mt-6 border border-black/15 bg-white/30 p-4" aria-label="Free shipping progress">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold"><span className="flex items-center gap-2"><Truck aria-hidden="true" className="size-4" />{unlocked ? "You’ve unlocked free shipping" : remaining ? `Add ${formatMoney(remaining)} more for free shipping` : "Free shipping progress"}</span><span>{Math.round(progress)}%</span></div>
      <progress aria-label="Progress toward the configured free-shipping threshold" className="mt-3 h-1.5 w-full accent-black" max={100} value={progress}>{progress}%</progress>
      <p className="mt-2 text-[0.68rem] text-black/55">Checkout determines the final shipping method and charge.</p>
    </section>
  );
}

function OrderSummary({
  cart,
  giftLine,
  freeShippingThreshold,
  pending,
  feedback,
  onDiscount,
  onCheckout,
}: {
  cart: Cart;
  giftLine?: CartLine | undefined;
  freeShippingThreshold?: FreeShippingThreshold | undefined;
  pending: boolean;
  feedback: Feedback;
  onDiscount: (code: string, mode: "add" | "remove") => void;
  onCheckout: () => void;
}) {
  const [code, setCode] = useState("");
  const eligibleSubtotal = freeShippingThreshold?.basis === "merchandise-excluding-gift-wrap" && giftLine
    ? subtractMoney(cart.subtotal, giftLine.total) ?? cart.subtotal
    : cart.subtotal;
  return (
    <aside className="border border-black/15 bg-[#efe7df] p-5 sm:p-7 lg:sticky lg:top-28" aria-labelledby="cart-summary-title">
      <h2 className="font-serif text-3xl italic" id="cart-summary-title">Order summary</h2>
      <dl className="mt-6 space-y-3 border-b border-black/15 pb-5 text-sm">
        <div className="flex justify-between gap-4"><dt>Shopify subtotal</dt><dd className="font-semibold tabular-nums">{formatMoney(cart.subtotal)}</dd></div>
        {giftLine ? <div className="flex justify-between gap-4"><dt>Gift wrapping <span className="text-black/50">(included)</span></dt><dd className="tabular-nums">{formatMoney(giftLine.total)}</dd></div> : null}
        <div className="flex justify-between gap-4"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
      </dl>
      {cart.discountCodes.length > 0 ? (
        <div className="mt-5 space-y-2" aria-label="Discount codes">
          {cart.discountCodes.map((discount) => (
            <div className="flex items-center justify-between gap-3 border border-black/15 bg-white/35 p-3 text-sm" key={discount.code}><span className="flex items-center gap-2"><Tag aria-hidden="true" className="size-4" />{discount.code}<span className={discount.applicable ? "text-green-800" : "text-red-700"}>{discount.applicable ? "Applied" : "Not applicable"}</span></span><button className="min-h-11 px-2 text-xs font-semibold underline underline-offset-4" disabled={pending} onClick={() => onDiscount(discount.code, "remove")} type="button">Remove</button></div>
          ))}
        </div>
      ) : null}
      <form className="mt-5" onSubmit={(event) => { event.preventDefault(); if (code.trim()) { onDiscount(code, "add"); setCode(""); } }}>
        <label className="text-xs font-semibold uppercase tracking-[0.12em]" htmlFor="discount-code">Discount code</label>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2"><input autoComplete="off" className="min-h-12 min-w-0 border border-black/25 bg-white/55 px-3 outline-none focus:border-black focus:ring-2 focus:ring-black/15" id="discount-code" maxLength={64} onChange={(event) => setCode(event.target.value)} placeholder="Enter code" value={code} /><Button disabled={pending || !code.trim()} size="md" type="submit">Apply</Button></div>
      </form>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-black/15 pt-5"><span className="text-lg font-semibold">Total</span><span className="font-serif text-3xl font-semibold tabular-nums">{formatMoney(cart.total)}</span></div>
      <Button className="mt-5 w-full" disabled={pending || !cart.checkoutUrl} onClick={onCheckout} size="lg"><ShoppingBag aria-hidden="true" className="size-4" />{pending ? "Saving cart…" : "Proceed to checkout"}<ArrowRight aria-hidden="true" className="size-4" /></Button>
      <p className="mt-3 text-xs leading-5 text-black/58">Checkout is securely hosted by Shopify. Shipping and applicable taxes are finalized there.</p>
      <p aria-live="polite" className={cn("mt-3 min-h-5 text-sm", feedback?.kind === "error" ? "text-red-700" : "text-green-800")} role="status">{feedback?.message ?? ""}</p>
      <FreeShippingProgress config={freeShippingThreshold} current={eligibleSubtotal} />
    </aside>
  );
}

export function CartPageClient({ recommendations, quickAddAction, giftWrapService, freeShippingThreshold }: CartPageClientProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const cartRef = useRef<Cart | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const acceptCart = useCallback((nextCart: Cart, message?: string) => {
    cartRef.current = nextCart;
    setCart(nextCart);
    publishCartUpdated(nextCart.totalQuantity);
    if (message) setFeedback({ kind: message.includes("not valid") ? "error" : "success", message });
  }, []);

  const loadCart = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const result = await getCartAction();
      if (result.status === "success") {
        setConfigured(result.configured);
        cartRef.current = result.cart;
        setCart(result.cart);
        publishCartUpdated(result.cart?.totalQuantity ?? 0);
      } else setFeedback({ kind: "error", message: result.message });
    } catch {
      setFeedback({ kind: "error", message: "Your cart could not be loaded. Try again." });
    } finally {
      if (!quiet) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getCartAction()
      .then((result) => {
        if (!active) return;
        if (result.status === "success") {
          setConfigured(result.configured);
          cartRef.current = result.cart;
          setCart(result.cart);
          publishCartUpdated(result.cart?.totalQuantity ?? 0);
        } else {
          setFeedback({ kind: "error", message: result.message });
        }
      })
      .catch(() => {
        if (active) setFeedback({ kind: "error", message: "Your cart could not be loaded. Try again." });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const handleExternalCartUpdate = (event: Event) => {
      const count = (event as CustomEvent<{ cartCount?: number }>).detail?.cartCount;
      if (count !== cartRef.current?.totalQuantity) void loadCart(true);
    };
    window.addEventListener(CART_UPDATED_EVENT, handleExternalCartUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleExternalCartUpdate);
  }, [loadCart]);

  const giftLine = useMemo(() => giftWrapService && cart?.lines.find((line) => line.variant.id === giftWrapService.variantId), [cart, giftWrapService]);
  const merchandiseLines = useMemo(() => cart?.lines.filter((line) => line.variant.id !== giftWrapService?.variantId) ?? [], [cart, giftWrapService]);
  const merchandiseQuantity = cart ? quantityWithoutService(cart, giftWrapService?.variantId) : 0;

  async function runMutation(key: string, mutation: () => Promise<Awaited<ReturnType<typeof updateCartLineAction>>>): Promise<boolean> {
    if (pendingKey) return false;
    setPendingKey(key);
    setFeedback(null);
    try {
      const result = await mutation();
      if (result.status === "success") {
        acceptCart(result.cart, result.message);
        return true;
      }
      setFeedback({ kind: "error", message: result.message });
      return false;
    } catch {
      setFeedback({ kind: "error", message: "The cart could not be updated. Try again." });
      return false;
    } finally {
      setPendingKey(null);
    }
  }

  if (loading) return <CartSkeleton />;
  if (!cart || merchandiseLines.length === 0) return <EmptyCart configured={configured} feedback={feedback} quickAddAction={quickAddAction} recommendations={recommendations} />;

  return (
    <>
      <CartHero quantity={merchandiseQuantity} />
      <div className="mx-auto max-w-[96rem] px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
        <div className="mb-6 flex items-end justify-between border-b border-black/15 pb-5">
          <div><p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em]">RA & RA selection</p><h2 className="mt-2 font-serif text-3xl italic sm:text-4xl">Your cart ({merchandiseQuantity})</h2></div>
          <Link className="hidden text-xs font-semibold uppercase tracking-[0.12em] underline underline-offset-4 sm:inline" href="/collections/beyond">Continue shopping</Link>
        </div>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_25rem]">
          <div>
            <div className="hidden grid-cols-[10rem_minmax(0,1fr)_9rem_7rem] gap-6 border-b border-black/15 pb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] lg:grid"><span>Product</span><span>Details</span><span>Quantity</span><span className="text-right">Total</span></div>
            <ul role="list">{merchandiseLines.map((line) => <CartLineItem key={line.id} line={line} onQuantity={(lineId, quantity) => { void runMutation(`line-${lineId}`, () => quantity <= 0 ? removeCartLineAction(lineId) : updateCartLineAction(lineId, quantity)); }} pending={pendingKey === `line-${line.id}`} />)}</ul>
            <GiftOptions cart={cart} giftWrapService={giftWrapService} key={`${cart.id}:${cart.attributes.map((attribute) => `${attribute.key}=${attribute.value}`).join("|")}`} onGiftMessage={(enabled, message) => runMutation("gift-message", () => updateGiftMessageAction(enabled, message))} onGiftWrap={(enabled) => { void runMutation("gift-wrap", () => updateGiftWrapAction(enabled)); }} pendingKey={pendingKey} />
          </div>
          <OrderSummary cart={cart} feedback={feedback} freeShippingThreshold={freeShippingThreshold} giftLine={giftLine} onCheckout={() => { if (!pendingKey && cart.checkoutUrl) window.location.assign(cart.checkoutUrl); }} onDiscount={(code, mode) => { void runMutation("discount", () => updateDiscountCodeAction(code, mode)); }} pending={pendingKey !== null} />
        </div>
        <div className="mt-10"><BenefitStrip /></div>
      </div>
      <Recommendations cart={cart} giftWrapService={giftWrapService} products={recommendations} quickAddAction={quickAddAction} />
      <section className="relative mx-auto mb-12 h-[18rem] max-w-[96rem] overflow-hidden text-white sm:h-[22rem] lg:mb-16" aria-label="Explore the BEYOND collection">
        <Image alt="Two models wearing black RA & RA T-shirts in a metro station" className="object-cover object-center" fill sizes="100vw" src="/campaign/beyond-v2/desktop/beyond-fear.png" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        <div className="relative flex h-full max-w-lg flex-col justify-center px-6 sm:px-10"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">The BEYOND collection</p><h2 className="mt-3 font-serif text-4xl italic sm:text-5xl">Four human experiences. One shared form.</h2><Link className={buttonStyles({ variant: "secondary", className: "mt-6 w-fit bg-[#f6f0ea] text-black" })} href="/collections/beyond">Explore the collection <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
      </section>
    </>
  );
}
