import { BrandLogo } from "@/components/navigation/brand-logo";
import { FooterLink } from "@/components/layout/footer/footer-link";
import type { FooterConfig } from "@/types/footer";

type FooterBrandProps = Pick<FooterConfig, "brandStatement" | "socialLinks">;

export function FooterBrand({
  brandStatement,
  socialLinks,
}: FooterBrandProps) {
  return (
    <div className="max-w-md">
      <BrandLogo
        large
        className="text-foreground focus-visible:outline-foreground"
      />
      <p className="type-small mt-[var(--space-4)] max-w-[30ch] text-foreground-muted">
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
