import Link from "next/link";

import { ContactForm } from "@/components/forms/contact/contact-form";
import { LegalCallout, LegalPageLayout, LegalSection, legalPageStyles } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { submitLegalContact } from "@/features/legal/legal-submissions";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/contact",
  "Kontakt",
  "Kontakt zu Ra & Ra für Bestellungen, Versand, Rücksendungen, Produkte und allgemeine Fragen.",
);

const toc = [
  { id: "direkt", label: "Direkter Kontakt" },
  { id: "formular", label: "Kontaktformular" },
  { id: "widerruf", label: "Widerruf" },
] as const;

export default function ContactPage() {
  const trader = legalConfig.trader;
  return (
    <LegalPageLayout
      intro="Du hast eine Frage zu deiner Bestellung, zu Größen und Passformen oder zu einer Rücksendung? Schreib uns – wir helfen dir gerne weiter."
      title="Kontakt"
      toc={toc}
    >
      <LegalSection id="direkt" title="So erreichst du uns">
        <dl className={legalPageStyles.definitionList}>
          <div><dt>E-Mail</dt><dd><a href={`mailto:${trader.email.value}`}>{trader.email.value}</a></dd></div>
          <div><dt>Telefon</dt><dd><a href={trader.phoneHref.value ?? undefined}>{trader.phoneDisplay.value}</a></dd></div>
        </dl>
        <p>Wir veröffentlichen bewusst keine unbestätigten Servicezeiten oder Antwortfristen. Rechtliche Anbieterangaben findest du im <Link href="/impressum">Impressum</Link>.</p>
      </LegalSection>

      <LegalSection id="formular" title="Nachricht senden">
        {!legalConfig.submissions.contactConfigured ? (
          <LegalCallout tone="critical">
            <p><strong>Online-Versand noch nicht betriebsbereit.</strong> Das Formular validiert Eingaben und zeigt ausschließlich einen echten Erfolg nach Bestätigung durch den konfigurierten Serverdienst. Solange dieser fehlt, nutze bitte <a href="mailto:contact@raundra.com">contact@raundra.com</a>.</p>
          </LegalCallout>
        ) : null}
        <div className={legalPageStyles.formPanel}>
          <ContactForm action={submitLegalContact} />
        </div>
      </LegalSection>

      <LegalSection id="widerruf" title="Vertrag widerrufen">
        <p>Für einen Widerruf ist keine Begründung erforderlich. Nutze die hervorgehobene elektronische Funktion unter <Link href="/widerruf">Vertrag widerrufen</Link> oder sende eine eindeutige Erklärung per E-Mail. Hinweise zur Rücksendung findest du unter <Link href="/returns">Widerruf & Rücksendungen</Link>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
