"use client";

import { X } from "lucide-react";

import { ModalDialog } from "@/components/ui/modal-dialog";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      dialogId="site-search-dialog"
      titleId="site-search-title"
      descriptionId="site-search-description"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-label text-accent">Development foundation</p>
            <h2 id="site-search-title" className="type-section-heading mt-2">
              Search
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            data-autofocus
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </div>
        <p
          id="site-search-description"
          className="type-body mt-5 max-w-[42ch] text-foreground-muted"
        >
          The accessible search panel is ready. Search fields and live results will
          be introduced in their approved phase.
        </p>
      </div>
    </ModalDialog>
  );
}
