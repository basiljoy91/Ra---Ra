"use client";

import { UserRound, X } from "lucide-react";

import { ModalDialog } from "@/components/ui/modal-dialog";

interface AccountPlaceholderDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AccountPlaceholderDialog({
  open,
  onClose,
}: AccountPlaceholderDialogProps) {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      dialogId="account-placeholder-dialog"
      titleId="account-placeholder-title"
      descriptionId="account-placeholder-description"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-label text-accent">Account</p>
            <h2
              id="account-placeholder-title"
              className="type-section-heading mt-2"
            >
              Not connected yet
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close account message"
            onClick={onClose}
            data-autofocus
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </div>

        <div className="mt-7 flex items-start gap-4 border-t border-border pt-6">
          <UserRound
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-accent"
            size={22}
            strokeWidth={1.5}
          />
          <p
            id="account-placeholder-description"
            className="type-small max-w-[38ch] text-foreground-muted"
          >
            Secure customer accounts will be connected with the approved
            commerce provider. Order history and saved details are not
            available in this storefront build.
          </p>
        </div>
      </div>
    </ModalDialog>
  );
}
