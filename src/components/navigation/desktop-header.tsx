import { BrandLogo } from "@/components/navigation/brand-logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { HeaderActions } from "@/components/navigation/header-actions";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import type { NavigationItem } from "@/types/navigation";

interface DesktopHeaderProps {
  navigation: readonly NavigationItem[];
  searchEnabled: boolean;
  cartEnabled: boolean;
  accountEnabled: boolean;
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
  onAccount: () => void;
  activeDialog: "search" | "cart" | "account" | null;
}

export function DesktopHeader({
  navigation,
  searchEnabled,
  cartEnabled,
  accountEnabled,
  cartCount,
  onSearch,
  onCart,
  onAccount,
  activeDialog,
}: DesktopHeaderProps) {
  return (
    <Container className="hidden h-[var(--header-height-desktop)] min-[64rem]:grid min-[64rem]:grid-cols-[1fr_auto_1fr] min-[64rem]:items-center min-[64rem]:gap-5">
      <DesktopNavigation items={navigation.slice(0, 3)} />
      <BrandLogo className="justify-self-center" />
      <div className="flex items-center justify-self-end gap-3">
        <Link
          href="/journal"
          className="inline-flex min-h-11 items-center px-2 text-[0.6875rem] font-medium tracking-[0.1em] uppercase no-underline"
        >
          Journal
        </Link>
        <HeaderActions
          searchEnabled={searchEnabled}
          cartEnabled={cartEnabled}
          accountEnabled={accountEnabled}
          cartCount={cartCount}
          onSearch={onSearch}
          onCart={onCart}
          onAccount={onAccount}
          activeDialog={activeDialog}
          className="justify-self-end"
        />
      </div>
    </Container>
  );
}
