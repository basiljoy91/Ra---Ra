"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/navigation/brand-logo";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { cn, isNavigationHrefCurrent } from "@/lib/utilities";
import type { Market } from "@/lib/commerce";
import type { NavigationItem } from "@/types/navigation";

interface MobileNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  primaryNavigation: readonly NavigationItem[];
  secondaryLinks: readonly NavigationItem[];
  socialLinks: Readonly<Record<string, string>>;
  market: Market;
}

function MobileLink({
  item,
  pathname,
  onClose,
  quiet = false,
}: {
  item: NavigationItem;
  pathname: string;
  onClose: () => void;
  quiet?: boolean;
}) {
  if (!item.href) {
    return (
      <span
        className={cn(
          "flex min-h-11 items-center justify-between gap-3 py-2 text-foreground-muted",
          quiet ? "text-sm" : "text-base",
        )}
      >
        <span>{item.label}</span>
        {item.badge ? (
          <span className="rounded-full bg-surface-muted px-2 py-1 text-[0.625rem] font-bold tracking-[0.06em] uppercase">
            {item.badge}
          </span>
        ) : null}
      </span>
    );
  }

  const current = isNavigationHrefCurrent(pathname, item.href);

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      aria-current={current ? "page" : undefined}
      onClick={onClose}
      className={cn(
        "flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-control)] py-2 no-underline transition-colors duration-[var(--duration-fast)] hover:text-accent",
        quiet ? "text-sm" : "text-base font-semibold",
        current && "text-accent",
      )}
    >
      <span>{item.label}</span>
      {item.badge ? (
        <span className="rounded-full bg-surface-muted px-2 py-1 text-[0.625rem] font-bold tracking-[0.06em] text-foreground-muted uppercase">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function MobileNavigationDrawer({
  open,
  onClose,
  primaryNavigation,
  secondaryLinks,
  socialLinks,
  market,
}: MobileNavigationDrawerProps) {
  const pathname = usePathname();
  const enabledPrimaryItems = primaryNavigation.filter(
    (item) => item.enabled !== false,
  );
  const enabledSecondaryLinks = secondaryLinks.filter(
    (item) => item.enabled !== false,
  );
  const configuredSocialLinks = Object.entries(socialLinks).filter(
    ([, href]) => href.trim().length > 0,
  );

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      placement="left"
      dialogId="mobile-navigation-drawer"
      titleId="mobile-navigation-title"
      panelClassName="flex flex-col overflow-y-auto"
    >
      <div className="flex min-h-[var(--header-height-mobile)] shrink-0 items-center justify-between border-b border-border px-[var(--page-gutter)]">
        <BrandLogo compact onClick={onClose} />
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          data-autofocus
          className="inline-flex size-11 items-center justify-center rounded-full border border-transparent transition-colors duration-[var(--duration-fast)] hover:border-border hover:bg-surface-muted"
        >
          <X aria-hidden="true" size={21} strokeWidth={1.7} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-[var(--page-gutter)] py-7">
        <h2 id="mobile-navigation-title" className="sr-only">
          Site navigation
        </h2>

        <nav aria-label="Mobile primary navigation">
          <ul role="list" className="m-0 list-none p-0">
            {enabledPrimaryItems.map((item) => {
              const enabledChildren = item.children?.filter(
                (child) => child.enabled !== false,
              );

              if (enabledChildren?.length) {
                return (
                  <li key={item.id} className="border-b border-border py-5 first:pt-0">
                    <p className="type-label mb-2 text-foreground-muted">
                      {item.label}
                    </p>
                    <ul role="list" className="m-0 list-none p-0">
                      {enabledChildren.map((child) => (
                        <li key={child.id}>
                          <MobileLink
                            item={child}
                            pathname={pathname}
                            onClose={onClose}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.id} className="border-b border-border">
                  <MobileLink
                    item={item}
                    pathname={pathname}
                    onClose={onClose}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {enabledSecondaryLinks.length ? (
          <nav aria-label="Customer support" className="mt-8">
            <p className="type-label mb-2 text-foreground-muted">Support</p>
            <ul role="list" className="m-0 grid list-none grid-cols-2 gap-x-5 p-0">
              {enabledSecondaryLinks.map((item) => (
                <li key={item.id}>
                  <MobileLink
                    item={item}
                    pathname={pathname}
                    onClose={onClose}
                    quiet
                  />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {configuredSocialLinks.length ? (
          <nav aria-label="Social media" className="mt-8">
            <p className="type-label mb-2 text-foreground-muted">Follow</p>
            <ul role="list" className="m-0 flex list-none flex-wrap gap-5 p-0">
              {configuredSocialLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center text-sm capitalize"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-auto border-t border-border pt-6 text-xs text-foreground-muted">
          <p>
            {market.name} · {market.currencyCode} · English
          </p>
        </div>
      </div>
    </ModalDialog>
  );
}
