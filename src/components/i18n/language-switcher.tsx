"use client";

import { Languages } from "lucide-react";

import { useLocale } from "@/components/i18n/locale-provider.client";
import { cn } from "@/lib/utilities";

export function LanguageSwitcher({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      aria-label={locale === "de" ? "Sprache ändern" : "Change language"}
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
    >
      {!compact ? <Languages aria-hidden="true" className="mr-1 size-3.5" strokeWidth={1.6} /> : null}
      {(["de", "en"] as const).map((option) => (
        <button
          aria-pressed={locale === option}
          className={cn(
            "inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm border px-2 text-[0.62rem] font-semibold tracking-[0.08em] uppercase transition-colors",
            locale === option
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-transparent text-foreground hover:border-foreground",
          )}
          key={option}
          onClick={() => setLocale(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
