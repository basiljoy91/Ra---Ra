import { Search, ShoppingBag, UserRound } from "lucide-react";

import { cn } from "@/lib/utilities";

interface HeaderActionsProps {
  searchEnabled: boolean;
  cartEnabled: boolean;
  accountEnabled: boolean;
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
  onAccount: () => void;
  compact?: boolean;
  activeDialog?: "search" | "cart" | "account" | null;
  className?: string;
}

const actionClassName =
  "relative inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-transparent bg-transparent text-foreground transition-colors duration-[var(--duration-fast)] hover:border-border hover:bg-surface-muted";

export function HeaderActions({
  searchEnabled,
  cartEnabled,
  accountEnabled,
  cartCount,
  onSearch,
  onCart,
  onAccount,
  compact = false,
  activeDialog = null,
  className,
}: HeaderActionsProps) {
  if (!searchEnabled && !cartEnabled && !accountEnabled) {
    return null;
  }

  return (
    <div
      role="group"
      aria-label="Header actions"
      className={cn(
        "flex items-center",
        compact ? "gap-0" : "gap-1",
        className,
      )}
    >
      {searchEnabled ? (
        <button
          type="button"
          aria-label="Open search"
          aria-haspopup="dialog"
          aria-controls="site-search-dialog"
          aria-expanded={activeDialog === "search"}
          onClick={onSearch}
          className={actionClassName}
        >
          <Search aria-hidden="true" size={20} strokeWidth={1.7} />
        </button>
      ) : null}

      {accountEnabled ? (
        <button
          type="button"
          aria-label="Open account"
          aria-haspopup="dialog"
          aria-controls="account-placeholder-dialog"
          aria-expanded={activeDialog === "account"}
          onClick={onAccount}
          className={actionClassName}
        >
          <UserRound aria-hidden="true" size={20} strokeWidth={1.55} />
        </button>
      ) : null}

      {cartEnabled ? (
        <button
          type="button"
          aria-label={`Open bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          aria-haspopup="dialog"
          aria-controls="cart-placeholder-dialog"
          aria-expanded={activeDialog === "cart"}
          onClick={onCart}
          className={actionClassName}
        >
          <ShoppingBag aria-hidden="true" size={20} strokeWidth={1.7} />
          {cartCount > 0 ? (
            <span
              aria-hidden="true"
              className="absolute top-0.5 right-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.625rem] font-bold leading-none text-primary-foreground tabular-nums"
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
