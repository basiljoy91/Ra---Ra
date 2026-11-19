"use client";

import Link from "next/link";
import { useActionState, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utilities";
import type { WithdrawalAction, WithdrawalField, WithdrawalState } from "@/types/legal";

const INITIAL_STATE: WithdrawalState = { status: "idle", message: "", submissionCount: 0 };
const fieldClass = "min-h-12 w-full rounded-[var(--radius-control)] border border-border bg-background px-4 py-3 text-foreground placeholder:text-foreground-muted hover:border-foreground-muted";
type Values = { name: string; orderReference: string; email: string; affectedItems: string; note: string };
const EMPTY_VALUES: Values = { name: "", orderReference: "", email: "", affectedItems: "", note: "" };

function ConfirmButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending} size="lg" type="submit">{pending ? "Widerruf wird übermittelt …" : "Widerruf bestätigen"}</Button>;
}

export function WithdrawalForm({ action }: { action: WithdrawalAction }) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const idempotencyKey = `withdrawal-${id.replace(/[^a-zA-Z0-9_-]/gu, "")}-request`;
  const update = (field: keyof Values, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const error = (field: WithdrawalField) => state.fieldErrors?.[field];

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-panel)] border border-success/45 bg-success/10 p-5" role="status">
        <h3 className="font-serif text-2xl">Widerruf übermittelt</h3>
        <p className="mt-3">{state.message}</p>
        {state.reference ? <p className="mt-2 text-sm">Referenz: {state.reference}</p> : null}
        {state.receivedAt ? <p className="mt-1 text-sm">Eingang: {new Date(state.receivedAt).toLocaleString("de-DE")}</p> : null}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate ref={formRef}>
      <div className="sr-only" aria-hidden="true"><label htmlFor={`${id}-website`}>Website</label><input autoComplete="off" id={`${id}-website`} name="companyWebsite" tabIndex={-1} /></div>
      <input name="idempotencyKey" type="hidden" value={idempotencyKey} />
      {step === 1 ? (
        <>
          <p className="type-label text-accent">Schritt 1 von 2 · Angaben bereitstellen</p>
          <WithdrawalField autoComplete="name" error={error("name")} id={`${id}-name`} label="Name" name="name" onChange={(value) => update("name", value)} value={values.name} />
          <WithdrawalField error={error("orderReference")} id={`${id}-order`} label="Bestellnummer oder Vertragskennung" name="orderReference" onChange={(value) => update("orderReference", value)} value={values.orderReference} />
          <WithdrawalField autoComplete="email" error={error("email")} id={`${id}-email`} label="E-Mail-Adresse für die Eingangsbestätigung" name="email" onChange={(value) => update("email", value)} type="email" value={values.email} />
          <WithdrawalArea id={`${id}-items`} label="Betroffene Artikel oder Teil der Bestellung (optional)" name="affectedItems" onChange={(value) => update("affectedItems", value)} value={values.affectedItems} />
          <WithdrawalArea id={`${id}-note`} label="Zusätzliche Nachricht (optional)" name="note" onChange={(value) => update("note", value)} value={values.note} />
          <p className="text-sm leading-6 text-foreground-muted">Eine Begründung, ein Kundenkonto oder eine Telefonnummer sind nicht erforderlich. Hinweise zur Verarbeitung findest du in der <Link className="font-semibold text-foreground underline" href="/privacy">Datenschutzerklärung</Link>.</p>
          <Button onClick={() => { if (formRef.current?.reportValidity()) setStep(2); }} size="lg" type="button">Angaben prüfen</Button>
        </>
      ) : (
        <>
          <p className="type-label text-accent">Schritt 2 von 2 · Widerruf bestätigen</p>
          {Object.entries(values).map(([name, value]) => <input key={name} name={name} type="hidden" value={value} />)}
          <div className="rounded-[var(--radius-control)] border border-border bg-background p-4">
            <p className="font-semibold">Deine Widerrufserklärung</p>
            <p className="mt-2">Hiermit widerrufe ich den bezeichneten Vertrag oder den bezeichneten Teil des Vertrags.</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="text-foreground-muted">Name</dt><dd>{values.name}</dd></div>
              <div><dt className="text-foreground-muted">Bestellung / Vertrag</dt><dd>{values.orderReference}</dd></div>
              <div><dt className="text-foreground-muted">Bestätigung an</dt><dd className="break-all">{values.email}</dd></div>
              {values.affectedItems ? <div><dt className="text-foreground-muted">Betroffene Artikel</dt><dd className="whitespace-pre-wrap">{values.affectedItems}</dd></div> : null}
              {values.note ? <div><dt className="text-foreground-muted">Zusätzliche Nachricht</dt><dd className="whitespace-pre-wrap">{values.note}</dd></div> : null}
            </dl>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row"><ConfirmButton /><Button onClick={() => setStep(1)} size="lg" type="button" variant="secondary">Angaben ändern</Button></div>
        </>
      )}
      {state.message ? <p aria-atomic="true" aria-live="assertive" className={cn("text-sm font-semibold", state.status === "error" ? "text-error" : "text-success")} role="alert">{state.message}</p> : null}
    </form>
  );
}

function WithdrawalField({ id, label, name, value, onChange, error, type = "text", autoComplete }: { id: string; label: string; name: "name" | "orderReference" | "email"; value: string; onChange: (value: string) => void; error?: string | undefined; type?: "text" | "email"; autoComplete?: string | undefined }) {
  return <div><label className="mb-2 block text-sm font-semibold" htmlFor={id}>{label}</label><input aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)} autoComplete={autoComplete} className={cn(fieldClass, error && "border-error")} id={id} maxLength={name === "email" ? 254 : 120} name={name} onChange={(event) => onChange(event.currentTarget.value)} required type={type} value={value} />{error ? <p className="mt-2 text-sm text-error" id={`${id}-error`}>{error}</p> : null}</div>;
}

function WithdrawalArea({ id, label, name, value, onChange }: { id: string; label: string; name: "affectedItems" | "note"; value: string; onChange: (value: string) => void }) {
  return <div><label className="mb-2 block text-sm font-semibold" htmlFor={id}>{label}</label><textarea className={cn(fieldClass, "min-h-28 resize-y")} id={id} maxLength={1000} name={name} onChange={(event) => onChange(event.currentTarget.value)} value={value} /></div>;
}

