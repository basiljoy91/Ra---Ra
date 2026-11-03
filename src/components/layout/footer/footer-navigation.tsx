import { FooterLink } from "@/components/layout/footer/footer-link";
import type { FooterNavigationGroup } from "@/types/footer";

type FooterNavigationProps = {
  groups: readonly FooterNavigationGroup[];
};

export function FooterNavigation({ groups }: FooterNavigationProps) {
  return (
    <nav aria-label="Footer navigation" className="w-full">
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`footer-${group.id}-heading`}>
            <h2
              id={`footer-${group.id}-heading`}
              className="sr-only"
            >
              {group.label}
            </h2>
            <ul
              className="flex flex-wrap items-center gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-1"
              role="list"
            >
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
