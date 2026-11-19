import {
  beyondCollectionHero,
  beyondCollectionPhilosophy,
  beyondDesigns,
} from "@/data/beyond-collection";
import { beyondSizeChart } from "@/data/size-charts";
import type {
  EditorialBlock,
  EditorialCtaConfig,
  EditorialHeroConfig,
  FaqCategoryData,
  JournalArticle,
  SizeChartData,
} from "@/types/editorial";

export const EDITORIAL_DEVELOPMENT_NOTICE =
  "Source-backed collection content. Business, production and policy details remain subject to separate approval.";

export const aboutHero = {
  eyebrow: "RA & RA / COLLECTION 01",
  title: "The things we carry.",
  lead:
    "Four designs. Four human experiences. One way of making the invisible personal.",
  image: beyondCollectionHero.desktop,
  imagePosition: "50% 50%",
} as const satisfies EditorialHeroConfig;

export const aboutContent = [
  { type: "heading", level: 2, content: "BEYOND", id: "beyond" },
  ...beyondCollectionPhilosophy.map(
    (content) => ({ type: "paragraph", content }) as const,
  ),
  {
    type: "quote",
    quote: "We create the design. You give it meaning.",
  },
  {
    type: "heading",
    level: 2,
    content: "One garment. Four visual languages.",
  },
  {
    type: "paragraph",
    content:
      "Each design is carried by the same solid deep-black, 280 GSM Supima-cotton T-shirt: a boxy oversized unisex shape with dropped shoulders, wide straight sleeves and a softly structured surface.",
  },
  {
    type: "callout",
    title: "Specification status",
    body:
      "Interlock is proposed for the double-jersey construction but is not yet supplier-approved. Measurements remain provisional pending sampling and fit approval. Print method, care, origin and production approval are not yet confirmed.",
    tone: "notice",
  },
] as const satisfies readonly EditorialBlock[];

export const editorialCta = {
  eyebrow: "RA & RA / COLLECTION 01",
  heading: "Choose the story that stays with you.",
  description: "Explore Beyond Time, Beyond Fear, Beyond Reality and Beyond Limits.",
  label: "Read the four stories",
  href: "/journal",
} as const satisfies EditorialCtaConfig;

export const journalIndexHero = {
  eyebrow: "Ra & Ra Journal",
  title: "The things we carry.",
  lead:
    "Read the definitive stories behind Time, Fear, Reality and Limits.",
  image: beyondCollectionHero.desktop,
  mobileImage: beyondCollectionHero.mobile,
  imagePosition: "50% 42%",
} as const satisfies EditorialHeroConfig;

export const journalNewsletter = {
  id: "journal-newsletter",
  eyebrow: "Letters from the studio",
  heading: "Stay close to the stories.",
  description:
    "Receive future Journal stories and collection updates when email delivery is connected.",
  emailLabel: "Email address",
  emailPlaceholder: "Your email address",
  submitLabel: "Subscribe",
  pendingLabel: "Sending…",
  consentText:
    "Email delivery is not yet connected. Development submissions are validated but not stored.",
  privacyLabel: "Datenschutzerklärung lesen.",
  privacyHref: "/privacy",
} as const;

export const journalArticles: readonly JournalArticle[] = beyondDesigns.map(
  (design, index) => ({
    slug: design.handle,
    title: `${design.title}: ${design.collectionStoryHeading}`,
    excerpt: design.shortDescription,
    category: "BEYOND Story",
    readingTime: "4 min read",
    heroImage: design.images[2] ?? design.images[0]!,
    featured: index === 0,
    contentStatus: "production",
    relatedSlugs: beyondDesigns
      .filter((candidate) => candidate.handle !== design.handle)
      .map((candidate) => candidate.handle),
    content: [
      {
        type: "callout",
        title: design.corePhilosophy,
        body: design.shortDescription,
        tone: "notice",
      },
      ...design.collectionStoryParagraphs.map(
        (content) => ({ type: "paragraph", content }) as const,
      ),
      { type: "image", image: design.images[2] ?? design.images[0]! },
      { type: "quote", quote: design.signatureStatement },
    ],
  }),
);

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function getRelatedJournalArticles(
  article: JournalArticle,
): readonly JournalArticle[] {
  const related = new Set(article.relatedSlugs ?? []);
  return journalArticles.filter((candidate) => related.has(candidate.slug));
}

export const contactHero = {
  eyebrow: "Contact",
  title: "A quiet place to begin.",
  lead:
    "Use this development form for enquiries about RA & RA, the BEYOND collection or future releases.",
  developmentNotice:
    "Development contact interface. Submissions are validated but are not sent, stored or logged.",
} as const satisfies EditorialHeroConfig;

export const faqHero = {
  eyebrow: "Hilfe",
  title: "Fragen, ehrlich beantwortet.",
  lead:
    "Bestätigte Informationen und klar gekennzeichnete Entwürfe rund um Bestellung, Versand, Produkte und Größen.",
  developmentNotice:
    "Diese FAQ ersetzen keine Rechtstexte. Offene Versand-, Steuer-, Zahlungs- und Produktionsangaben bleiben als Freigabeblocker markiert.",
} as const satisfies EditorialHeroConfig;

