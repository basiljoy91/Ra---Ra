export type LegalFactStatus = "verified" | "pending";

export type LegalFact<T> = {
  status: LegalFactStatus;
  value: T | null;
  publicNote: string;
  internalNote: string;
};

function verified<T>(value: T, publicNote = "Vom Inhaber bestätigt."): LegalFact<T> {
  return { status: "verified", value, publicNote, internalNote: "" };
}

function pending<T>(publicNote: string, internalNote: string): LegalFact<T> {
  return { status: "pending", value: null, publicNote, internalNote };
}

export const legalConfig = {
  publication: {
    status: "pending" as const,
    label: "Entwurf — nicht zur Veröffentlichung",
    reason:
      "Pflichtangaben und betriebliche Abläufe sind noch nicht vollständig bestätigt. Diese Seiten sind eine transparente Arbeitsfassung und dürfen vor Freigabe nicht als endgültige Rechtstexte veröffentlicht werden.",
  },
  version: {
    draftDate: "17. November 2026",
    approvedDate: null,
  },
  trader: {
    brand: verified("Ra & Ra"),
    proprietor: verified("Ragi Pannikkamthadathil Rajan"),
    legalForm: verified("Einzelunternehmen"),
    city: verified("München"),
    country: verified("Deutschland"),
    streetAddress: pending(
      "Die vollständige ladungsfähige Geschäftsanschrift ist noch nicht freigegeben.",
      "BUSINESS_STREET_ADDRESS_PENDING — production launch blocker.",
    ),
    returnAddress: pending(
      "Die betriebliche Rücksendeanschrift wird vor Verkaufsstart ergänzt.",
      "RETURN_POSTAL_ADDRESS_PENDING — do not publish a partial address.",
    ),
    email: verified("contact@raundra.com"),
    phoneDisplay: verified("+49 157 73619312"),
    phoneHref: verified("tel:+4915773619312"),
    register: pending(
      "Ein Registereintrag ist noch nicht bestätigt und wird daher nicht angegeben.",
      "Do not claim registered or unregistered status.",
    ),
    vatId: pending(
      "Eine Umsatzsteuer- oder Wirtschafts-Identifikationsnummer ist noch nicht zur Veröffentlichung bestätigt.",
      "Expected owner clarification after 20 November 2026.",
    ),
    vatTreatment: pending(
      "Die umsatzsteuerliche Preisangabe ist noch nicht freigegeben.",
      "Do not state regular VAT or §19 UStG until confirmed.",
    ),
    disputeResolution: pending(
      "Die Erklärung zur Verbraucherstreitbeilegung wird nach Prüfung der Voraussetzungen ergänzt.",
      "VSBG employee threshold, obligation and proprietor preference pending.",
    ),
  },
  commerce: {
    market: verified("Deutschland"),
    currency: verified("EUR"),
    carrier: pending(
      "DHL Paket mit Sendungsverfolgung ist vorgesehen, aber technisch noch nicht bestätigt.",
      "Verify Shopify-compatible label app/business integration and actual tariff.",
    ),
    shippingFee: pending(
      "Geplant sind 4,90 € Standardversand innerhalb Deutschlands.",
      "Verify and approve actual Shopify shipping rate before publication.",
    ),
    freeShippingThreshold: pending(
      "Geplant ist kostenfreier Standardversand ab 79,00 € Bestellwert.",
      "Verify threshold basis, discounts, taxes and Shopify rate before publication.",
    ),
    deliveryTiming: pending(
      "Geplant sind 1–2 Werktage Bearbeitung und anschließend 2–4 Werktage Transport (insgesamt ungefähr 3–6 Werktage).",
      "Verify operational capacity and carrier service before publication.",
    ),
    returnPostage: verified(
      "Wir tragen die unmittelbaren Kosten der Rücksendung der Waren.",
      "Vom Inhaber am 16. November 2026 bestätigt.",
    ),
    returnMethod: pending(
      "Der für Kundinnen und Kunden kostenfreie Rücksendeablauf wird vor Verkaufsstart eingerichtet und getestet.",
      "Choose and test prepaid label or documented reimbursement workflow.",
    ),
    orderAcceptance: pending(
      "Der genaue Zeitpunkt des Vertragsschlusses wird nach Prüfung der Shopify-Bestell- und Zahlungsnachrichten ergänzt.",
      "Do not publish a guessed contract-acceptance event.",
    ),
  },
  privacy: {
    frontendAudit:
      "Im Quellcode wurden keine Analyse-, Marketing- oder Werbe-Pixel gefunden. Der produktive Betrieb und Shopify Admin müssen zusätzlich geprüft werden.",
    necessaryTechnologies: [
      {
        name: "ra_shopify_cart",
        purpose: "Ordnet den Shopify-Warenkorb diesem Browser zu.",
        duration: "30 Tage",
        storage: "HTTP-only Cookie",
      },
      {
        name: "ra_storefront_country",
        purpose: "Speichert das ausgewählte Lieferland für marktbezogene Shop-Anfragen.",
        duration: "1 Jahr",
        storage: "HTTP-only Cookie",
      },
    ],
    hosting: pending(
      "Der produktive Hosting-Anbieter, Serverstandort und die Log-Speicherdauer sind noch zu bestätigen.",
      "Inspect deployed Vercel project and DPA before publication.",
    ),
    processors: pending(
      "Shopify-Apps, Zahlungsanbieter, Pixel, Versanddienste und weitere Empfänger müssen im produktiven Shop inventarisiert werden.",
      "Requires Shopify Admin/customer privacy/payment/app audit.",
    ),
    supervisoryAuthority: pending(
      "Die zuständige bayerische Datenschutzaufsichtsbehörde wird nach Prüfung des Unternehmenssitzes bestätigt.",
      "Do not guess authority before exact establishment is confirmed.",
    ),
  },
  submissions: {
    contactConfigured: Boolean(
      process.env.RA_LEGAL_SUBMISSION_ENDPOINT &&
        process.env.RA_LEGAL_SUBMISSION_SECRET,
    ),
    withdrawalConfigured: Boolean(
      process.env.RA_LEGAL_SUBMISSION_ENDPOINT &&
        process.env.RA_LEGAL_SUBMISSION_SECRET,
    ),
  },
} as const;

export const legalRoutes = [
  { href: "/impressum", label: "Impressum" },
  { href: "/privacy", label: "Datenschutzerklärung" },
  { href: "/terms", label: "Allgemeine Geschäftsbedingungen" },
  { href: "/shipping", label: "Versand & Lieferung" },
  { href: "/returns", label: "Widerruf & Rücksendungen" },
  { href: "/contact", label: "Kontakt" },
  { href: "/widerruf", label: "Vertrag widerrufen" },
  { href: "/cookie-einstellungen", label: "Cookie-Einstellungen" },
] as const;

export const legalLaunchBlockers = [
  "Vollständige ladungsfähige Geschäftsanschrift",
  "Betriebliche Rücksendeanschrift und kostenfreier Rücksendeablauf",
  "Umsatzsteuerliche Behandlung und gegebenenfalls zu veröffentlichende Identifikationsnummern",
  "Shopify-Vertragsschluss, Versandtarif, Lieferzeit und Zahlungsarten",
  "Vollständiges Datenschutz-, Processor-, Cookie- und Shopify-Pixel-Audit",
  "Produktiver Submission-Backenddienst mit Speicherung und unmittelbarer E-Mail-Bestätigung für § 356a BGB",
  "Erklärung zur Verbraucherstreitbeilegung und fachliche rechtliche Prüfung",
] as const;

