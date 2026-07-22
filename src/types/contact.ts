export interface ContactSubmissionInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFieldName = keyof ContactSubmissionInput;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  submissionCount: number;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
}

export type ContactFormAction = (
  previousState: ContactFormState,
  formData: FormData,
) => Promise<ContactFormState>;
