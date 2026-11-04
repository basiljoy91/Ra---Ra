"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { AccountPlaceholderDialog } from "@/components/navigation/account-placeholder-dialog";
import { AnnouncementBar } from "@/components/navigation/announcement-bar";
import { CartPlaceholderDialog } from "@/components/navigation/cart-placeholder-dialog";
import { DesktopHeader } from "@/components/navigation/desktop-header";
import { MobileHeader } from "@/components/navigation/mobile-header";
import { MobileNavigationDrawer } from "@/components/navigation/mobile-navigation-drawer";
import { SearchDialog } from "@/components/navigation/search-dialog";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utilities";
import type { HeaderAppearance } from "@/types/navigation";

type ActiveOverlay = "menu" | "search" | "cart" | "account" | null;

interface SiteHeaderProps {
  appearance?: HeaderAppearance;
}

export function SiteHeader({
  appearance = siteConfig.header.appearance,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  const resolvedAppearance = appearance;
  const searchEnabled =
    siteConfig.header.searchEnabled && siteConfig.navigationFeatureFlags.search;
  const cartEnabled =
    siteConfig.header.cartEnabled && siteConfig.navigationFeatureFlags.cart;

  return (
    <>
      <AnnouncementBar config={siteConfig.header.announcementBar} />
      <header
        data-appearance={resolvedAppearance}
        className={cn(
          "z-[var(--z-sticky)] w-full border-b transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)]",
          siteConfig.header.sticky && "sticky top-0",
          resolvedAppearance === "solid"
            ? "border-border bg-background/92 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <DesktopHeader
          navigation={siteConfig.header.primaryNavigation}
          searchEnabled={searchEnabled}
          cartEnabled={cartEnabled}
          cartCount={siteConfig.header.developmentCartCount}
          onSearch={() => setActiveOverlay("search")}
          onCart={() => setActiveOverlay("cart")}
          onAccount={() => setActiveOverlay("account")}
          activeDialog={
            activeOverlay === "search" ||
            activeOverlay === "cart" ||
            activeOverlay === "account"
              ? activeOverlay
              : null
          }
        />
        <MobileHeader
          menuOpen={activeOverlay === "menu"}
          activeDialog={
            activeOverlay === "search" || activeOverlay === "cart"
              ? activeOverlay
              : null
          }
          searchEnabled={searchEnabled}
          cartEnabled={cartEnabled}
          cartCount={siteConfig.header.developmentCartCount}
          onMenu={() => setActiveOverlay("menu")}
          onSearch={() => setActiveOverlay("search")}
          onCart={() => setActiveOverlay("cart")}
          onAccount={() => setActiveOverlay("account")}
        />
      </header>

      <MobileNavigationDrawer
        open={activeOverlay === "menu"}
        onClose={() => setActiveOverlay(null)}
        primaryNavigation={siteConfig.header.primaryNavigation}
        secondaryLinks={siteConfig.header.mobileSecondaryLinks}
        socialLinks={siteConfig.socialLinks}
        market={siteConfig.market}
      />
      <SearchDialog
        open={activeOverlay === "search"}
        onClose={() => setActiveOverlay(null)}
      />
      <CartPlaceholderDialog
        open={activeOverlay === "cart"}
        onClose={() => setActiveOverlay(null)}
        itemCount={siteConfig.header.developmentCartCount}
      />
      <AccountPlaceholderDialog
        open={activeOverlay === "account"}
        onClose={() => setActiveOverlay(null)}
      />
    </>
  );
}
