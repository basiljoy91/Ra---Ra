import Link from "next/link";

import type { FooterConfig } from "@/types/footer";

type CookieSettingsTriggerProps = {
  config: FooterConfig["cookieSettings"];
};

export function CookieSettingsTrigger({
  config,
}: CookieSettingsTriggerProps) {
  return (
    <div className="text-left sm:text-right">
      <Link
        className="type-small inline-flex min-h-11 items-center text-primary-foreground/75 underline decoration-primary-foreground/30 underline-offset-4"
        href="/cookie-einstellungen"
      >
        {config.label}
      </Link>
    </div>
  );
}
