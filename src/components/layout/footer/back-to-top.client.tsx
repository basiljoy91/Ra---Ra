"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  function handleClick() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="inline-flex size-11 items-center justify-center rounded-full border border-foreground/55 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <ArrowUp aria-hidden="true" size={17} strokeWidth={1.4} />
    </button>
  );
}
