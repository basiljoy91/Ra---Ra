"use server";

import { allowLegalSubmission } from "@/lib/legal/rate-limit.server";
import {
  isSpamTrapFilled,
  validateLegalContact,
  validateWithdrawal,
} from "@/lib/legal/validation";
import type { LegalContactState, WithdrawalState } from "@/types/legal";

type DeliveryReceipt = {
  accepted: true;
  reference: string;
  persistedAt?: string;
  durableAcknowledgementQueued?: boolean;
};

function endpointConfiguration(): { endpoint: string; secret: string } | null {
  const endpoint = process.env.RA_LEGAL_SUBMISSION_ENDPOINT?.trim();
  const secret = process.env.RA_LEGAL_SUBMISSION_SECRET?.trim();
  if (!endpoint || !secret) return null;

  try {
    const url = new URL(endpoint);
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") return null;
    return { endpoint: url.toString(), secret };
  } catch {
    return null;
  }
}

async function deliver(
  event: "contact.requested" | "withdrawal.declared",
  payload: Record<string, unknown>,
  idempotencyKey: string,
): Promise<DeliveryReceipt | null> {
  const configuration = endpointConfiguration();
  if (!configuration) return null;

  const response = await fetch(configuration.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${configuration.secret}`,
      "idempotency-key": idempotencyKey,
      "x-ra-event": event,
    },
    body: JSON.stringify({ schemaVersion: 1, event, payload }),
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) return null;
  const body: unknown = await response.json().catch(() => null);
  if (!body || typeof body !== "object") return null;
  const receipt = body as Partial<DeliveryReceipt>;
  if (receipt.accepted !== true || typeof receipt.reference !== "string") return null;

  return receipt as DeliveryReceipt;
}

export async function submitLegalContact(
  previousState: LegalContactState,
  formData: FormData,
): Promise<LegalContactState> {
  const submissionCount = previousState.submissionCount + 1;
  if (isSpamTrapFilled(formData)) {
    return {
      status: "error",
      message: "Die Nachricht konnte nicht übermittelt werden.",
      submissionCount,
    };
  }
  const validation = validateLegalContact(formData);
  if (!validation.valid) {
    return {
      status: "error",
      message: "Bitte prüfe die markierten Felder.",
      submissionCount,
      fieldErrors: validation.fieldErrors,
    };
  }
  if (!(await allowLegalSubmission("contact"))) {
    return {
      status: "error",
      message: "Zu viele Versuche. Bitte warte einige Minuten oder schreibe uns direkt per E-Mail.",
      submissionCount,
    };
  }

  try {
    const idempotencyKey = crypto.randomUUID();
    const receipt = await deliver(
      "contact.requested",
      { ...validation.input, submittedAt: new Date().toISOString() },
      idempotencyKey,
    );
    if (!receipt) {
      return {
        status: "error",
        message:
          "Der Online-Versand ist noch nicht betriebsbereit. Bitte sende deine Nachricht direkt an contact@raundra.com.",
        submissionCount,
      };
    }
    return {
      status: "success",
      message: "Deine Nachricht wurde übermittelt.",
      submissionCount,
      reference: receipt.reference,
    };
  } catch {
    return {
      status: "error",
      message:
        "Die Nachricht konnte nicht sicher übermittelt werden. Bitte nutze contact@raundra.com.",
      submissionCount,
    };
  }
}

export async function submitWithdrawal(
  previousState: WithdrawalState,
  formData: FormData,
): Promise<WithdrawalState> {
  const submissionCount = previousState.submissionCount + 1;
  if (isSpamTrapFilled(formData)) {
    return {
      status: "error",
      message: "Der Widerruf konnte nicht übermittelt werden.",
      submissionCount,
    };
  }
  const validation = validateWithdrawal(formData);
  if (!validation.valid) {
    return {
      status: "error",
      message: "Bitte prüfe die markierten Angaben.",
      submissionCount,
      fieldErrors: validation.fieldErrors,
    };
  }
  if (!(await allowLegalSubmission("withdrawal"))) {
    return {
      status: "error",
      message:
        "Die Online-Übermittlung ist vorübergehend begrenzt. Nutze bitte unverzüglich contact@raundra.com; eine Begründung ist nicht erforderlich.",
      submissionCount,
    };
  }

  const receivedAt = new Date().toISOString();
  try {
    const receipt = await deliver(
      "withdrawal.declared",
      {
        name: validation.input.name,
        orderReference: validation.input.orderReference,
        confirmationEmail: validation.input.email,
        affectedItems: validation.input.affectedItems,
        note: validation.input.note,
        declaration:
          "Hiermit widerrufe ich den bezeichneten Vertrag oder den bezeichneten Teil des Vertrags.",
        channel: "web",
        receivedAt,
      },
      validation.input.idempotencyKey,
    );
    if (
      !receipt ||
      receipt.durableAcknowledgementQueued !== true ||
      typeof receipt.persistedAt !== "string"
    ) {
      return {
        status: "error",
        message:
          "Der Widerruf wurde nicht bestätigt gespeichert. Bitte erkläre ihn jetzt zusätzlich per E-Mail an contact@raundra.com.",
        submissionCount,
      };
    }
    return {
      status: "success",
      message:
        "Dein Widerruf wurde gespeichert. Die Eingangsbestätigung wird an die angegebene E-Mail-Adresse gesendet.",
      submissionCount,
      reference: receipt.reference,
      receivedAt: receipt.persistedAt,
    };
  } catch {
    return {
      status: "error",
      message:
        "Der Widerruf konnte nicht sicher gespeichert werden. Bitte erkläre ihn unverzüglich per E-Mail an contact@raundra.com.",
      submissionCount,
    };
  }
}

