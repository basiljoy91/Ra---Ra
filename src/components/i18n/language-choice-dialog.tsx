"use client";

import { ArrowRight } from "lucide-react";

import { ModalDialog } from "@/components/ui/modal-dialog";
import type { AppLocale } from "@/i18n/config";

export function LanguageChoiceDialog({
  open,
  onChoose,
}: {
  open: boolean;
  onChoose: (locale: AppLocale) => void;
}) {
  return (
    <ModalDialog
      descriptionId="language-choice-description"
      dismissible={false}
      onClose={() => undefined}
      open={open}
      panelClassName="overflow-hidden border-[#2a2723] bg-[#f4efe8] text-[#111]"
      titleId="language-choice-title"
    >
      <div className="border-b border-black/15 bg-[#111] px-6 py-4 text-[#f4efe8] sm:px-8">
        <p className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase">RA &amp; RA / BEYOND</p>
      </div>
      <div className="px-6 py-7 sm:px-8 sm:py-9">
        <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-black/55 uppercase">Welcome · Willkommen</p>
        <h2 className="mt-3 font-serif text-[clamp(2.5rem,9vw,4.4rem)] font-medium leading-[0.9] tracking-[-0.035em]" id="language-choice-title">
          Choose your language
        </h2>
        <p className="mt-5 max-w-md text-sm leading-6 text-black/65" id="language-choice-description">
          Select the language you prefer for the Ra &amp; Ra experience. You can change it again at any time.
          <span className="mt-2 block">Wähle deine bevorzugte Sprache. Du kannst sie jederzeit wieder ändern.</span>
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            className="group flex min-h-16 items-center justify-between border border-black bg-black px-5 text-left text-sm font-semibold text-white transition-colors hover:bg-[#292622]"
            data-autofocus
            onClick={() => onChoose("en")}
            type="button"
          >
            <span><span className="block text-[0.6rem] font-medium tracking-[0.14em] text-white/55 uppercase">EN</span>English</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            className="group flex min-h-16 items-center justify-between border border-black/25 px-5 text-left text-sm font-semibold transition-colors hover:border-black hover:bg-black hover:text-white"
            onClick={() => onChoose("de")}
            type="button"
          >
            <span><span className="block text-[0.6rem] font-medium tracking-[0.14em] opacity-55 uppercase">DE</span>Deutsch</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <p className="mt-5 text-[0.65rem] leading-5 text-black/48">
          Your choice is stored as a necessary language preference on this device.
          <span className="mt-1 block">Deine Auswahl wird als notwendige Spracheinstellung auf diesem Gerät gespeichert.</span>
        </p>
      </div>
    </ModalDialog>
  );
}
