import type { FooterConfig } from "@/types/footer";

type CookieSettingsTriggerProps = {
  config: FooterConfig["cookieSettings"];
};

export function CookieSettingsTrigger({
  config,
}: CookieSettingsTriggerProps) {
  const statusId = "footer-cookie-settings-status";

  return (
    <div className="text-left sm:text-right">
      <button
        type="button"
        className="type-small inline-flex min-h-11 items-center text-primary-foreground/75 underline decoration-primary-foreground/30 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={!config.enabled}
        aria-describedby={config.enabled ? undefined : statusId}
        data-consent-settings-trigger={config.enabled ? "" : undefined}
      >
        {config.label}
      </button>
      {!config.enabled ? (
        <p id={statusId} className="type-caption mt-1 text-primary-foreground/55">
          {config.unavailableMessage}
        </p>
      ) : null}
    </div>
  );
}
