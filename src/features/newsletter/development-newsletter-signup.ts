"use server";

import { validateNewsletterEmail } from "@/lib/validation/newsletter";
import type {
  NewsletterFormState,
  NewsletterSignupHandler,
} from "@/types/newsletter";

const DEVELOPMENT_SUCCESS_MESSAGE =
  "Development validation passed. No email was stored or subscribed.";
const DEVELOPMENT_UNAVAILABLE_MESSAGE =
  "Newsletter signup is unavailable until an approved provider is connected.";
const DEVELOPMENT_RESPONSE_DELAY = 150;

export const developmentNewsletterSignup: NewsletterSignupHandler = async (
  email,
) => {
  if (process.env.NODE_ENV === "production") {
    return {
      status: "error",
      message: DEVELOPMENT_UNAVAILABLE_MESSAGE,
    };
  }

  const validation = validateNewsletterEmail(email);

  if (!validation.valid) {
    return { status: "error", message: validation.message };
  }

  await new Promise((resolve) => {
    setTimeout(resolve, DEVELOPMENT_RESPONSE_DELAY);
  });

  return { status: "success", message: DEVELOPMENT_SUCCESS_MESSAGE };
};

export async function submitDevelopmentNewsletter(
  previousState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const submissionCount = previousState.submissionCount + 1;
  const validation = validateNewsletterEmail(formData.get("email"));

  if (!validation.valid) {
    return {
      status: "error",
      message: "Check the highlighted field and try again.",
      submissionCount,
      fieldErrors: { email: validation.message },
    };
  }

  const result = await developmentNewsletterSignup(validation.email);

  return {
    status: result.status,
    message: result.message,
    submissionCount,
  };
}
