"use client";

import { House, Layers3, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utilities";

export function MobileBottomNavigation({
  cartCount,
  onSearch,
  onCart,
}: {
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
}) {
  const pathname = usePathname();
  const itemClass =
    "relative flex min-h-14 min-w-0 flex-1 items-center justify-center gap-0.5 px-1 pt-1 pb-0.5 text-[0.625rem] font-semibold no-underline transition-colors";

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed inset-x-0 bottom-0 z-[30] hidden min-h-[var(--mobile-bottom-nav-height)] items-stretch border-t border-[#cfc5bc] bg-[#f7f0e9]/97 px-1 pb-[env(safe-area-inset-bottom)] text-[#111] shadow-[0_-0.5rem_1.5rem_rgb(32_24_19_/_0.06)] backdrop-blur-md max-[47.999rem]:flex"
    >
      <Link aria-current={pathname === "/" ? "page" : undefined} className={cn(itemClass, pathname === "/" && "font-bold")} href="/">
        <span className="flex flex-col items-center gap-0.5"><House aria-hidden="true" fill={pathname === "/" ? "currentColor" : "none"} size={20} strokeWidth={1.6} />Home</span>
      </Link>
      <Link aria-current={pathname.startsWith("/products") ? "page" : undefined} className={cn(itemClass, pathname.startsWith("/products") && "font-bold")} href="/collections/beyond">
        <span className="flex flex-col items-center gap-0.5"><ShoppingBag aria-hidden="true" size={20} strokeWidth={1.6} />Shop</span>
      </Link>
      <Link aria-current={pathname.startsWith("/collections") ? "page" : undefined} className={cn(itemClass, pathname.startsWith("/collections") && "font-bold")} href="/collections">
        <span className="flex flex-col items-center gap-0.5"><Layers3 aria-hidden="true" fill={pathname.startsWith("/collections") ? "currentColor" : "none"} size={20} strokeWidth={1.6} />Collections</span>
      </Link>
      <button className={itemClass} type="button" onClick={onSearch} aria-label="Open search">
        <span className="flex flex-col items-center gap-0.5"><Search aria-hidden="true" size={20} strokeWidth={1.6} />Search</span>
      </button>
      <button className={itemClass} type="button" onClick={onCart} aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}>
        <span className="relative flex flex-col items-center gap-0.5">
          <ShoppingCart aria-hidden="true" size={21} strokeWidth={1.6} />Cart
          {cartCount > 0 ? (
            <span aria-hidden="true" className="absolute -top-1 left-[calc(50%+0.2rem)] grid min-h-4 min-w-4 place-items-center rounded-full bg-[#111] px-1 text-[0.5625rem] leading-none text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          ) : null}
        </span>
      </button>
    </nav>
  );
}
