"use client";

import { useState } from "react";

import { AnnouncementBar } from "@/components/navigation/announcement-bar";
import { CartPlaceholderDialog } from "@/components/navigation/cart-placeholder-dialog";
import { DesktopHeader } from "@/components/navigation/desktop-header";
import { MobileHeader } from "@/components/navigation/mobile-header";
import { MobileNavigationDrawer } from "@/components/navigation/mobile-navigation-drawer";
import { SearchDialog } from "@/components/navigation/search-dialog";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utilities";
import type { HeaderAppearance } from "@/types/navigation";

type ActiveOverlay = "menu" | "search" | "cart" | null;

interface SiteHeaderProps {
  appearance?: HeaderAppearance;
}

export function SiteHeader({
  appearance = siteConfig.header.appearance,
}: SiteHeaderProps) {
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  const searchEnabled =
    siteConfig.header.searchEnabled && siteConfig.navigationFeatureFlags.search;
  const cartEnabled =
    siteConfig.header.cartEnabled && siteConfig.navigationFeatureFlags.cart;

  return (
    <>
      <AnnouncementBar config={siteConfig.header.announcementBar} />
      <header
        data-appearance={appearance}
        className={cn(
          "relative z-[var(--z-sticky)] w-full border-b transition-colors duration-[var(--duration-base)]",
          siteConfig.header.sticky && "sticky top-0",
          appearance === "solid"
            ? "border-border bg-surface/95"
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
          activeDialog={
            activeOverlay === "search" || activeOverlay === "cart"
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
    </>
  );
}
