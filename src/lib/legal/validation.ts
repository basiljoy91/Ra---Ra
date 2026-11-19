import type {
  ContactTopic,
  LegalContactField,
  LegalContactInput,
  WithdrawalField,
  WithdrawalInput,
} from "@/types/legal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const CONTACT_TOPICS = new Set<ContactTopic>([
  "order",
  "shipping",
  "returns",
  "product",
  "other",
]);

function text(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMultiline(value: string): string {
  return value
    .replace(/\r\n?/gu, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/gu, "")
    .trim();
}

export function validateLegalContact(formData: FormData):
  | { valid: true; input: LegalContactInput }
  | { valid: false; fieldErrors: Partial<Record<LegalContactField, string>> } {
  const topicValue = text(formData, "topic") as ContactTopic;
  const input: LegalContactInput = {
    name: text(formData, "name"),
    email: text(formData, "email").toLowerCase(),
    orderNumber: text(formData, "orderNumber"),
    topic: topicValue,
    message: normalizeMultiline(text(formData, "message")),
  };
  const fieldErrors: Partial<Record<LegalContactField, string>> = {};

  if (input.name.length < 2 || input.name.length > 100) {
    fieldErrors.name = "Bitte gib einen Namen mit 2 bis 100 Zeichen ein.";
  }
  if (!EMAIL_PATTERN.test(input.email) || input.email.length > 254) {
    fieldErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (input.orderNumber.length > 80) {
    fieldErrors.orderNumber = "Die Bestellnummer darf höchstens 80 Zeichen enthalten.";
  }
  if (!CONTACT_TOPICS.has(input.topic)) {
    fieldErrors.topic = "Bitte wähle ein Thema aus.";
  }
  if (input.message.length < 10 || input.message.length > 3000) {
    fieldErrors.message = "Bitte gib eine Nachricht mit 10 bis 3000 Zeichen ein.";
  }

  return Object.keys(fieldErrors).length > 0
    ? { valid: false, fieldErrors }
    : { valid: true, input };
}

export function validateWithdrawal(formData: FormData):
  | { valid: true; input: WithdrawalInput }
  | { valid: false; fieldErrors: Partial<Record<WithdrawalField, string>> } {
  const input: WithdrawalInput = {
    name: text(formData, "name"),
    orderReference: text(formData, "orderReference"),
    email: text(formData, "email").toLowerCase(),
    affectedItems: normalizeMultiline(text(formData, "affectedItems")),
    note: normalizeMultiline(text(formData, "note")),
    idempotencyKey: text(formData, "idempotencyKey"),
  };
  const fieldErrors: Partial<Record<WithdrawalField, string>> = {};

  if (input.name.length < 2 || input.name.length > 100) {
    fieldErrors.name = "Bitte gib den Namen der widerrufenden Person ein.";
  }
  if (input.orderReference.length < 1 || input.orderReference.length > 120) {
    fieldErrors.orderReference =
      "Bitte gib eine Bestellnummer oder eine andere Vertragskennung ein.";
  }
  if (!EMAIL_PATTERN.test(input.email) || input.email.length > 254) {
    fieldErrors.email = "Bitte gib eine gültige E-Mail-Adresse für die Bestätigung ein.";
  }
  if (input.affectedItems.length > 1000) {
    fieldErrors.affectedItems = "Die Artikelangabe darf höchstens 1000 Zeichen enthalten.";
  }
  if (input.note.length > 1000) {
    fieldErrors.note = "Die optionale Nachricht darf höchstens 1000 Zeichen enthalten.";
  }
  if (!/^[a-zA-Z0-9_-]{20,80}$/u.test(input.idempotencyKey)) {
    fieldErrors.idempotencyKey = "Die Übermittlung konnte nicht sicher vorbereitet werden.";
  }

  return Object.keys(fieldErrors).length > 0
    ? { valid: false, fieldErrors }
    : { valid: true, input };
}

export function isSpamTrapFilled(formData: FormData): boolean {
  return text(formData, "companyWebsite").length > 0;
}

