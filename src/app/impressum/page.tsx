import Link from "next/link";

import {
  LegalCallout,
  LegalPageLayout,
  LegalSection,
  legalPageStyles,
} from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/impressum",
  "Impressum",
  "Anbieterkennzeichnung und Kontaktangaben von Ra & Ra.",
);

const toc = [
  { id: "anbieter", label: "Anbieter" },
  { id: "kontakt", label: "Kontakt" },
  { id: "kennungen", label: "Register & Kennungen" },
  { id: "streitbeilegung", label: "Streitbeilegung" },
] as const;

export default function ImpressumPage() {
  const trader = legalConfig.trader;
  return (
    <LegalPageLayout
      intro="Die gesetzlich erforderlichen Anbieterangaben für den Online-Shop Ra & Ra. Noch fehlende Pflichtangaben sind sichtbar als Freigabeblocker gekennzeichnet."
      title="Impressum"
      toc={toc}
    >
      <LegalSection id="anbieter" title="Angaben gemäß § 5 DDG">
        <address>
          <strong>{trader.proprietor.value}</strong><br />
          handelnd unter {trader.brand.value}<br />
          {trader.legalForm.value}<br />
          Deutschland
        </address>
        <LegalCallout tone="critical">
          <p><strong>Veröffentlichung blockiert:</strong> {trader.streetAddress.publicNote}</p>
          <p>„München, Deutschland“ wird hier bewusst nicht als vollständige ladungsfähige Anschrift dargestellt.</p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="kontakt" title="Kontakt">
        <dl className={legalPageStyles.definitionList}>
          <div><dt>E-Mail</dt><dd><a href={`mailto:${trader.email.value}`}>{trader.email.value}</a></dd></div>
          <div><dt>Telefon</dt><dd><a href={trader.phoneHref.value ?? undefined}>{trader.phoneDisplay.value}</a></dd></div>
        </dl>
        <p>Für allgemeine Anfragen steht außerdem unsere <Link href="/contact">Kontaktseite</Link> zur Verfügung.</p>
      </LegalSection>

      <LegalSection id="kennungen" title="Register und steuerliche Kennungen">
        <p>{trader.register.publicNote}</p>
        <p>{trader.vatId.publicNote} Eine private Steuernummer wird nicht als Ersatz veröffentlicht.</p>
      </LegalSection>

      <LegalSection id="streitbeilegung" title="Verbraucherstreitbeilegung">
        <LegalCallout tone="warning"><p>{trader.disputeResolution.publicNote}</p></LegalCallout>
        <p>Ein Link zur eingestellten europäischen OS-Plattform wird nicht verwendet.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

