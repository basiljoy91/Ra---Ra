export type LegalFormStatus = "idle" | "success" | "error";

export type ContactTopic =
  | "order"
  | "shipping"
  | "returns"
  | "product"
  | "other";

export type LegalContactInput = {
  name: string;
  email: string;
  orderNumber: string;
  topic: ContactTopic;
  message: string;
};

export type LegalContactField = keyof LegalContactInput;

export type LegalContactState = {
  status: LegalFormStatus;
  message: string;
  submissionCount: number;
  reference?: string;
  fieldErrors?: Partial<Record<LegalContactField, string>>;
};

export type LegalContactAction = (
  previousState: LegalContactState,
  formData: FormData,
) => Promise<LegalContactState>;

export type WithdrawalInput = {
  name: string;
  orderReference: string;
  email: string;
  affectedItems: string;
  note: string;
  idempotencyKey: string;
};

export type WithdrawalField = keyof WithdrawalInput;

export type WithdrawalState = {
  status: LegalFormStatus;
  message: string;
  submissionCount: number;
  reference?: string;
  receivedAt?: string;
  fieldErrors?: Partial<Record<WithdrawalField, string>>;
};

export type WithdrawalAction = (
  previousState: WithdrawalState,
  formData: FormData,
) => Promise<WithdrawalState>;

