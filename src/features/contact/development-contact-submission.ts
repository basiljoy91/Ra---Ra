"use server";

import { validateContactSubmission } from "@/lib/validation/contact";
import type { ContactFormState } from "@/types/contact";

const UNAVAILABLE_MESSAGE =
  "Contact delivery is unavailable until an approved email provider is connected.";

export async function submitDevelopmentContact(
  previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submissionCount = previousState.submissionCount + 1;
  const validation = validateContactSubmission(formData);

  if (!validation.valid) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      submissionCount,
      fieldErrors: validation.fieldErrors,
    };
  }

  if (process.env.NODE_ENV === "production") {
    return {
      status: "error",
      message: UNAVAILABLE_MESSAGE,
      submissionCount,
    };
  }

  return {
    status: "success",
    message:
      "Development validation passed. No message was sent, stored or logged.",
    submissionCount,
  };
}
