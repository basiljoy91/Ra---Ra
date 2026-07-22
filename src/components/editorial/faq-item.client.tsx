"use client";

import { useId, useState } from "react";

import type { FaqItemData } from "@/types/editorial";

interface FaqItemProps {
  item: FaqItemData;
}

export function FaqItem({ item }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const generatedId = useId();
  const buttonId = `${generatedId}-button`;
  const panelId = `${generatedId}-panel`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left font-semibold"
          id={buttonId}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span>{item.question}</span>
          <span aria-hidden="true" className="text-xl font-normal text-accent">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        aria-labelledby={buttonId}
        className="pb-6 pr-10 text-foreground-muted"
        hidden={!isOpen}
        id={panelId}
        role="region"
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
