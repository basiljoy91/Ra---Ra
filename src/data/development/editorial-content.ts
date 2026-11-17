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
  privacyLabel: "Review the current FAQ.",
  privacyHref: "/faq",
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
  eyebrow: "Help",
  title: "Questions, answered honestly.",
  lead:
    "Confirmed product information and clearly marked provisional guidance for the BEYOND collection.",
  developmentNotice:
    "Shipping, returns, payment, care and launch terms remain pending business and legal approval.",
} as const satisfies EditorialHeroConfig;

export const faqCategories = [
  {
    id: "orders",
    title: "Orders",
    items: [
      {
        id: "ordering-live",
        question: "Can I place an order now?",
        answer:
          "Ordering depends on the connected Shopify catalogue. Where a price or purchase action is marked pending, no approved offer is being made.",
      },
      {
        id: "payment-methods",
        question: "Which payment methods are available?",
        answer:
          "Payment methods are shown only in the connected checkout and are not promised in this editorial content.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      {
        id: "product-specifications",
        question: "What is confirmed about the garment?",
        answer:
          "The working specification is a solid deep-black, 280 GSM, 100% Supima-cotton, double-jersey T-shirt with a boxy oversized unisex fit, dropped shoulders, wide straight sleeves and reinforced construction. Interlock is proposed but not supplier-approved.",
      },
      {
        id: "artwork",
        question: "Are all four designs different garments?",
        answer:
          "No. Beyond Time, Beyond Fear, Beyond Reality and Beyond Limits are four designs carried by one shared garment construction.",
      },
      {
        id: "care",
        question: "How should I care for the garment?",
        answer:
          "Care instructions are not published yet because the production process and supplier guidance have not been approved.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing",
    items: [
      {
        id: "size-chart",
        question: "Which size should I choose?",
        answer:
          "Use the finished garment measurements to compare with a T-shirt you already own. The figures remain provisional pending supplier sampling and fit approval.",
      },
    ],
  },
  {
    id: "policies",
    title: "Shipping and returns",
    items: [
      {
        id: "shipping",
        question: "Where and when will RA & RA ship?",
        answer:
          "Destinations, carriers, delivery estimates and shipping costs have not been approved for publication.",
      },
      {
        id: "returns",
        question: "What is the return policy?",
        answer:
          "Return eligibility, costs, process and refund timing remain pending legal and business approval.",
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
