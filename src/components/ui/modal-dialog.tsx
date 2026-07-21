"use client";

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utilities";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type ModalPlacement = "center" | "left";

export interface ModalDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  titleId: string;
  descriptionId?: string;
  dialogId?: string;
  placement?: ModalPlacement;
  panelClassName?: string;
  children: ReactNode;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("hidden") && element.tabIndex !== -1,
  );
}

export function ModalDialog({
  open,
  onClose,
  titleId,
  descriptionId,
  dialogId,
  placement = "center",
  panelClassName,
  className,
  children,
  ...props
}: ModalDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const returnFocusTo =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      const preferredTarget = panel?.querySelector<HTMLElement>("[data-autofocus]");
      const focusableElements = panel ? getFocusableElements(panel) : [];

      (preferredTarget ?? focusableElements[0] ?? panel)?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusableElements = getFocusableElements(panel);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (returnFocusTo?.isConnected) {
        returnFocusTo.focus();
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[var(--z-modal)]",
        placement === "center" && "grid place-items-center p-[var(--page-gutter)]",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close dialog"
        className="modal-overlay absolute inset-0 min-h-0 w-full border-0 bg-foreground/45 p-0"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cn(
          "relative z-10 border-border bg-surface text-foreground shadow-[var(--shadow-raised)] outline-none",
          placement === "left"
            ? "drawer-panel h-dvh w-[min(90vw,25rem)] border-r"
            : "dialog-panel max-h-[min(42rem,calc(100dvh-2rem))] w-full max-w-[34rem] overflow-y-auto rounded-[var(--radius-panel)] border",
          panelClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
