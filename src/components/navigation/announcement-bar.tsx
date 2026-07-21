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
      className="flex min-h-[var(--announcement-height)] items-center justify-center border-b border-border bg-surface-muted px-[var(--page-gutter)] py-1 text-center text-[0.6875rem] font-semibold tracking-[0.08em] text-foreground uppercase sm:text-xs"
    >
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
        <p>{text}</p>
      )}
    </aside>
  );
}
