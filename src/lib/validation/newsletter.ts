const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

export type NewsletterEmailValidation =
  | { valid: true; email: string }
  | { valid: false; message: string };

export function validateNewsletterEmail(
  value: FormDataEntryValue | null,
): NewsletterEmailValidation {
  if (typeof value !== "string") {
    return { valid: false, message: "Enter an email address." };
  }

  const email = value.trim().toLowerCase();

  if (!email) {
    return { valid: false, message: "Enter an email address." };
  }

  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { valid: false, message: "Enter a valid email address." };
  }

  return { valid: true, email };
}