export const faqCategories = [
  {
    id: "orders",
    title: "Bestellungen",
    items: [
      {
        id: "ordering-live",
        question: "Kann ich bereits bestellen?",
        answer:
          "Bestellungen laufen über den angebundenen Shopify-Warenkorb und -Checkout. Der Live-Verkauf darf erst freigegeben werden, wenn Pflichtangaben, Steuerbehandlung, Versand, Widerrufsfunktion und Shopify-Richtlinien vollständig abgestimmt sind.",
        links: [
          { href: "/terms", label: "AGB-Entwurf" },
          { href: "/contact", label: "Kontakt" },
        ],
      },
      {
        id: "payment-methods",
        question: "Welche Zahlungsarten sind verfügbar?",
        answer:
          "Verbindlich sind ausschließlich die Zahlungsarten, die im Shopify-Checkout tatsächlich angeboten werden. Eine Liste wird erst nach Prüfung der Shopify-Zahlungseinstellungen veröffentlicht.",
      },
    ],
  },
  {
    id: "products",
    title: "Produkte",
    items: [
      {
        id: "product-specifications",
        question: "Welche Material- und Konstruktionsangaben sind bestätigt?",
        answer:
          "Lieferantendokumentation und Freigabe für Faserzusammensetzung, Supima-Bezeichnung, Flächengewicht, Strickart, Pflege und weitere Leistungsangaben stehen noch aus. Deshalb werden diese Angaben hier nicht als bestätigt dargestellt.",
      },
      {
        id: "artwork",
        question: "Sind die vier Motive unterschiedliche Kollektionen?",
        answer:
          "Beyond Time, Beyond Fear, Beyond Reality und Beyond Limits sind vier Motive der BEYOND-Reihe. Verbindliche Produkt- und Variantendaten kommen aus dem angebundenen Shopify-Katalog.",
      },
      {
        id: "care",
        question: "Wie pflege ich das Kleidungsstück?",
        answer:
          "Pflegehinweise werden erst veröffentlicht, wenn die Produktionsausführung und Lieferantenangaben freigegeben sind. Bitte beachte anschließend die Kennzeichnung am Produkt.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Größen",
    items: [
      {
        id: "size-chart",
        question: "Welche Größe soll ich wählen?",
        answer:
          "Vergleiche die fertigen Kleidungsmaße mit einem T-Shirt, dessen Passform du magst. Die aktuellen Maße bleiben bis zur Lieferantenbemusterung und Passformfreigabe vorläufig.",
        links: [{ href: "/size-guide", label: "Zum Größenratgeber" }],
      },
    ],
  },
  {
    id: "policies",
    title: "Versand, Widerruf und Rücksendung",
    items: [
      {
        id: "shipping",
        question: "Wohin liefert Ra & Ra und wie lange dauert es?",
        answer:
          "Zum Start ist ausschließlich der Versand innerhalb Deutschlands vorgesehen. Tarif, Freigrenze, DHL-Integration und die geplante Gesamtdauer von ungefähr 3–6 Werktagen müssen noch im Betrieb und in Shopify bestätigt werden.",
        links: [{ href: "/shipping", label: "Versand & Lieferung" }],
      },
      {
        id: "returns",
        question: "Wer trägt die Rücksendekosten beim Widerruf?",
        answer:
          "Ra & Ra trägt die unmittelbaren Kosten der gewöhnlichen Rücksendung im Rahmen des gesetzlichen Widerrufsrechts. Die Rücksendeanschrift und der kostenfreie praktische Ablauf sind noch einzurichten. Ein Widerruf ist nicht von einem Label oder einer Supportfreigabe abhängig.",
        links: [
          { href: "/returns", label: "Widerruf & Rücksendungen" },
          { href: "/widerruf", label: "Vertrag widerrufen" },
        ],
      },
    ],
  },
] as const satisfies readonly FaqCategoryData[];

export const sizeGuideHero = {
  eyebrow: "BEYOND / Size Guide",
  title: "Finished garment measurements.",
  lead:
    "One provisional chart applies to all four BEYOND designs because they share the same garment construction.",
  image: beyondDesigns[0]!.images[0]!,
  imagePosition: "50% 28%",
  developmentNotice:
    "Provisional pending supplier sampling and fit approval. These are garment measurements, not body measurements.",
} as const satisfies EditorialHeroConfig;

export const sizeChart = {
  columns: ["Size", "Chest (cm)", "Length (cm)", "Shoulder (cm)", "Sleeve (cm)"],
  rows: beyondSizeChart.rows.map((row) => ({
    id: row.size.toLowerCase(),
    values: [
      row.size,
      String(row.chest),
      String(row.bodyLength),
      String(row.shoulder),
      String(row.sleeve),
    ],
  })),
  caption: "Provisional BEYOND finished garment measurements in centimetres",
  developmentNotice: beyondSizeChart.provisionalNote,
} as const satisfies SizeChartData;

export const sizeGuideInstructions = [
  {
    type: "heading",
    level: 2,
    content: "How to compare the measurements",
  },
  {
    type: "paragraph",
    content:
      "Lay a T-shirt whose fit you like on a flat surface, smooth it without stretching, and compare the same measurement points.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Chest: measure straight across from pit to pit.",
      "Length: measure from the highest shoulder point beside the collar to the bottom hem.",
      "Shoulder: measure across the back from shoulder seam to shoulder seam.",
      "Sleeve: measure from the shoulder seam to the sleeve opening.",
    ],
  },
] as const satisfies readonly EditorialBlock[];

export const sizeGuideNotes = [
  {
    type: "two-column",
    left: [
      { type: "heading", level: 2, content: "Intended fit" },
      {
        type: "paragraph",
        content:
          "Boxy oversized unisex fit with generous chest volume, a straight body, dropped shoulders, wide straight sleeves and a standard oversized length.",
      },
    ],
    right: [
      { type: "heading", level: 2, content: "Approval status" },
      {
        type: "paragraph",
        content:
          "All dimensions remain provisional until supplier sampling and fit approval. Model measurements and personalized size recommendations have not been supplied.",
      },
    ],
  },
] as const satisfies readonly EditorialBlock[];
