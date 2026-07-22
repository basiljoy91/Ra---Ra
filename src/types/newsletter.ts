export type NewsletterSignupResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export type NewsletterSignupHandler = (
  email: string,
) => Promise<NewsletterSignupResult>;

export type NewsletterFormStatus = "idle" | "success" | "error";

export type NewsletterFormState = {
  status: NewsletterFormStatus;
  message: string;
  submissionCount: number;
  fieldErrors?: {
    email?: string;
  };
};

export type NewsletterFormAction = (
  previousState: NewsletterFormState,
  formData: FormData,
) => Promise<NewsletterFormState>;

export type NewsletterSectionConfig = {
  id: string;
  eyebrow?: string;
  heading: string;
  description: string;
  emailLabel: string;
  emailPlaceholder?: string;
  submitLabel: string;
  pendingLabel: string;
  consentText: string;
  privacyLabel: string;
  privacyHref: string;
};
