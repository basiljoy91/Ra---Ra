"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { ProductColourOptions } from "@/components/commerce/product-card/product-colour-options.client";
import { QuickAddDialog } from "@/components/commerce/product-card/quick-add-dialog.client";
import { Button, buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utilities";
import type {
  ProductCardActionVariant,
  ProductCardQuickAddHandler,
  ProductColourOption,
} from "@/types/product-card";

interface ProductCardActionsProps {
  productId: string;
  productTitle: string;
  productHref: string;
  variants: readonly ProductCardActionVariant[];
  colourOptions: readonly ProductColourOption[];
  soldOut: boolean;
  showColourOptions: boolean;
  showQuickAdd: boolean;
  quickAddAction?: ProductCardQuickAddHandler | undefined;
}

interface DirectFeedback {
  kind: "success" | "error";
  message: string;
}

export function ProductCardActions({
  productId,
  productTitle,
  productHref,
  variants,
  colourOptions,
  soldOut,
  showColourOptions,
  showQuickAdd,
  quickAddAction,
}: ProductCardActionsProps) {
  const initialColour =
    colourOptions.length === 1 ? colourOptions[0]?.value ?? null : null;
  const [selectedColour, setSelectedColour] = useState<string | null>(
    initialColour,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState<DirectFeedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const purchasableVariants = variants.filter((variant) => variant.available);

  function handleQuickAdd() {
    setFeedback(null);

    const directVariant =
      purchasableVariants.length === 1 ? purchasableVariants[0] : undefined;

    if (!directVariant || !quickAddAction) {
      setDialogOpen(true);
      return;
    }

    startTransition(async () => {
      try {
        const result = await quickAddAction({
          productId,
          variantId: directVariant.id,
          quantity: 1,
        });
        setFeedback({
          kind: result.status,
          message:
            result.message ??
            "Development selection confirmed. No cart was updated.",
        });
      } catch {
        setFeedback({
          kind: "error",
          message: "The development action could not be completed. Try again.",
        });
      }
    });
  }

  if (!showColourOptions && !showQuickAdd) {
    return null;
  }

  return (
    <div className="mt-2 grid gap-3">
      {showColourOptions ? (
        <ProductColourOptions
          onChange={(value) => {
            setSelectedColour(value);
            setFeedback(null);
          }}
          options={colourOptions}
          selectedValue={selectedColour}
        />
      ) : null}

      {showQuickAdd ? (
        soldOut ? (
          <Button className="w-full" disabled size="md" variant="secondary">
            Sold Out
          </Button>
        ) : quickAddAction ? (
          <Button
            aria-haspopup={purchasableVariants.length > 1 ? "dialog" : undefined}
            className="w-full"
            disabled={isPending}
            onClick={handleQuickAdd}
            size="md"
            variant="secondary"
          >
            {isPending ? "Adding…" : "Quick Add"}
          </Button>
        ) : (
          <Link
            className={buttonStyles({
              variant: "secondary",
              size: "md",
              className: "w-full",
            })}
            href={productHref}
          >
            Choose Options
          </Link>
        )
      ) : null}

      <p
        aria-live="polite"
        className={cn(
          "type-caption min-h-5",
          feedback?.kind === "success" && "text-success",
          feedback?.kind === "error" && "text-error",
        )}
        role="status"
      >
        {feedback?.message ?? ""}
      </p>

      {quickAddAction ? (
        <QuickAddDialog
          colourOptions={colourOptions}
          onClose={() => setDialogOpen(false)}
          onColourChange={setSelectedColour}
          open={dialogOpen}
          productId={productId}
          productTitle={productTitle}
          quickAddAction={quickAddAction}
          selectedColour={selectedColour}
          variants={variants}
        />
      ) : null}
    </div>
  );
}
