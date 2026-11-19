"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utilities";
import type { LegalContactAction, LegalContactField, LegalContactState } from "@/types/legal";

const INITIAL_STATE: LegalContactState = { status: "idle", message: "", submissionCount: 0 };
const fieldClass = "min-h-12 w-full rounded-[var(--radius-control)] border border-border bg-background px-4 py-3 text-foreground placeholder:text-foreground-muted hover:border-foreground-muted disabled:cursor-wait disabled:opacity-65";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending} size="lg" type="submit">{pending ? "Nachricht wird gesendet …" : "Nachricht senden"}</Button>;
}

export function ContactForm({ action }: { action: LegalContactAction }) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);
  const id = useId();
  const error = (field: LegalContactField) => state.fieldErrors?.[field];

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input autoComplete="off" id={`${id}-website`} name="companyWebsite" tabIndex={-1} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={error("name")} id={`${id}-name`} label="Name" name="name" />
        <Field autoComplete="email" error={error("email")} id={`${id}-email`} label="E-Mail-Adresse" name="email" type="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={error("orderNumber")} id={`${id}-order`} label="Bestellnummer (optional)" name="orderNumber" required={false} />
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-topic`}>Thema</label>
          <select aria-describedby={error("topic") ? `${id}-topic-error` : undefined} aria-invalid={Boolean(error("topic"))} className={cn(fieldClass, error("topic") && "border-error")} defaultValue="" id={`${id}-topic`} name="topic" required>
            <option disabled value="">Bitte auswählen</option>
            <option value="order">Bestellung</option>
            <option value="shipping">Versand</option>
            <option value="returns">Widerruf oder Rücksendung</option>
            <option value="product">Produkt oder Größe</option>
            <option value="other">Sonstiges</option>
          </select>
          <FieldError id={`${id}-topic-error`} message={error("topic")} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-message`}>Nachricht</label>
        <textarea aria-describedby={error("message") ? `${id}-message-error` : undefined} aria-invalid={Boolean(error("message"))} className={cn(fieldClass, "min-h-44 resize-y", error("message") && "border-error")} id={`${id}-message`} maxLength={3000} name="message" required />
        <FieldError id={`${id}-message-error`} message={error("message")} />
      </div>
      <p className="text-sm leading-6 text-foreground-muted">
        Wir verwenden deine Angaben ausschließlich zur Bearbeitung deines Anliegens. Einzelheiten findest du in der <Link className="font-semibold text-foreground underline" href="/privacy">Datenschutzerklärung</Link>. Für einen Widerruf kannst du unabhängig davon die Seite <Link className="font-semibold text-foreground underline" href="/widerruf">Vertrag widerrufen</Link> nutzen.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SubmitButton />
        <p aria-atomic="true" aria-live="polite" className={cn("min-h-6 text-sm font-semibold", state.status === "success" && "text-success", state.status === "error" && "text-error")} role="status">
          {state.message}{state.reference ? ` Referenz: ${state.reference}` : ""}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, name, error, required = true, type = "text", autoComplete }: { id: string; label: string; name: "name" | "email" | "orderNumber"; error?: string | undefined; required?: boolean; type?: "text" | "email"; autoComplete?: string | undefined }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold" htmlFor={id}>{label}</label>
      <input aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} autoComplete={autoComplete} className={cn(fieldClass, error && "border-error")} id={id} maxLength={name === "email" ? 254 : name === "orderNumber" ? 80 : 100} name={name} required={required} type={type} />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  return message ? <p className="mt-2 text-sm text-error" id={id} role="alert">{message}</p> : null;
}
