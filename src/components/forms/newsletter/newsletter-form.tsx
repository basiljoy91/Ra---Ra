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
};

export function NewsletterForm({ config, action }: NewsletterFormProps) {
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
  const hasEmailError = showResult && Boolean(state.fieldErrors?.email);
  const describedBy = hasEmailError ? `${helpId} ${errorId}` : helpId;

  return (
    <form
      action={formAction}
      className="space-y-[var(--space-4)]"
      noValidate={false}
    >
      <div>
        <label
          htmlFor={fieldId}
          className="type-small mb-[var(--space-2)] block font-semibold text-foreground"
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
                "min-h-14 w-full rounded-[var(--radius-control)] border bg-surface px-[var(--space-4)] text-foreground transition-[border-color,background-color] duration-[var(--duration-base)] placeholder:text-foreground-muted disabled:cursor-wait disabled:bg-surface-muted",
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
            label={config.submitLabel}
            pendingLabel={config.pendingLabel}
          />
        </div>
      </div>

      <p id={helpId} className="type-caption max-w-2xl text-foreground-muted">
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
