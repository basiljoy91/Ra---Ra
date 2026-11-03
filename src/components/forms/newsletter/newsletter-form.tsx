"use client";

import Link from "next/link";
import { useActionState, useCallback, useId, useState } from "react";

import { NewsletterSubmitButton } from "@/components/forms/newsletter/newsletter-submit-button";
import { cn } from "@/lib/utilities";
import type {
  NewsletterFormAction,
  NewsletterFormState,
  NewsletterSectionConfig,
} from "@/types/newsletter";

const INITIAL_NEWSLETTER_STATE: NewsletterFormState = {
  status: "idle",
  message: "",
  submissionCount: 0,
};

type NewsletterFormProps = {
  config: NewsletterSectionConfig;
  action: NewsletterFormAction;
  variant?: "default" | "editorial";
};

export function NewsletterForm({
  config,
  action,
  variant = "default",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [dismissedSubmissionCount, setDismissedSubmissionCount] = useState(0);
  const formActionWithReset = useCallback(
    async (previousState: NewsletterFormState, formData: FormData) => {
      const nextState = await action(previousState, formData);

      if (nextState.status === "success") {
        setEmail("");
      }

      return nextState;
    },
    [action],
  );
  const [state, formAction, isPending] = useActionState(
    formActionWithReset,
    INITIAL_NEWSLETTER_STATE,
  );
  const fieldId = useId();
  const helpId = `${fieldId}-help`;
  const errorId = `${fieldId}-error`;
  const showResult = state.submissionCount > dismissedSubmissionCount;
  const successfulSubmissionVisible =
    showResult && state.status === "success";
  const hasEmailError = showResult && Boolean(state.fieldErrors?.email);
  const describedBy = hasEmailError ? `${helpId} ${errorId}` : helpId;

  return (
    <form
      action={formAction}
      className={cn(
        variant === "editorial"
          ? "space-y-[var(--space-2)]"
          : "space-y-[var(--space-4)]",
      )}
      onSubmit={(event) => {
        if (successfulSubmissionVisible) {
          event.preventDefault();
        }
      }}
      noValidate
    >
      <div>
        <label
          htmlFor={fieldId}
          className={cn(
            "type-small mb-[var(--space-2)] font-semibold text-foreground",
            variant === "editorial" ? "sr-only" : "block",
          )}
        >
          {config.emailLabel}
        </label>
        <div className="flex flex-col gap-[var(--space-3)] sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <input
              id={fieldId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={254}
              placeholder={config.emailPlaceholder}
              disabled={isPending}
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                setDismissedSubmissionCount(state.submissionCount);
              }}
              aria-invalid={hasEmailError}
              aria-describedby={describedBy}
              className={cn(
                "w-full border bg-background px-[var(--space-4)] text-foreground transition-[border-color,background-color] duration-[var(--duration-base)] placeholder:text-foreground-muted disabled:cursor-wait disabled:bg-surface-muted",
                variant === "editorial"
                  ? "min-h-12 rounded-none text-sm"
                  : "min-h-14 rounded-[var(--radius-control)] text-base",
                hasEmailError
                  ? "border-error"
                  : "border-border hover:border-foreground-muted",
              )}
            />
            {hasEmailError ? (
              <p
                id={errorId}
                className="type-small mt-[var(--space-2)] text-error"
                role="alert"
              >
                {state.fieldErrors?.email}
              </p>
            ) : null}
          </div>
          <NewsletterSubmitButton
            disabled={successfulSubmissionVisible}
            editorial={variant === "editorial"}
            label={config.submitLabel}
            pendingLabel={config.pendingLabel}
          />
        </div>
      </div>

      <p
        id={helpId}
        className={cn(
          "type-caption max-w-2xl text-foreground-muted",
          variant === "editorial" && "text-[0.625rem] leading-relaxed",
        )}
      >
        {config.consentText}{" "}
        <Link
          href={config.privacyHref}
          className="font-semibold underline decoration-border transition-colors duration-[var(--duration-base)] hover:text-foreground"
        >
          {config.privacyLabel}
        </Link>
      </p>

      <p
        className={cn(
          "type-small min-h-[1.65em] font-semibold",
          showResult && state.status === "success" && "text-success",
          showResult && state.status === "error" && "text-error",
        )}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {showResult ? state.message : ""}
      </p>
    </form>
  );
}
