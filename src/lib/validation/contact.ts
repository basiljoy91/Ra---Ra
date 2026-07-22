import type {
  ContactFieldName,
  ContactSubmissionInput,
} from "@/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const FIELD_LIMITS: Record<ContactFieldName, number> = {
  name: 100,
  email: 254,
  subject: 140,
  message: 3000,
};

type ContactValidationResult =
  | { valid: true; input: ContactSubmissionInput }
  | {
      valid: false;
      fieldErrors: Partial<Record<ContactFieldName, string>>;
    };

function readText(formData: FormData, field: ContactFieldName): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(
  formData: FormData,
): ContactValidationResult {
  const input: ContactSubmissionInput = {
    name: readText(formData, "name"),
    email: readText(formData, "email").toLowerCase(),
    subject: readText(formData, "subject"),
    message: readText(formData, "message"),
  };
  const fieldErrors: Partial<Record<ContactFieldName, string>> = {};

  for (const field of Object.keys(input) as ContactFieldName[]) {
    if (!input[field]) {
      fieldErrors[field] = `Enter your ${field}.`;
    } else if (input[field].length > FIELD_LIMITS[field]) {
      fieldErrors[field] = `Keep this field under ${FIELD_LIMITS[field]} characters.`;
    }
  }

  if (input.email && !EMAIL_PATTERN.test(input.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  return Object.keys(fieldErrors).length > 0
    ? { valid: false, fieldErrors }
    : { valid: true, input };
}
