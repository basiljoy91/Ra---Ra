import type { ReactNode } from "react";

import { EditorialHero } from "@/components/editorial/editorial-hero";
import type { EditorialHeroConfig } from "@/types/editorial";

interface EditorialLayoutProps {
  hero: EditorialHeroConfig;
  children: ReactNode;
  as?: "article" | "div";
}

export function EditorialLayout({
  hero,
  children,
  as: Element = "div",
}: EditorialLayoutProps) {
  return (
    <Element>
      <EditorialHero config={hero} />
      {children}
    </Element>
  );
}
