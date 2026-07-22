import { FooterLink } from "@/components/layout/footer/footer-link";
import type { FooterNavigationGroup } from "@/types/footer";

type FooterNavigationProps = {
  groups: readonly FooterNavigationGroup[];
};

export function FooterNavigation({ groups }: FooterNavigationProps) {
  return (
    <nav aria-label="Footer navigation">
      <div className="grid grid-cols-2 gap-x-[var(--space-8)] gap-y-[var(--space-10)] sm:grid-cols-4">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`footer-${group.id}-heading`}>
            <h2
              id={`footer-${group.id}-heading`}
              className="type-label text-primary-foreground"
            >
              {group.label}
            </h2>
            <ul className="mt-[var(--space-4)] space-y-[var(--space-2)]" role="list">
              {group.links.map((link) => (
                <li key={link.id}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
