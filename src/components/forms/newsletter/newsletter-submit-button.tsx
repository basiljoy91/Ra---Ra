"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type NewsletterSubmitButtonProps = {
  label: string;
  pendingLabel: string;
};

export function NewsletterSubmitButton({
  label,
  pendingLabel,
}: NewsletterSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full shrink-0 sm:w-auto sm:min-w-40"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
