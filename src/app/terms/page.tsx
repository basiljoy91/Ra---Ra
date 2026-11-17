import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/terms",
  "Allgemeine Geschäftsbedingungen (AGB)",
  "Entwurfsfassung der Allgemeinen Geschäftsbedingungen für Bestellungen im Ra & Ra Online-Shop.",
);

const toc = [
  { id: "anbieter", label: "Anbieter & Geltung" },
  { id: "vertrag", label: "Bestellung & Vertrag" },
  { id: "preise", label: "Preise & Zahlung" },
  { id: "lieferung", label: "Lieferung" },
  { id: "widerruf", label: "Widerruf" },
  { id: "maengel", label: "Mängelrechte" },
  { id: "schluss", label: "Sprache & Recht" },
] as const;

export default function TermsPage() {
  const trader = legalConfig.trader;
  return (
    <LegalPageLayout
      intro="Diese AGB-Arbeitsfassung beschreibt die vorgesehenen Bedingungen für Verbraucherbestellungen. Sie ist wegen offener Steuer-, Adress- und Shopify-Ablauffragen noch nicht zur Verwendung im Checkout freigegeben."
      title="Allgemeine Geschäftsbedingungen"
      toc={toc}
    >
      <LegalSection id="anbieter" title="1. Anbieter und Geltungsbereich">
        <p>Diese Allgemeinen Geschäftsbedingungen gelten für Bestellungen von Verbraucherinnen und Verbrauchern über den Online-Shop Ra & Ra.</p>
        <p>Verkäufer ist {trader.proprietor.value}, handelnd unter Ra & Ra, als Einzelunternehmen in Deutschland. E-Mail: <a href="mailto:contact@raundra.com">contact@raundra.com</a>, Telefon: <a href="tel:+4915773619312">+49 157 73619312</a>.</p>
        <LegalCallout tone="critical"><p>Die vollständige ladungsfähige Geschäftsanschrift und der bestätigte öffentliche Shop-Domainname fehlen. Diese AGB dürfen vorher nicht veröffentlicht oder in den Shopify-Checkout eingebunden werden.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="vertrag" title="2. Angebot, Bestellung und Vertragsschluss">
        <p>Die Darstellung von Produkten im Online-Shop ist kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe einer Bestellung. Vor dem Absenden kannst du Warenkorb und Eingaben prüfen und korrigieren.</p>
        <p>Mit der eindeutig als zahlungspflichtig gekennzeichneten Schaltfläche im Shopify-Checkout gibst du ein verbindliches Angebot zum Kauf der dort aufgeführten Waren ab.</p>
        <LegalCallout tone="critical"><p>{legalConfig.commerce.orderAcceptance.publicNote} Bis dahin wird nicht behauptet, ob der Vertrag durch Bestellbestätigung, Zahlungserfassung, Versandbestätigung oder Versand zustande kommt.</p></LegalCallout>
        <p>Der Vertragstext und die Bestelldaten müssen im Rahmen der Shopify-Bestell- beziehungsweise Vertragsbestätigung auf einem dauerhaften Datenträger bereitgestellt werden; die tatsächlichen Benachrichtigungen sind vor Freigabe zu prüfen.</p>
      </LegalSection>

      <LegalSection id="preise" title="3. Preise, Versandkosten und Zahlungsarten">
        <p>Die Shoppreise werden in Euro angezeigt. Zusätzliche Versandkosten und die im Einzelfall verfügbaren Zahlungsarten werden vor Abschluss der Bestellung im Shopify-Checkout angezeigt.</p>
        <LegalCallout tone="critical"><p>{trader.vatTreatment.publicNote} Eine Aussage „inklusive Umsatzsteuer“ oder zur Kleinunternehmerregelung wird erst nach steuerlicher Bestätigung ergänzt.</p></LegalCallout>
        <p>Es werden keine Zahlungsmethoden außerhalb der tatsächlich im Checkout aktivierten Verfahren zugesagt.</p>
      </LegalSection>

      <LegalSection id="lieferung" title="4. Lieferung und Verfügbarkeit">
        <p>Der vorgesehene Verkaufsstart beschränkt sich auf Lieferadressen in Deutschland. Verbindliche Versandkosten und Lieferinformationen findest du unter <Link href="/shipping">Versand & Lieferung</Link> und vor der Bestellung im Checkout.</p>
        <p>Ist ein bestellter Artikel ausnahmsweise nicht verfügbar, informieren wir dich unverzüglich und erstatten bereits erhaltene Zahlungen nach den gesetzlichen Bestimmungen.</p>
        <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      </LegalSection>

      <LegalSection id="widerruf" title="5. Widerrufsrecht">
        <p>Verbraucherinnen und Verbrauchern steht bei Fernabsatzverträgen grundsätzlich das gesetzliche Widerrufsrecht zu. Die Widerrufsbelehrung, das Musterformular und die elektronische Funktion findest du unter <Link href="/widerruf">Vertrag widerrufen</Link>. Ergänzende Hinweise stehen unter <Link href="/returns">Widerruf & Rücksendungen</Link>.</p>
      </LegalSection>

      <LegalSection id="maengel" title="6. Gesetzliche Mängelrechte">
        <p>Es gelten die gesetzlichen Mängelhaftungsrechte. Wende dich bei beschädigten, fehlerhaften oder falsch gelieferten Artikeln bitte an <a href="mailto:contact@raundra.com">contact@raundra.com</a>. Das Widerrufsrecht schränkt diese Rechte nicht ein.</p>
      </LegalSection>

      <LegalSection id="schluss" title="7. Vertragssprache, anwendbares Recht und Streitbeilegung">
        <p>Die vorgesehene Vertragssprache ist Deutsch. Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften des Staates, in dem ein Verbraucher seinen gewöhnlichen Aufenthalt hat, bleiben unberührt, soweit sie anwendbar sind.</p>
        <LegalCallout tone="warning"><p>{trader.disputeResolution.publicNote}</p></LegalCallout>
      </LegalSection>
    </LegalPageLayout>
  );
}

