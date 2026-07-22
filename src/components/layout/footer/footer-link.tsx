import Link from "next/link";

import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { FooterLink as FooterLinkData } from "@/types/footer";

type FooterLinkProps = {
  link: FooterLinkData;
};

const linkClassName =
  "type-small inline-flex min-h-11 items-center py-2 text-primary-foreground/75 underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-primary-foreground hover:underline focus-visible:text-primary-foreground focus-visible:outline-primary-foreground";

export function FooterLink({ link }: FooterLinkProps) {
  if (link.external) {
    return (
      <a
        className={linkClassName}
        href={link.href}
        rel="noreferrer"
        target="_blank"
      >
        {link.label}
        <VisuallyHidden> Opens in a new tab</VisuallyHidden>
      </a>
    );
  }

  return (
    <Link className={linkClassName} href={link.href}>
      {link.label}
    </Link>
  );
}
