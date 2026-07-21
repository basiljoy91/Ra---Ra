"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { cn, isNavigationHrefCurrent } from "@/lib/utilities";
import type { NavigationItem } from "@/types/navigation";

interface NavigationDropdownProps {
  item: NavigationItem;
  pathname: string;
}

export function NavigationDropdown({ item, pathname }: NavigationDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusFirstOnOpenRef = useRef(false);
  const menuId = useId();
  const enabledChildren = item.children?.filter(
    (child) => child.enabled !== false,
  );
  const childIsCurrent =
    enabledChildren?.some(
      (child) => child.href && isNavigationHrefCurrent(pathname, child.href),
    ) ?? false;

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || !focusFirstOnOpenRef.current) {
      return;
    }

    focusFirstOnOpenRef.current = false;
    const focusFrame = window.requestAnimationFrame(() => {
      containerRef.current
        ?.querySelector<HTMLElement>("[data-dropdown-link]")
        ?.focus();
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [open]);

  if (!enabledChildren?.length) {
    return null;
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusFirstOnOpenRef.current = true;
      setOpen(true);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleContainerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setOpen(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      onKeyDown={handleContainerKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-current={childIsCurrent ? "page" : undefined}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "group inline-flex min-h-11 items-center gap-1 rounded-sm px-2 text-[0.8125rem] font-semibold tracking-[0.015em] no-underline transition-colors duration-[var(--duration-fast)] hover:text-accent",
          childIsCurrent && "text-accent",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          size={15}
          strokeWidth={1.8}
          className={cn(
            "transition-transform duration-[var(--duration-base)]",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-[calc(100%-0.125rem)] left-1/2 w-64 -translate-x-1/2 pt-3"
      >
        <div className="rounded-[var(--radius-panel)] border border-border bg-surface p-2 shadow-[var(--shadow-raised)]">
          <p className="type-label px-3 pt-2 pb-1 text-foreground-muted">
            {item.label}
          </p>
          <ul role="list" className="m-0 list-none p-0">
            {enabledChildren.map((child) => {
              const current =
                child.href && isNavigationHrefCurrent(pathname, child.href);
              const content = (
                <>
                  <span>{child.label}</span>
                  {child.badge ? (
                    <span className="rounded-full bg-surface-muted px-2 py-1 text-[0.625rem] font-bold tracking-[0.06em] text-foreground-muted uppercase">
                      {child.badge}
                    </span>
                  ) : null}
                </>
              );

              return (
                <li key={child.id}>
                  {child.href ? (
                    <Link
                      href={child.href}
                      target={child.external ? "_blank" : undefined}
                      rel={child.external ? "noreferrer" : undefined}
                      aria-current={current ? "page" : undefined}
                      data-dropdown-link
                      className={cn(
                        "flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium no-underline transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted",
                        current && "bg-accent-soft",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <span className="flex min-h-11 items-center justify-between gap-3 px-3 py-2 text-sm text-foreground-muted">
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
