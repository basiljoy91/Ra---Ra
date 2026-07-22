import { BrandLogo } from "@/components/navigation/brand-logo";
import { FooterLink } from "@/components/layout/footer/footer-link";
import type { FooterConfig } from "@/types/footer";

type FooterBrandProps = Pick<FooterConfig, "brandStatement" | "socialLinks">;

export function FooterBrand({
  brandStatement,
  socialLinks,
}: FooterBrandProps) {
  return (
    <div className="max-w-sm">
      <BrandLogo className="text-primary-foreground focus-visible:outline-primary-foreground" />
      <p className="type-body mt-[var(--space-5)] text-primary-foreground/70">
        {brandStatement}
      </p>
      {socialLinks.length > 0 ? (
        <ul className="mt-[var(--space-6)] flex flex-wrap gap-x-[var(--space-5)] gap-y-[var(--space-2)]" role="list">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <FooterLink link={link} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
