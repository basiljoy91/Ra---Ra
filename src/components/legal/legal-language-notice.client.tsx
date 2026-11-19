"use client";

import { useLocale } from "@/components/i18n/locale-provider.client";

import styles from "./legal-page.module.css";

export function LegalLanguageNotice() {
  const { locale } = useLocale();

  if (locale !== "en") return null;

  return (
    <aside className={styles.languageNotice} role="note">
      <strong>Translation notice</strong>
      <p>
        The English version is provided for accessibility and convenience. Until
        professional legal review is complete, the German version remains the
        authoritative draft.
      </p>
    </aside>
  );
}
