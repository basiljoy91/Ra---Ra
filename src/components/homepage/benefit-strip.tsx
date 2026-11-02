import {
  Gem,
  Layers3,
  MapPin,
  PenTool,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import styles from "@/components/homepage/homepage.module.css";
import { Container } from "@/components/layout/container";

const iconById: Record<string, LucideIcon> = {
  meaningful: Sparkles,
  artwork: PenTool,
  collections: Layers3,
  market: MapPin,
  checkout: ShieldCheck,
};

export interface BenefitItem {
  id: string;
  label: string;
}

export function BenefitStrip({ items }: { items: readonly BenefitItem[] }) {
  return (
    <section className={styles.benefits} aria-label="ra&ra values">
      <Container>
        <ul className={styles.benefitList} role="list">
          {items.map((item) => {
            const Icon = iconById[item.id] ?? Gem;

            return (
              <li className={styles.benefitItem} key={item.id}>
                <Icon
                  aria-hidden="true"
                  className={styles.benefitIcon}
                  size={27}
                  strokeWidth={1.1}
                />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
