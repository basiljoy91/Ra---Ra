"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type NewsletterSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  editorial?: boolean;
  disabled?: boolean;
};

export function NewsletterSubmitButton({
  label,
  pendingLabel,
  editorial = false,
  disabled = false,
}: NewsletterSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={
        editorial
          ? "min-h-12 w-full shrink-0 rounded-none px-8 sm:w-auto sm:min-w-36"
          : "w-full shrink-0 sm:w-auto sm:min-w-40"
      }
      disabled={pending || disabled}
      aria-disabled={pending || disabled}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
