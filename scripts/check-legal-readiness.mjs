const blockers = [
  "Vollständige ladungsfähige Geschäftsanschrift fehlt.",
  "Betriebliche Rücksendeanschrift und kostenfreier Rücksendeablauf fehlen.",
  "Umsatzsteuerliche Behandlung und veröffentlichungsfähige Kennungen sind ungeklärt.",
  "Shopify-Vertragsschluss, Versandtarif, Lieferzeit und Zahlungsarten sind nicht verifiziert.",
  "Produktives Datenschutz-, Processor-, Cookie- und Shopify-Pixel-Audit fehlt.",
  "RA_LEGAL_SUBMISSION_ENDPOINT/SECRET und der durable §356a-Acknowledgement-Workflow sind nicht bestätigt.",
  "VSBG-Erklärung und rechtliche Freigabe fehlen.",
];

const submissionReady = Boolean(
  process.env.RA_LEGAL_SUBMISSION_ENDPOINT &&
    process.env.RA_LEGAL_SUBMISSION_SECRET,
);

console.error("\nRA & RA legal release gate: BLOCKED\n");
for (const blocker of blockers) console.error(`- ${blocker}`);
if (submissionReady) {
  console.error("\nHinweis: Submission-Konfiguration ist vorhanden, muss aber durch einen echten End-to-End-Test freigegeben werden.");
}
console.error("\nDiese Prüfung bleibt absichtlich rot, bis die offenen Werte fachlich bestätigt und in legalConfig freigegeben wurden.\n");
process.exitCode = 1;

