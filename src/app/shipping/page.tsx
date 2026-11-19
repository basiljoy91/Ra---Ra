import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/shipping",
  "Versand & Lieferung",
  "Informationen zu Liefergebiet, Versandkosten, Bearbeitung und Zustellung von Ra & Ra Bestellungen.",
);

const toc = [
  { id: "liefergebiet", label: "Liefergebiet" },
  { id: "kosten", label: "Versandkosten" },
  { id: "lieferzeit", label: "Bearbeitung & Lieferzeit" },
  { id: "sendung", label: "Versand & Tracking" },
  { id: "probleme", label: "Probleme mit der Lieferung" },
] as const;

export default function ShippingPage() {
  const commerce = legalConfig.commerce;
  return (
    <LegalPageLayout
      intro="Hier findest du den bestätigten Lieferumfang und die noch zu prüfenden Versandangaben. Verbindlich sind die Angaben, die vor Abschluss deiner Bestellung im Shopify-Checkout angezeigt werden."
      title="Versand & Lieferung"
      toc={toc}
    >
      <LegalSection id="liefergebiet" title="Wohin liefern wir?">
        <p>Zum vorgesehenen Verkaufsstart liefern wir ausschließlich innerhalb Deutschlands. Ein Versand ins Ausland ist derzeit nicht vorgesehen.</p>
        <p>Im Checkout dürfen deshalb nur freigegebene Lieferadressen in Deutschland angeboten werden. Die entsprechende Shopify-Market- und Versandzonenkonfiguration muss vor dem Start geprüft werden.</p>
      </LegalSection>

      <LegalSection id="kosten" title="Versandkosten">
        <LegalCallout tone="warning">
          <p><strong>Vorgesehener Tarif — noch nicht freigegeben:</strong> {commerce.shippingFee.publicNote} {commerce.freeShippingThreshold.publicNote}</p>
        </LegalCallout>
        <p>Diese Werte sind erst nach Abgleich mit dem tatsächlichen Shopify-Versandprofil, dem Carrier-Tarif und der Behandlung von Rabatten verbindlich. Die konkreten Versandkosten müssen vor der zahlungspflichtigen Bestellung im Checkout ausgewiesen werden.</p>
      </LegalSection>

      <LegalSection id="lieferzeit" title="Bearbeitung und voraussichtliche Lieferzeit">
        <p>{commerce.deliveryTiming.publicNote}</p>
        <p>Die Bearbeitungszeit beschreibt die Vorbereitung vor Übergabe an den Versanddienstleister. Die Transportzeit beginnt erst mit dem Versand. Wochenenden und gesetzliche Feiertage zählen nicht als Werktage.</p>
        <LegalCallout tone="warning"><p>Die betriebliche Kapazität und die tatsächliche Carrier-Leistung sind noch zu testen; bis dahin ist diese Zeitangabe nicht als Lieferzusage freigegeben.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="sendung" title="Versandbestätigung und Sendungsverfolgung">
        <p>{commerce.carrier.publicNote}</p>
        <p>Sobald die operative Integration bestätigt ist, soll die Versandbestätigung per E-Mail den verfügbaren Tracking-Link enthalten. Ein aktiver DHL- oder Label-Service wird in dieser Entwurfsfassung nicht behauptet.</p>
        <p>Bitte prüfe deine Lieferadresse vor Abschluss der Bestellung. Falls dir ein Fehler auffällt, kontaktiere uns so früh wie möglich unter <a href="mailto:contact@raundra.com">contact@raundra.com</a>. Nach Beginn der Versandabwicklung kann eine Änderung unmöglich sein.</p>
      </LegalSection>

      <LegalSection id="probleme" title="Unvollständige, beschädigte oder falsche Lieferung">
        <p>Fehlt etwas, kommt ein Artikel beschädigt an oder wurde ein anderer Artikel geliefert, schreibe uns bitte mit deiner Bestellnummer über die <Link href="/contact">Kontaktseite</Link> oder direkt per E-Mail. Deine gesetzlichen Rechte bei Mängeln bleiben unberührt.</p>
        <p>Informationen zum gesetzlichen Widerruf und zur Rücksendung findest du unter <Link href="/returns">Widerruf & Rücksendungen</Link>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

