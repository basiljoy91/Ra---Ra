import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/returns",
  "Widerruf & Rücksendungen",
  "Kundenfreundliche Übersicht zum gesetzlichen Widerrufsrecht, Rücksendekosten, Erstattungen und Mängeln bei Ra & Ra.",
);

const toc = [
  { id: "widerrufsrecht", label: "Widerrufsrecht" },
  { id: "ablauf", label: "Rücksendung" },
  { id: "kosten", label: "Rücksendekosten" },
  { id: "rueckzahlung", label: "Rückzahlung" },
  { id: "warenpruefung", label: "Prüfung der Ware" },
  { id: "maengel", label: "Mängel & Falschlieferung" },
] as const;

export default function ReturnsPage() {
  const commerce = legalConfig.commerce;
  return (
    <LegalPageLayout
      intro="Diese Übersicht erklärt das gesetzliche Widerrufsrecht und den geplanten Rücksendeablauf. Die vollständige Widerrufsbelehrung und die elektronische Erklärung findest du unter „Vertrag widerrufen“."
      title="Widerruf & Rücksendungen"
      toc={toc}
    >
      <LegalSection id="widerrufsrecht" title="Gesetzliches Widerrufsrecht">
        <p>Als Verbraucher hast du bei einem Online-Kauf in der Regel das Recht, den Vertrag binnen 14 Tagen ohne Angabe von Gründen zu widerrufen. Bei einem Kaufvertrag beginnt die Frist grundsätzlich an dem Tag, an dem du oder eine von dir benannte dritte Person, die nicht Beförderer ist, die Ware erhalten hat. Bei getrennt gelieferten Waren einer einheitlichen Bestellung beginnt sie grundsätzlich mit Erhalt der letzten Ware.</p>
        <div className="mt-6"><Link className="inline-flex min-h-12 items-center rounded-[var(--radius-control)] border border-button bg-button px-5 font-semibold text-button-foreground no-underline" href="/widerruf">Vertrag widerrufen</Link></div>
      </LegalSection>

      <LegalSection id="ablauf" title="So funktioniert die Rücksendung">
        <ol>
          <li>Erkläre den Widerruf rechtzeitig über <Link href="/widerruf">Vertrag widerrufen</Link>, per E-Mail an <a href="mailto:contact@raundra.com">contact@raundra.com</a> oder per Brief. Eine Begründung ist nicht erforderlich.</li>
          <li>Sende die Ware spätestens 14 Tage nach deiner Widerrufserklärung zurück. Die Rücksendeanschrift muss vor Verkaufsstart noch ergänzt werden.</li>
          <li>Wenn möglich, lege die Bestellnummer bei. Das erleichtert die Zuordnung, ist aber keine Voraussetzung für einen wirksamen Widerruf.</li>
        </ol>
        <LegalCallout tone="critical"><p><strong>Veröffentlichung blockiert:</strong> {legalConfig.trader.returnAddress.publicNote}</p></LegalCallout>
      </LegalSection>

      <LegalSection id="kosten" title="Wer trägt die Rücksendekosten?">
        <LegalCallout><p><strong>{commerce.returnPostage.value}</strong></p></LegalCallout>
        <p>Die gewöhnliche Rücksendung im Rahmen deines gesetzlichen Widerrufsrechts ist damit für dich kostenfrei. Dein Widerruf ist weder von einer vorherigen Supportfreigabe noch von der Ausgabe eines Labels abhängig.</p>
        <p>{commerce.returnMethod.publicNote} Bis dieser Ablauf bestätigt ist, wird kein aktives DHL-Retourenlabel versprochen.</p>
      </LegalSection>

      <LegalSection id="rueckzahlung" title="Rückzahlung nach einem wirksamen Widerruf">
        <p>Wir erstatten die erhaltenen Zahlungen einschließlich der Kosten unserer günstigsten angebotenen Standardlieferung. Zusätzliche Kosten einer von dir gewählten teureren Lieferart sind davon ausgenommen.</p>
        <p>Die Erstattung erfolgt unverzüglich und spätestens innerhalb von 14 Tagen ab Eingang des Widerrufs, grundsätzlich über dasselbe Zahlungsmittel wie bei der ursprünglichen Zahlung. Wir dürfen die Rückzahlung zurückhalten, bis wir die Ware zurückerhalten haben oder du den Nachweis der Rücksendung erbracht hast – je nachdem, was früher eintritt.</p>
      </LegalSection>

      <LegalSection id="warenpruefung" title="Prüfung und Umgang mit der Ware">
        <p>Du darfst die Kleidung so prüfen und anprobieren, wie es auch in einem Ladengeschäft möglich wäre. Für einen darüber hinausgehenden Umgang, der zu einem Wertverlust führt, kann unter den gesetzlichen Voraussetzungen Wertersatz anfallen. Ein fehlendes Etikett führt nicht automatisch zum Verlust des Widerrufsrechts.</p>
      </LegalSection>

      <LegalSection id="maengel" title="Beschädigte, fehlerhafte oder falsch gelieferte Artikel">
        <p>Bitte kontaktiere uns über <Link href="/contact">Kontakt</Link>, wenn ein Artikel beschädigt, fehlerhaft oder falsch geliefert wurde. Deine gesetzlichen Gewährleistungsrechte bestehen unabhängig vom Widerrufsrecht und von der Kostenregelung für eine gewöhnliche Widerrufsrücksendung.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

