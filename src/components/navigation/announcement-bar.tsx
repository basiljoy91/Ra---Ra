import Link from "next/link";

import type { AnnouncementBarConfig } from "@/types/navigation";

interface AnnouncementBarProps {
  config: AnnouncementBarConfig;
}

export function AnnouncementBar({ config }: AnnouncementBarProps) {
  const message = config.messages[0];

  if (!config.enabled || !message) {
    return null;
  }

  const text = (
    <>
      <span className={message.shortText ? "hidden min-[24rem]:inline" : undefined}>
        {message.text}
      </span>
      {message.shortText ? (
        <span className="min-[24rem]:hidden">{message.shortText}</span>
      ) : null}
    </>
  );

  return (
    <aside
      aria-label="Store announcement"
      className="relative z-[var(--z-sticky)] grid min-h-[var(--announcement-height)] grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-[#111] px-[var(--page-gutter)] py-1 text-center text-[0.5625rem] font-medium tracking-[0.16em] text-[#f6f1ea] uppercase sm:text-[0.625rem]"
    >
      <span aria-hidden="true" />
      <span>
        {message.href ? (
          <Link
            href={message.href}
            target={message.external ? "_blank" : undefined}
            rel={message.external ? "noreferrer" : undefined}
            className="rounded-sm"
          >
            {text}
          </Link>
        ) : (
          <span>{text}</span>
        )}
      </span>
      <span className="hidden justify-self-end tracking-[0.14em] min-[64rem]:inline-flex">
        <Link href="/faq#shipping">Track order</Link>
        <span aria-hidden="true" className="mx-3 opacity-50">·</span>
        <Link href="/faq">Help</Link>
      </span>
    </aside>
  );
}
