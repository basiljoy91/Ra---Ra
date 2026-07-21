import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/utilities";

type ButtonVariant = "primary" | "secondary" | "quiet";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  className?: string | undefined;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground",
  secondary:
    "border-border bg-surface text-foreground hover:border-foreground hover:bg-surface-muted",
  quiet:
    "border-transparent bg-transparent text-foreground hover:bg-surface-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-[var(--space-4)] text-sm",
  md: "min-h-12 px-[var(--space-5)] text-sm",
  lg: "min-h-14 px-[var(--space-6)] text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "inline-flex min-w-11 items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-control)] border font-semibold leading-none transition-[background-color,border-color,color,transform] duration-[var(--duration-base)] motion-safe:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant, size, className, ...props }, ref) => (
    <a
      ref={ref}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  ),
);

ButtonLink.displayName = "ButtonLink";
