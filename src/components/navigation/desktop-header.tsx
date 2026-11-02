import { BrandLogo } from "@/components/navigation/brand-logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { HeaderActions } from "@/components/navigation/header-actions";
import { Container } from "@/components/layout/container";
import type { NavigationItem } from "@/types/navigation";

interface DesktopHeaderProps {
  navigation: readonly NavigationItem[];
  searchEnabled: boolean;
  cartEnabled: boolean;
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
  cartCount,
  onSearch,
  onCart,
  onAccount,
  activeDialog,
}: DesktopHeaderProps) {
  return (
    <Container className="hidden h-[var(--header-height-desktop)] min-[64rem]:grid min-[64rem]:grid-cols-[1fr_auto_1fr] min-[64rem]:items-center min-[64rem]:gap-5">
      <BrandLogo className="justify-self-start" />
      <DesktopNavigation items={navigation} />
      <HeaderActions
        searchEnabled={searchEnabled}
        cartEnabled={cartEnabled}
        cartCount={cartCount}
        onSearch={onSearch}
        onCart={onCart}
        onAccount={onAccount}
        activeDialog={activeDialog}
        className="justify-self-end"
      />
    </Container>
  );
}
