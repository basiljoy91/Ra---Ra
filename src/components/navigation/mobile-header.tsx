import { Menu } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { HeaderActions } from "@/components/navigation/header-actions";

interface MobileHeaderProps {
  menuOpen: boolean;
  activeDialog: "search" | "cart" | "account" | null;
  searchEnabled: boolean;
  cartEnabled: boolean;
  accountEnabled: boolean;
  cartCount: number;
  onMenu: () => void;
  onSearch: () => void;
  onCart: () => void;
  onAccount: () => void;
}

export function MobileHeader({
  menuOpen,
  activeDialog,
  searchEnabled,
  cartEnabled,
  accountEnabled,
  cartCount,
  onMenu,
  onSearch,
  onCart,
  onAccount,
}: MobileHeaderProps) {
  return (
    <Container className="grid h-[var(--header-height-mobile)] grid-cols-[1fr_auto_1fr] items-center gap-1 max-[47.999rem]:px-3 min-[64rem]:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation-drawer"
        onClick={onMenu}
        className="inline-flex size-11 items-center justify-center justify-self-start rounded-full border border-transparent transition-colors duration-[var(--duration-fast)] hover:border-border hover:bg-surface-muted"
      >
        <Menu aria-hidden="true" size={21} strokeWidth={1.7} />
      </button>

      <Link
        className="hidden justify-self-center font-serif text-[1.9rem] font-bold leading-none tracking-[-0.045em] no-underline max-[47.999rem]:block"
        href="/"
        aria-label="Ra & Ra home"
      >
        Ra &amp; Ra
      </Link>
      <BrandLogo compact className="justify-self-center max-[47.999rem]:hidden" />

      <HeaderActions
        searchEnabled={searchEnabled}
        cartEnabled={cartEnabled}
        accountEnabled={accountEnabled}
        cartCount={cartCount}
        onSearch={onSearch}
        onCart={onCart}
        onAccount={onAccount}
        compact
        activeDialog={activeDialog}
        className="justify-self-end"
      />
    </Container>
  );
}
