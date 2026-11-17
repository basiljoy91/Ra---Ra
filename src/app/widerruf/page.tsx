import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection, legalPageStyles } from "@/components/legal/legal-page-layout";
import { WithdrawalForm } from "@/components/legal/withdrawal-form.client";
import { legalConfig } from "@/config/legal";
import { submitWithdrawal } from "@/features/legal/legal-submissions";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/widerruf",
  "Vertrag widerrufen",
  "Elektronische Widerrufsfunktion, Widerrufsbelehrung und Muster-Widerrufsformular von Ra & Ra.",
);

const toc = [
  { id: "online", label: "Online widerrufen" },
  { id: "recht", label: "Widerrufsrecht" },
  { id: "folgen", label: "Folgen des Widerrufs" },
  { id: "ruecksendung", label: "Rücksendung" },
  { id: "muster", label: "Musterformular" },
] as const;

export default function WithdrawalPage() {
  const trader = legalConfig.trader;
  return (
    <LegalPageLayout
      intro="Du kannst hier eine eindeutige Widerrufserklärung vorbereiten und – nach Anschluss des sicheren Empfangsdienstes – direkt übermitteln. Eine Begründung, ein Login oder ein Kundenkonto sind nicht erforderlich."
      title="Vertrag widerrufen"
      toc={toc}
    >
      <LegalSection id="online" title="Widerruf online erklären">
        {!legalConfig.submissions.withdrawalConfigured ? (
          <LegalCallout tone="critical">
            <p><strong>P0: Online-Widerruf noch nicht betriebsbereit; Live-Checkout blockiert.</strong> Der zweistufige Ablauf ist implementiert, aber der Dienst für dauerhafte Speicherung und die unverzügliche E-Mail-Eingangsbestätigung ist noch nicht konfiguriert. Eine fehlgeschlagene Übermittlung zeigt niemals einen falschen Erfolg.</p>
            <p>Erkläre deinen Widerruf bis zur technischen Freigabe bitte unmittelbar per E-Mail an <a href="mailto:contact@raundra.com">contact@raundra.com</a>. Eine Begründung ist nicht erforderlich.</p>
          </LegalCallout>
        ) : null}
        <div className={legalPageStyles.formPanel}><WithdrawalForm action={submitWithdrawal} /></div>
      </LegalSection>

      <LegalSection id="recht" title="Widerrufsbelehrung — Widerrufsrecht">
        <p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
        <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem du oder eine von dir benannte dritte Person, die nicht Beförderer ist, die Ware in Besitz genommen hast beziehungsweise hat. Wenn mehrere Waren einer einheitlichen Bestellung getrennt geliefert werden, beginnt die Frist grundsätzlich mit Erhalt der letzten Ware.</p>
        <p>Um dein Widerrufsrecht auszuüben, musst du uns mittels einer eindeutigen Erklärung – zum Beispiel per E-Mail oder per Post – über deinen Entschluss informieren:</p>
        <address>
          <strong>{trader.proprietor.value} (Ra &amp; Ra)</strong><br />
          <span>{trader.streetAddress.publicNote}</span><br />
          Telefon: <a href="tel:+4915773619312">+49 157 73619312</a><br />
          E-Mail: <a href="mailto:contact@raundra.com">contact@raundra.com</a>
        </address>
        <LegalCallout tone="critical"><p>Die vollständige Postanschrift fehlt und muss vor Veröffentlichung dieser Belehrung ergänzt werden.</p></LegalCallout>
        <p>Du kannst das untenstehende Muster-Widerrufsformular verwenden, es ist jedoch nicht vorgeschrieben. Zur Wahrung der Frist reicht es aus, dass du die Mitteilung vor Ablauf der Widerrufsfrist absendest.</p>
        <p>Du kannst dein Widerrufsrecht außerdem über die Widerrufsfunktion auf dieser Seite ausüben. Nach einer technisch erfolgreichen Übermittlung senden wir dir unverzüglich eine Eingangsbestätigung auf einem dauerhaften Datenträger mit dem Inhalt der Erklärung sowie Datum und Uhrzeit des Eingangs.</p>
      </LegalSection>

      <LegalSection id="folgen" title="Folgen des Widerrufs">
        <p>Wenn du diesen Vertrag widerrufst, erstatten wir alle erhaltenen Zahlungen einschließlich der Lieferkosten – mit Ausnahme zusätzlicher Kosten einer anderen als der von uns angebotenen günstigsten Standardlieferung – unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem deine Widerrufserklärung bei uns eingegangen ist.</p>
        <p>Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel wie bei der ursprünglichen Transaktion, sofern nicht ausdrücklich etwas anderes vereinbart wurde und dir dadurch keine Kosten entstehen.</p>
        <p>Wir können die Rückzahlung verweigern, bis wir die Ware zurückerhalten haben oder bis du nachgewiesen hast, dass du sie abgesandt hast, je nachdem, welches der frühere Zeitpunkt ist.</p>
      </LegalSection>

      <LegalSection id="ruecksendung" title="Rücksendung und Kosten">
        <p>Du hast die Ware unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem du uns über den Widerruf unterrichtest, zurückzusenden. Die Frist ist gewahrt, wenn du die Ware vor Ablauf dieser Frist absendest.</p>
        <LegalCallout><p><strong>{legalConfig.commerce.returnPostage.value}</strong></p></LegalCallout>
        <p>{legalConfig.commerce.returnMethod.publicNote} Die Rücksendeanschrift muss vor Verkaufsstart ergänzt werden. Die Widerrufserklärung ist unabhängig von einer Labelausgabe oder vorherigen Supportfreigabe.</p>
        <p>Du musst für einen etwaigen Wertverlust nur aufkommen, wenn dieser auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise nicht notwendigen Umgang mit der Ware zurückzuführen ist.</p>
      </LegalSection>

      <LegalSection id="muster" title="Muster-Widerrufsformular">
        <p>Wenn du den Vertrag widerrufen willst, kannst du den folgenden Text verwenden. Die Verwendung ist freiwillig.</p>
        <blockquote className="whitespace-pre-line rounded-[var(--radius-control)] border border-border bg-surface p-5 text-sm leading-7">
          {`An: ${trader.proprietor.value}, handelnd unter Ra & Ra\n${trader.streetAddress.publicNote}\nE-Mail: contact@raundra.com\n\nHiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren:\n\nBestellt am (*) / erhalten am (*):\nName des/der Verbraucher(s):\nAnschrift des/der Verbraucher(s):\nDatum:\nUnterschrift (nur bei Mitteilung auf Papier):\n\n(*) Unzutreffendes streichen.`}
        </blockquote>
        <p>Zusätzliche praktische Hinweise findest du unter <Link href="/returns">Widerruf & Rücksendungen</Link>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

