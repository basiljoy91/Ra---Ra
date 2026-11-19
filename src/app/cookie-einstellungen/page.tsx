import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection, legalPageStyles } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/cookie-einstellungen",
  "Cookie-Einstellungen",
  "Informationen zu technisch notwendigen Cookies und zum noch ausstehenden Shopify- und Tracking-Audit von Ra & Ra.",
);

const toc = [
  { id: "status", label: "Aktueller Status" },
  { id: "notwendig", label: "Technisch notwendig" },
  { id: "optional", label: "Statistik & Marketing" },
  { id: "browser", label: "Browser-Einstellungen" },
] as const;

export default function CookieSettingsPage() {
  return (
    <LegalPageLayout
      intro="Diese Seite zeigt den im Quellcode festgestellten Einsatz von Cookies und ähnlichen Technologien. Sie erfindet keine Auswahlmöglichkeiten für Dienste, die derzeit nicht eingebunden sind."
      title="Cookie-Einstellungen"
      toc={toc}
    >
      <LegalSection id="status" title="Aktueller Status des Storefront-Audits">
        <p>{legalConfig.privacy.frontendAudit}</p>
        <LegalCallout tone="warning"><p>{legalConfig.privacy.processors.publicNote} Deshalb ist das vollständige produktive Cookie- und Processor-Inventar noch nicht freigegeben.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="notwendig" title="Technisch notwendige Technologien">
        <p>Die folgenden, im Quellcode nachgewiesenen Cookies unterstützen ausdrücklich angeforderte Shop-Funktionen. Sie sind HTTP-only und können nicht durch JavaScript im Browser ausgelesen werden.</p>
        <dl className={legalPageStyles.definitionList}>
          {legalConfig.privacy.necessaryTechnologies.map((technology) => (
            <div key={technology.name}>
              <dt>{technology.name}</dt>
              <dd>{technology.purpose}</dd>
              <dd className="text-foreground-muted">Speicherung: {technology.storage}; vorgesehene Dauer: {technology.duration}</dd>
            </div>
          ))}
        </dl>
        <p>Shopify kann im Checkout weitere technisch notwendige Technologien setzen. Diese müssen anhand der produktiven Shopify-Konfiguration ergänzt werden.</p>
      </LegalSection>

      <LegalSection id="optional" title="Statistik, Marketing und weitere optionale Dienste">
        <p>Im aktuellen Next.js-Quellcode sind keine Analyse-, Marketing- oder Werbe-Pixel eingebunden. Deshalb zeigen wir hier keine inaktiven „Akzeptieren“- oder „Ablehnen“-Schalter, die tatsächlich nichts steuern würden.</p>
        <p>Bevor optionale Dienste aktiviert werden, müssen sie inventarisiert, in der <Link href="/privacy">Datenschutzerklärung</Link> beschrieben und technisch an eine echte vorherige Einwilligung sowie deren Widerruf gekoppelt werden. Das gilt getrennt für den eigenen Storefront-Code und für Shopify Checkout, Apps und Pixels.</p>
      </LegalSection>

      <LegalSection id="browser" title="Einstellungen im Browser">
        <p>Du kannst Cookies über die Einstellungen deines Browsers anzeigen, blockieren oder löschen. Wenn du notwendige Warenkorb- oder Marktcookies löschst oder blockierst, können Warenkorb und Checkout ihre Funktion verlieren.</p>
        <p>Fragen zum Datenschutz kannst du an <a href="mailto:contact@raundra.com">contact@raundra.com</a> richten.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

