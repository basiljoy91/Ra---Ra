import { CookieSettingsTrigger } from "@/components/layout/footer/cookie-settings-trigger";
import type { FooterConfig } from "@/types/footer";

type FooterBottomBarProps = Pick<
  FooterConfig,
  "copyrightNotice" | "cookieSettings"
>;

export function FooterBottomBar({
  copyrightNotice,
  cookieSettings,
}: FooterBottomBarProps) {
  return (
    <div className="flex flex-col gap-[var(--space-5)] border-t border-primary-foreground/15 py-[var(--space-6)] sm:flex-row sm:items-start sm:justify-between">
      <p className="type-caption text-primary-foreground/55">
        {copyrightNotice}
      </p>
      <CookieSettingsTrigger config={cookieSettings} />
    </div>
  );
}
