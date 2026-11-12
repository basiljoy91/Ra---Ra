"use client";

import { LoaderCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { Button, buttonStyles } from "@/components/ui/button";
import {
  getCartAction,
  getCheckoutUrlAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/features/cart/commerce-cart";
import type { Cart } from "@/lib/commerce";
import { publishCartUpdated } from "@/lib/commerce/cart-events";
import { cn, formatMoney } from "@/lib/utilities";

export function CartPageClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    getCartAction()
      .then((result) => {
        if (!active) return;
        if (result.status === "success") {
          setConfigured(result.configured);
          setCart(result.cart);
          publishCartUpdated(result.cart?.totalQuantity ?? 0);
        } else {
          setMessage(result.message);
        }
      })
      .catch(() => {
        if (active) setMessage("Your bag could not be loaded. Try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function updateLine(lineId: string, quantity: number) {
    setMessage("");
    startTransition(async () => {
      const result = quantity <= 0
        ? await removeCartLineAction(lineId)
        : await updateCartLineAction(lineId, quantity);
      if (result.status === "success") {
        setCart(result.cart);
        publishCartUpdated(result.cart.totalQuantity);
      } else {
        setMessage(result.message);
      }
    });
  }

  function checkout() {
    setMessage("");
    startTransition(async () => {
      const result = await getCheckoutUrlAction();
      if (result.status === "success") {
        window.location.assign(result.checkoutUrl);
      } else {
        setMessage(result.message);
      }
    });
  }

  if (loading) {
    return (
      <div className="grid min-h-80 place-items-center text-foreground-muted">
        <LoaderCircle className="size-7 animate-spin" aria-label="Loading bag" />
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="rounded-[var(--radius-panel)] border bg-surface-muted p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-semibold">Shopify connection pending</h2>
        <p className="mt-2 text-foreground-muted">
          Add the Shopify Storefront environment variables to activate the live bag and checkout.
        </p>
      </div>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="grid min-h-80 place-items-center rounded-[var(--radius-panel)] border bg-surface-muted p-8 text-center">
        <div>
          <ShoppingBag className="mx-auto size-7" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">Your bag is empty</h2>
          <p className="mt-2 text-foreground-muted">
            Choose a design and size from the Beyond collection.
          </p>
          <Link className={buttonStyles({ className: "mt-6", size: "lg" })} href="/collections/beyond">
            Shop Beyond
          </Link>
          <p aria-live="polite" className={cn("mt-4 min-h-5 text-sm", message && "text-error")}>
            {message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="overflow-hidden rounded-[var(--radius-panel)] border bg-background">
        <ul className="divide-y divide-border" role="list">
          {cart.lines.map((line) => {
            const image = line.variant.image;
            const maximum = line.variant.quantityAvailable;
            const atMaximum = maximum !== undefined && line.quantity >= maximum;

            return (
              <li className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:p-6" key={line.id}>
                <Link className="relative aspect-[4/5] overflow-hidden bg-surface-muted" href={`/products/${line.product.handle}`}>
                  {image ? (
                    <Image alt={image.alt} fill sizes="(min-width: 640px) 128px, 96px" src={image.url} className="object-cover" />
                  ) : null}
                </Link>
                <div className="flex min-w-0 flex-col justify-between gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link className="font-serif text-xl font-semibold no-underline sm:text-2xl" href={`/products/${line.product.handle}`}>
                        {line.product.title}
                      </Link>
                      <p className="mt-1 text-sm text-foreground-muted">
                        {line.variant.selectedOptions.map((option) => `${option.name}: ${option.value}`).join(" · ")}
                      </p>
                      <p className="mt-2 text-sm tabular-nums">{formatMoney(line.variant.price)} each</p>
                    </div>
                    <button
                      aria-label={`Remove ${line.product.title}`}
                      className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-surface-muted disabled:opacity-40"
                      disabled={isPending}
                      onClick={() => updateLine(line.id, 0)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-grid grid-cols-3 items-center rounded-full border border-border">
                      <button aria-label={`Decrease ${line.product.title} quantity`} className="grid size-10 place-items-center" disabled={isPending} onClick={() => updateLine(line.id, line.quantity - 1)} type="button">
                        <Minus aria-hidden="true" className="size-4" />
                      </button>
                      <span className="min-w-9 text-center text-sm tabular-nums">{line.quantity}</span>
                      <button aria-label={`Increase ${line.product.title} quantity`} className="grid size-10 place-items-center disabled:opacity-40" disabled={isPending || atMaximum} onClick={() => updateLine(line.id, line.quantity + 1)} type="button">
                        <Plus aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                    <p className="font-semibold tabular-nums">{formatMoney(line.total)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="rounded-[var(--radius-panel)] border bg-surface-muted p-6 lg:sticky lg:top-28" aria-labelledby="cart-summary-title">
        <h2 className="font-serif text-2xl font-semibold" id="cart-summary-title">Order summary</h2>
        <dl className="mt-6 space-y-3 border-b border-border pb-5">
          <div className="flex justify-between gap-4">
            <dt>Subtotal</dt>
            <dd className="font-semibold tabular-nums">{formatMoney(cart.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-sm text-foreground-muted">
            <dt>Shipping and taxes</dt>
            <dd>Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-5 flex justify-between gap-4 text-lg font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatMoney(cart.total)}</span>
        </div>
        <Button className="mt-6 w-full" disabled={isPending} onClick={checkout} size="lg">
          {isPending ? "Updating…" : "Continue to secure checkout"}
        </Button>
        <p className="mt-3 text-xs text-foreground-muted">Checkout is securely hosted by Shopify.</p>
        <p aria-live="polite" className={cn("mt-4 min-h-5 text-sm", message && "text-error")} role="status">
          {message}
        </p>
      </aside>
    </div>
  );
}

