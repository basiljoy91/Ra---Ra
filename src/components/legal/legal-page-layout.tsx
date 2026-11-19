import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { legalConfig } from "@/config/legal";
import { LegalLanguageNotice } from "@/components/legal/legal-language-notice.client";

import styles from "./legal-page.module.css";

export type LegalTocItem = {
  id: string;
  label: string;
};

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  toc: readonly LegalTocItem[];
  children: ReactNode;
};

export function LegalPageLayout({ title, intro, toc, children }: LegalPageLayoutProps) {
  return (
    <article className={styles.page} data-brand-page data-legal-page>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <p className={styles.eyebrow}>Ra &amp; Ra / Rechtliches &amp; Service</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          {legalConfig.publication.status === "pending" ? (
            <div className={styles.draft} role="note">
              <strong>{legalConfig.publication.label}</strong>
              <p>{legalConfig.publication.reason}</p>
            </div>
          ) : null}
        </Container>
      </header>
      <Container className={styles.layout}>
        <nav aria-label="Inhalt dieser Seite" className={styles.toc}>
          <p className={styles.tocLabel}>Auf dieser Seite</p>
          <ol className={styles.tocList}>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.content}>
          <LegalLanguageNotice />
          {children}
        </div>
      </Container>
    </article>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className={styles.section} id={id}>
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}

export function LegalCallout({
  tone = "notice",
  children,
}: {
  tone?: "notice" | "warning" | "critical";
  children: ReactNode;
}) {
  return (
    <div className={styles.callout} data-tone={tone} role="note">
      {children}
    </div>
  );
}

export const legalPageStyles = styles;

