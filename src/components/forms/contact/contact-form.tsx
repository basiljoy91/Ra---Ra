"use client";

import Link from "next/link";
import { useActionState, useCallback, useId, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utilities";
import type {
  ContactFormAction,
  ContactFormState,
  ContactSubmissionInput,
} from "@/types/contact";

const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
  submissionCount: 0,
};

const INITIAL_VALUES: ContactSubmissionInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface ContactFormProps {
  action: ContactFormAction;
}

function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full sm:w-auto" disabled={pending} size="lg" type="submit">
      {pending ? "Checking message…" : "Check Message"}
    </Button>
  );
}

export function ContactForm({ action }: ContactFormProps) {
  const [values, setValues] = useState<ContactSubmissionInput>(INITIAL_VALUES);
  const [dismissedSubmissionCount, setDismissedSubmissionCount] = useState(0);
  const formActionWithReset = useCallback(
    async (previousState: ContactFormState, formData: FormData) => {
      const nextState = await action(previousState, formData);

      if (nextState.status === "success") {
        setValues(INITIAL_VALUES);
      }

      return nextState;
    },
    [action],
  );
  const [state, formAction] = useActionState(
    formActionWithReset,
    INITIAL_CONTACT_STATE,
  );
  const formId = useId();
  const showResult = state.submissionCount > dismissedSubmissionCount;

  function updateValue(field: keyof ContactSubmissionInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setDismissedSubmissionCount(state.submissionCount);
  }

  const fieldClassName =
    "min-h-12 w-full rounded-[var(--radius-control)] border border-border bg-surface px-4 py-3 text-foreground transition-colors duration-[var(--duration-base)] placeholder:text-foreground-muted hover:border-foreground-muted disabled:cursor-wait disabled:bg-surface-muted";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactField
          autoComplete="name"
          error={showResult ? state.fieldErrors?.name : undefined}
          formId={formId}
          label="Name"
          name="name"
          onChange={(value) => updateValue("name", value)}
          value={values.name}
        />
        <ContactField
          autoComplete="email"
          error={showResult ? state.fieldErrors?.email : undefined}
          formId={formId}
          inputMode="email"
          label="Email"
          name="email"
          onChange={(value) => updateValue("email", value)}
          type="email"
          value={values.email}
        />
      </div>
      <ContactField
        error={showResult ? state.fieldErrors?.subject : undefined}
        formId={formId}
        label="Subject"
        name="subject"
        onChange={(value) => updateValue("subject", value)}
        value={values.subject}
      />
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={`${formId}-message`}>
          Message
        </label>
        <textarea
          aria-describedby={
            showResult && state.fieldErrors?.message
              ? `${formId}-message-error`
              : undefined
          }
          aria-invalid={showResult && Boolean(state.fieldErrors?.message)}
          className={cn(
            fieldClassName,
            "min-h-40 resize-y",
            showResult && state.fieldErrors?.message && "border-error",
          )}
          id={`${formId}-message`}
          maxLength={3000}
          name="message"
          onChange={(event) => updateValue("message", event.currentTarget.value)}
          required
          value={values.message}
        />
        {showResult && state.fieldErrors?.message ? (
          <p className="mt-2 text-sm text-error" id={`${formId}-message-error`} role="alert">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>
      <p className="type-caption max-w-2xl text-foreground-muted">
        This form uses development validation only. Nothing is sent or stored. Final processing and privacy wording will be supplied before launch. See the{" "}
        <Link className="font-semibold underline" href="/privacy">
          privacy placeholder
        </Link>
        .
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ContactSubmitButton />
        <p
          aria-atomic="true"
          aria-live="polite"
          className={cn(
            "min-h-6 text-sm font-semibold",
            showResult && state.status === "success" && "text-success",
            showResult && state.status === "error" && "text-error",
          )}
          role="status"
        >
          {showResult ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

interface ContactFieldProps {
  autoComplete?: string | undefined;
  error?: string | undefined;
  formId: string;
  inputMode?: "email" | undefined;
  label: string;
  name: "name" | "email" | "subject";
  onChange: (value: string) => void;
  type?: "email" | "text" | undefined;
  value: string;
}

function ContactField({
  autoComplete,
  error,
  formId,
  inputMode,
  label,
  name,
  onChange,
  type = "text",
  value,
}: ContactFieldProps) {
  const fieldId = `${formId}-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={cn(
          "min-h-12 w-full rounded-[var(--radius-control)] border border-border bg-surface px-4 py-3 text-foreground transition-colors duration-[var(--duration-base)] placeholder:text-foreground-muted hover:border-foreground-muted",
          error && "border-error",
        )}
        id={fieldId}
        inputMode={inputMode}
        maxLength={name === "subject" ? 140 : name === "email" ? 254 : 100}
        name={name}
        onChange={(event) => onChange(event.currentTarget.value)}
        required
        type={type}
        value={value}
      />
      {error ? (
        <p className="mt-2 text-sm text-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
