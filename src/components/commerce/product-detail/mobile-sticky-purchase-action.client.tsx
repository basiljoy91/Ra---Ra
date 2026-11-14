"use client";

import { useEffect, useState } from "react";

import { ProductPrice } from "@/components/commerce/product-card/product-price";
import styles from "@/components/commerce/product-detail/product-detail-mobile.module.css";
import { Button } from "@/components/ui/button";
import type { Money } from "@/lib/commerce";

interface MobileStickyPurchaseActionProps {
  productTitle: string;
  actionLabel: string;
  disabled: boolean;
  pending: boolean;
  onAction: () => void;
  price: Money;
  compareAtPrice?: Money | undefined;
}

export function MobileStickyPurchaseAction({
  productTitle,
  actionLabel,
  disabled,
  pending,
  onAction,
  price,
  compareAtPrice,
}: MobileStickyPurchaseActionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const purchaseButton = document.querySelector<HTMLElement>(
      "[data-main-purchase-action]",
    );
    const footer = document.querySelector<HTMLElement>("[data-site-footer]");

    if (!purchaseButton) {
      return;
    }

    let purchasePassed = false;
    let footerVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === purchaseButton) {
            purchasePassed =
              !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
          }

          if (footer && entry.target === footer) {
            footerVisible = entry.isIntersecting;
          }
        }

        setVisible(purchasePassed && !footerVisible);
      },
      { threshold: 0 },
    );

    observer.observe(purchaseButton);
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`fixed inset-x-0 bottom-[calc(var(--mobile-bottom-nav-height)+env(safe-area-inset-bottom))] z-[var(--z-sticky)] border-t border-border bg-surface/98 px-[var(--page-gutter)] pb-3 pt-3 shadow-[0_-0.75rem_2rem_rgb(40_35_31_/_0.1)] min-[48rem]:bottom-0 min-[48rem]:pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${styles.stickyPurchase}`}>
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{productTitle}</p>
          <div className="mt-1">
            <ProductPrice price={price} compareAtPrice={compareAtPrice} />
          </div>
        </div>
        <Button
          aria-label={`${actionLabel} for ${productTitle}`}
          className="min-w-[9rem]"
          disabled={disabled || pending}
          onClick={onAction}
        >
          {pending ? "Adding…" : actionLabel}
        </Button>
      </div>
    </div>
  );
}
