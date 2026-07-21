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
  activeDialog: "search" | "cart" | null;
}

export function DesktopHeader({
  navigation,
  searchEnabled,
  cartEnabled,
  cartCount,
  onSearch,
  onCart,
  activeDialog,
}: DesktopHeaderProps) {
  return (
    <Container className="hidden h-[var(--header-height-desktop)] min-[72rem]:grid min-[72rem]:grid-cols-[1fr_auto_1fr] min-[72rem]:items-center min-[72rem]:gap-6">
      <BrandLogo className="justify-self-start" />
      <DesktopNavigation items={navigation} />
      <HeaderActions
        searchEnabled={searchEnabled}
        cartEnabled={cartEnabled}
        cartCount={cartCount}
        onSearch={onSearch}
        onCart={onCart}
        activeDialog={activeDialog}
        className="justify-self-end"
      />
    </Container>
  );
}
