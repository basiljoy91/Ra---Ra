import Link from "next/link";

import { LegalCallout, LegalPageLayout, LegalSection, legalPageStyles } from "@/components/legal/legal-page-layout";
import { legalConfig } from "@/config/legal";
import { createLegalMetadata } from "@/lib/legal/metadata";

export const metadata = createLegalMetadata(
  "/privacy",
  "Datenschutzerklärung",
  "Entwurfsfassung der Datenschutzhinweise für den Ra & Ra Storefront, Shopify Checkout, Kontakt und Widerruf.",
);

const toc = [
  { id: "verantwortlicher", label: "Verantwortlicher" },
  { id: "daten", label: "Daten & Zwecke" },
  { id: "hosting", label: "Hosting" },
  { id: "shopify", label: "Shopify & Bestellung" },
  { id: "kontakt", label: "Kontakt & Widerruf" },
  { id: "cookies", label: "Cookies" },
  { id: "empfaenger", label: "Empfänger & Transfers" },
  { id: "dauer", label: "Speicherdauer" },
  { id: "rechte", label: "Deine Rechte" },
] as const;

export default function PrivacyPage() {
  const trader = legalConfig.trader;
  return (
    <LegalPageLayout
      intro="Diese Datenschutzerklärung beschreibt die im Repository nachweisbaren Verarbeitungen und kennzeichnet alles, was erst nach Prüfung der produktiven Hosting- und Shopify-Konfiguration ergänzt werden kann."
      title="Datenschutzerklärung"
      toc={toc}
    >
      <LegalSection id="verantwortlicher" title="1. Verantwortlicher">
        <address>
          <strong>{trader.proprietor.value}</strong>, handelnd unter Ra &amp; Ra<br />
          Einzelunternehmen, Deutschland<br />
          E-Mail: <a href="mailto:contact@raundra.com">contact@raundra.com</a><br />
          Telefon: <a href="tel:+4915773619312">+49 157 73619312</a>
        </address>
        <LegalCallout tone="critical"><p>{trader.streetAddress.publicNote} Die Datenschutzerklärung darf ohne vollständige Anschrift nicht als endgültig freigegeben werden.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="daten" title="2. Welche Daten wir verarbeiten und warum">
        <p>Je nachdem, wie du den Shop nutzt, können insbesondere folgende Daten verarbeitet werden:</p>
        <ul>
          <li><strong>Technische Nutzungsdaten:</strong> IP-Adresse, Zeitpunkt, Browser- und Geräteangaben, aufgerufene Ressourcen und erforderliche Sicherheits- beziehungsweise Serverprotokolle.</li>
          <li><strong>Bestell- und Kundendaten:</strong> Name, Rechnungs- und Lieferadresse, Kontaktdaten, Artikel, Varianten, Preise, Bestell- und Zahlungsstatus.</li>
          <li><strong>Kommunikationsdaten:</strong> Angaben aus Kontaktanfragen, Rücksendungen und Widerrufserklärungen.</li>
          <li><strong>Warenkorb- und Marktdaten:</strong> technische Kennungen, ausgewähltes Lieferland und Warenkorbinhalt.</li>
        </ul>
        <dl className={legalPageStyles.definitionList}>
          <div><dt>Vertrag und vorvertragliche Maßnahmen</dt><dd>Bestellung, Zahlung, Lieferung, Support, Rücksendung und Widerruf; Art. 6 Abs. 1 lit. b DSGVO.</dd></div>
          <div><dt>Gesetzliche Pflichten</dt><dd>Rechnungs-, steuer- und handelsrechtliche Dokumentation sowie gesetzlich erforderliche Nachweise; Art. 6 Abs. 1 lit. c DSGVO.</dd></div>
          <div><dt>Sicherer technischer Betrieb</dt><dd>Bereitstellung, Fehleranalyse und Missbrauchsabwehr; Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist ein sicherer und funktionsfähiger Shop.</dd></div>
          <div><dt>Einwilligung</dt><dd>Nur für künftig tatsächlich aktivierte, nicht notwendige Technologien, soweit erforderlich; Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="hosting" title="3. Hosting und technische Bereitstellung">
        <p>Das Frontend ist eine eigenständige Next.js-Anwendung. Beim Abruf verarbeitet der produktive Hosting-Anbieter technisch erforderliche Verbindungs- und Protokolldaten, um Inhalte auszuliefern und Angriffe oder Fehler zu untersuchen.</p>
        <LegalCallout tone="critical"><p>{legalConfig.privacy.hosting.publicNote} Anbieter, Land, Auftragsverarbeitung, Serverstandorte, Log-Inhalte und Löschfristen müssen vor Veröffentlichung eingetragen werden.</p></LegalCallout>
        <p>Die verwendeten Schriftdateien werden über die Next.js-Font-Integration in den Build übernommen und vom eigenen Frontend ausgeliefert; im Quellcode ist kein Laufzeitabruf von Google Fonts eingebunden.</p>
      </LegalSection>

      <LegalSection id="shopify" title="4. Shopify, Warenkorb, Checkout und Bestellungen">
        <p>Produktdaten, Warenkorb und Checkout werden über Shopify angebunden. Die Storefront-Anwendung sendet die für Produktabfragen, Warenkorbänderungen und marktbezogene Preise erforderlichen Angaben an Shopify. Der Warenkorb wird über eine technische Kennung in einem HTTP-only Cookie diesem Browser zugeordnet. Der eigentliche Checkout wird über die von Shopify zurückgegebene Checkout-Adresse geöffnet.</p>
        <p>Für Kundinnen und Kunden im Europäischen Wirtschaftsraum erbringt Shopify seine Dienste regelmäßig über Shopify International Limited in Irland; je nach aktivierten Funktionen können weitere Shopify-Gesellschaften und Unterauftragsverarbeiter beteiligt sein. Weitere allgemeine Informationen stehen in der <a href="https://www.shopify.com/legal/privacy" rel="noreferrer" target="_blank">Shopify-Datenschutzerklärung</a>.</p>
        <LegalCallout tone="critical"><p>{legalConfig.privacy.processors.publicNote} Insbesondere Zahlungsanbieter, Betrugsprävention, Kundenkonten, Shop Pay, Apps, Network Intelligence und Checkout-Pixels können erst nach Shopify-Admin-Audit korrekt beschrieben werden.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="kontakt" title="5. Kontaktanfragen und elektronische Widerrufe">
        <p>Bei einer Kontaktanfrage verarbeiten wir Name, E-Mail-Adresse, optional eine Bestellnummer, das gewählte Thema und die Nachricht zur Bearbeitung des Anliegens. Bei einer elektronischen Widerrufserklärung verarbeiten wir Name, Vertrags- oder Bestellkennung, Bestätigungsadresse, optional betroffene Artikel und eine optionale Nachricht sowie den genauen Eingangszeitpunkt.</p>
        <p>Die produktive Übermittlung soll an einen serverseitigen Dienst erfolgen. Ein Erfolg wird nur angezeigt, wenn dieser Dienst die Speicherung bestätigt; beim Widerruf muss zusätzlich die unverzügliche Bestätigung auf einem dauerhaften Datenträger angestoßen sein. Solange dieser Dienst nicht eingerichtet ist, werden Formulareingaben nicht als erfolgreich übermittelt dargestellt.</p>
        <p>Alternativ kannst du uns unter <a href="mailto:contact@raundra.com">contact@raundra.com</a> schreiben. Bitte übermittle nur Daten, die für dein Anliegen erforderlich sind.</p>
      </LegalSection>

      <LegalSection id="cookies" title="6. Cookies und ähnliche Technologien">
        <p>Im Repository wurden die notwendigen HTTP-only Cookies <code>ra_shopify_cart</code> (Warenkorb; 30 Tage) und <code>ra_storefront_country</code> (ausgewähltes Lieferland; 1 Jahr) festgestellt. Sie unterstützen ausdrücklich angeforderte Shop-Funktionen.</p>
        <p>Im Next.js-Quellcode wurden keine Analyse-, Marketing- oder Werbe-Pixel gefunden. Das ist noch kein Nachweis dafür, dass im produktiven Shopify-Checkout oder über Shopify Apps keine weiteren Technologien aktiv sind.</p>
        <p>Der jeweils dokumentierte Status und spätere echte Wahlmöglichkeiten sind unter <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link> erreichbar. Nicht notwendige Technologien dürfen erst nach erforderlicher Einwilligung geladen werden.</p>
      </LegalSection>

      <LegalSection id="empfaenger" title="7. Empfänger und Drittlandübermittlungen">
        <p>Erforderliche Daten können an Hosting-, Shop-, Zahlungs-, Versand-, Support- und Sicherheitsdienstleister übermittelt werden, soweit dies für ihren jeweiligen Auftrag notwendig ist. Welche Empfänger tatsächlich aktiv sind, muss mit den produktiven Shopify-, Hosting-, Payment- und Versandkonfigurationen abgeglichen werden.</p>
        <p>Je nach Anbieter kann eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums stattfinden. Erforderliche Garantien können insbesondere ein Angemessenheitsbeschluss oder Standardvertragsklauseln sein.</p>
        <LegalCallout tone="warning"><p>Konkrete Empfänger, Rollen, Länder und Transfermechanismen sind noch nicht vollständig auditiert und werden nicht erfunden.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="dauer" title="8. Speicherdauer">
        <p>Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Bestell-, Rechnungs- und Buchhaltungsdaten können gesetzlichen Fristen unterliegen. Kontakt- und Widerrufsdaten werden so lange benötigt, wie dies zur Bearbeitung und zum Nachweis erforderlich ist.</p>
        <LegalCallout tone="warning"><p>Eine konkrete, systembezogene Lösch- und Aufbewahrungsmatrix für Hosting-Logs, Shopify, Formulare, Einwilligungen und angeschlossene Dienstleister steht noch aus.</p></LegalCallout>
      </LegalSection>

      <LegalSection id="rechte" title="9. Deine Datenschutzrechte">
        <p>Bei Vorliegen der gesetzlichen Voraussetzungen hast du Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen; die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt.</p>
        <p>Zur Ausübung deiner Rechte schreibe an <a href="mailto:contact@raundra.com">contact@raundra.com</a>. Du hast außerdem das Recht, dich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.</p>
        <LegalCallout tone="warning"><p>{legalConfig.privacy.supervisoryAuthority.publicNote}</p></LegalCallout>
      </LegalSection>
    </LegalPageLayout>
  );
}

