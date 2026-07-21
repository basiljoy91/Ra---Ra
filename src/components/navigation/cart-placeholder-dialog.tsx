"use client";

import { ShoppingBag, X } from "lucide-react";

import { ModalDialog } from "@/components/ui/modal-dialog";

interface CartPlaceholderDialogProps {
  open: boolean;
  onClose: () => void;
  itemCount: number;
}

export function CartPlaceholderDialog({
  open,
  onClose,
  itemCount,
}: CartPlaceholderDialogProps) {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      dialogId="cart-placeholder-dialog"
      titleId="cart-placeholder-title"
      descriptionId="cart-placeholder-description"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-label text-accent">Development foundation</p>
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

        <div className="mt-6 flex items-center gap-4 rounded-[var(--radius-panel)] bg-surface-muted p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface">
            <ShoppingBag aria-hidden="true" size={20} strokeWidth={1.7} />
          </span>
          <div>
            <p className="font-semibold tabular-nums">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
            <p
              id="cart-placeholder-description"
              className="type-small text-foreground-muted"
            >
              Cart functionality is intentionally reserved for a later phase.
            </p>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}
