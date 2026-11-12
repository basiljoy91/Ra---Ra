"use client";

import {
  LoaderCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ui/modal-dialog";
import {
  getCartAction,
  getCheckoutUrlAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/features/cart/commerce-cart";
import type { Cart } from "@/lib/commerce";
import { publishCartUpdated } from "@/lib/commerce/cart-events";
import { cn, formatMoney } from "@/lib/utilities";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CartPlaceholderDialog({ open, onClose }: CartDialogProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;

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
  }, [open]);

  function updateLine(lineId: string, quantity: number) {
    setMessage("");
    startTransition(async () => {
      const result = await updateCartLineAction(lineId, quantity);
      if (result.status === "success") {
        setCart(result.cart);
        publishCartUpdated(result.cart.totalQuantity);
      } else {
        setMessage(result.message);
      }
    });
  }

  function removeLine(lineId: string) {
    setMessage("");
    startTransition(async () => {
      const result = await removeCartLineAction(lineId);
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

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      dialogId="cart-placeholder-dialog"
      titleId="cart-placeholder-title"
      descriptionId="cart-placeholder-description"
    >
      <div className="flex max-h-[min(85vh,48rem)] flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-label text-accent">Your selection</p>
            <h2 id="cart-placeholder-title" className="type-section-heading mt-2">
              Your bag
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close bag"
            onClick={onClose}
            data-autofocus
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </div>

        <p className="sr-only" id="cart-placeholder-description">
          Review items, update quantities, or continue to Shopify checkout.
        </p>

        {loading ? (
          <div className="grid min-h-48 place-items-center text-foreground-muted">
            <LoaderCircle className="size-6 animate-spin" aria-label="Loading bag" />
          </div>
        ) : !configured ? (
          <div className="mt-6 rounded-[var(--radius-panel)] bg-surface-muted p-5">
            <p className="font-semibold">Shopify connection pending</p>
            <p className="type-small mt-2 text-foreground-muted">
              Add the Shopify Storefront environment variables to activate the live bag and checkout.
            </p>
          </div>
        ) : !cart || cart.lines.length === 0 ? (
          <div className="mt-6 grid min-h-48 place-items-center rounded-[var(--radius-panel)] bg-surface-muted p-6 text-center">
            <div>
              <ShoppingBag className="mx-auto size-6" aria-hidden="true" />
              <p className="mt-3 font-semibold">Your bag is empty</p>
              <p className="type-small mt-1 text-foreground-muted">
                Choose a design and size from the Beyond collection.
              </p>
              <Link href="/collections/beyond" onClick={onClose} className="mt-4 inline-block text-sm font-semibold">
                Shop Beyond
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-6 min-h-0 flex-1 divide-y divide-border overflow-y-auto" role="list">
              {cart.lines.map((line) => {
                const image = line.variant.image;
                const maximum = line.variant.quantityAvailable;
                const atMaximum = maximum !== undefined && line.quantity >= maximum;

                return (
                  <li className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 py-4" key={line.id}>
                    <Link className="relative aspect-[4/5] overflow-hidden bg-surface-muted" href={`/products/${line.product.handle}`} onClick={onClose}>
                      {image ? <Image alt={image.alt} fill sizes="80px" src={image.url} className="object-cover" /> : null}
                    </Link>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link className="font-serif text-lg font-semibold no-underline" href={`/products/${line.product.handle}`} onClick={onClose}>
                            {line.product.title}
                          </Link>
                          <p className="type-caption mt-1 text-foreground-muted">
                            {line.variant.selectedOptions.map((option) => option.value).join(" · ")}
                          </p>
                        </div>
                        <button aria-label={`Remove ${line.product.title}`} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-surface-muted" disabled={isPending} onClick={() => removeLine(line.id)} type="button">
                          <Trash2 aria-hidden="true" className="size-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-grid grid-cols-3 items-center rounded-full border border-border">
                          <button aria-label={`Decrease ${line.product.title} quantity`} className="grid size-9 place-items-center" disabled={isPending} onClick={() => updateLine(line.id, line.quantity - 1)} type="button">
                            <Minus aria-hidden="true" className="size-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                          <button aria-label={`Increase ${line.product.title} quantity`} className="grid size-9 place-items-center disabled:opacity-40" disabled={isPending || atMaximum} onClick={() => updateLine(line.id, line.quantity + 1)} type="button">
                            <Plus aria-hidden="true" className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold tabular-nums">
                          {formatMoney(line.total)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold tabular-nums">{formatMoney(cart.subtotal)}</span>
              </div>
              <p className="type-caption mt-1 text-foreground-muted">
                Shipping and taxes are calculated in Shopify checkout.
              </p>
              <Link
                className="mt-4 block text-center text-sm font-semibold underline underline-offset-4"
                href="/cart"
                onClick={onClose}
              >
                View full bag
              </Link>
              <Button className="mt-4 w-full" disabled={isPending} onClick={checkout} size="lg">
                {isPending ? "Updating…" : "Continue to secure checkout"}
              </Button>
            </div>
          </>
        )}

        <p aria-live="polite" className={cn("type-small mt-3 min-h-5", message && "text-error")} role="status">
          {message}
        </p>
      </div>
    </ModalDialog>
  );
}
