import { Menu } from "lucide-react";

import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/navigation/brand-logo";
import { HeaderActions } from "@/components/navigation/header-actions";

interface MobileHeaderProps {
  menuOpen: boolean;
  activeDialog: "search" | "cart" | null;
  searchEnabled: boolean;
  cartEnabled: boolean;
  cartCount: number;
  onMenu: () => void;
  onSearch: () => void;
  onCart: () => void;
}

export function MobileHeader({
  menuOpen,
  activeDialog,
  searchEnabled,
  cartEnabled,
  cartCount,
  onMenu,
  onSearch,
  onCart,
}: MobileHeaderProps) {
  return (
    <Container className="grid h-[var(--header-height-mobile)] grid-cols-[1fr_auto_1fr] items-center gap-1 min-[72rem]:hidden">
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

      <BrandLogo compact className="justify-self-center" />

      <HeaderActions
        searchEnabled={searchEnabled}
        cartEnabled={cartEnabled}
        cartCount={cartCount}
        onSearch={onSearch}
        onCart={onCart}
        compact
        activeDialog={activeDialog}
        className="justify-self-end"
      />
    </Container>
  );
}
