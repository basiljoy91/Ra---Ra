"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationDropdown } from "@/components/navigation/navigation-dropdown";
import { cn, isNavigationHrefCurrent } from "@/lib/utilities";
import type { NavigationItem } from "@/types/navigation";

interface DesktopNavigationProps {
  items: readonly NavigationItem[];
}

export function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();
  const enabledItems = items.filter((item) => item.enabled !== false);

  return (
    <nav aria-label="Primary navigation" className="h-full">
      <ul role="list" className="m-0 flex h-full list-none items-center gap-1 p-0">
        {enabledItems.map((item) => (
          <li key={item.id} className="flex h-full items-center">
            {item.children?.some((child) => child.enabled !== false) ? (
              <NavigationDropdown item={item} pathname={pathname} />
            ) : item.href ? (
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                aria-current={
                  isNavigationHrefCurrent(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  "inline-flex min-h-11 items-center rounded-sm px-2 text-[0.8125rem] font-semibold tracking-[0.015em] no-underline transition-colors duration-[var(--duration-fast)] hover:text-accent",
                  isNavigationHrefCurrent(pathname, item.href) && "text-accent",
                )}
              >
                {item.label}
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
