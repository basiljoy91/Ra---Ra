import type {
  EditorialBlock,
  EditorialCtaConfig,
  EditorialHeroConfig,
  FaqCategoryData,
  JournalArticle,
  SizeChartData,
} from "@/types/editorial";

export const EDITORIAL_DEVELOPMENT_NOTICE =
  "Development editorial content. Final brand, founder and production details remain subject to approval.";

const aboutEditorialImage = {
  url: "/campaign/hero-beyond-limits.png",
  alt: "Two models in black Beyond Limits T-shirts beside a fractured Atlas sculpture",
  width: 1672,
  height: 941,
} as const;

const collectionImage = {
  url: "/products/beyond-limits/sculptural-boxy-black/side-couple-black.png",
  alt: "Two models wearing black Beyond Limits T-shirts from different angles",
  width: 1536,
  height: 2048,
} as const;

const atlasArtworkImage = {
  url: "/products/beyond-limits/sculptural-boxy-black/lifestyle-back.png",
  alt: "Beyond Limits back artwork showing Atlas beneath a fractured celestial sphere",
  width: 1536,
  height: 2048,
} as const;

const timeArtworkImage = {
  url: "/products/past-present-beyond/signature-regular-off-white/lifestyle-back.png",
  alt: "Past Present Beyond artwork with a fractured classical portrait and vivid red marks",
  width: 1536,
  height: 2048,
} as const;

const fabricEditorialImage = {
  url: "/editorial/washed-cotton-macro.png",
  alt: "Macro view of dense washed cotton jersey",
  width: 1536,
  height: 864,
} as const;

export const aboutHero = {
  eyebrow: "About ra&ra",
  title: "An idea should survive the first glance.",
  lead:
    "ra&ra builds limited-edition apparel around questions that stay with us—about courage, perception, time and the limits we inherit or imagine.",
  image: aboutEditorialImage,
  imagePosition: "50% 50%",
  developmentNotice: EDITORIAL_DEVELOPMENT_NOTICE,
} as const satisfies EditorialHeroConfig;

export const aboutContent = [
  {
    type: "heading",
    level: 2,
    content: "The idea behind the garment",
    id: "our-story",
  },
  {
    type: "paragraph",
    content:
      "A graphic can decorate a surface, or it can open a question. ra&ra begins with the question. The image comes next; the garment gives it a form that can move through everyday life.",
  },
  {
    type: "paragraph",
    content:
      "That order matters. It keeps each collection connected by an idea instead of a trend, while allowing every piece to stand on its own as clothing: considered in weight, proportion, placement and wear.",
  },
  {
    type: "quote",
    quote: "The first look should be immediate. The second should reveal something new.",
  },
  {
    type: "two-column",
    left: [
      {
        type: "heading",
        level: 2,
        content: "Artwork with something to say",
      },
      {
        type: "paragraph",
        content:
          "Myth, memory, sculpture and imagined worlds become visual material. Symbols are chosen for what they add to the story—not simply because they fill the print area.",
      },
    ],
    right: [
      {
        type: "heading",
        level: 2,
        content: "Garments with a reason",
      },
      {
        type: "paragraph",
        content:
          "Fabric weight changes the way a T-shirt falls. Fit changes the way the artwork is read. Front and back placement create a reveal. These are design decisions, not specifications added after the image is finished.",
      },
    ],
  },
  {
    type: "image",
    image: collectionImage,
    caption:
      "The Beyond collection pairs restrained chest symbols with full narrative artwork across the back.",
  },
  {
    type: "heading",
    level: 2,
    content: "Edition 01: Beyond",
  },
  {
    type: "paragraph",
    content:
      "Beyond is built around four recurring human questions: what we carry, what we fear, what we perceive and what time changes. Beyond Limits, Beyond Fear, Beyond Reality and Past Present Beyond answer them differently, but belong to one visual world.",
  },
  {
    type: "callout",
    title: "Four artworks, four constructions",
    body:
      "Each artwork is planned across Sculptural Boxy, Washed Art, Signature Regular and Relaxed Essential silhouettes. Final prices, quantities and launch availability remain to be confirmed.",
    tone: "notice",
  },
] as const satisfies readonly EditorialBlock[];

export const editorialCta = {
  eyebrow: "Edition 01 · Beyond",
  heading: "Choose the idea that stays with you.",
  description:
    "Explore four connected artworks across four distinct unisex T-shirt constructions.",
  label: "Explore Beyond",
  href: "/collections/beyond",
} as const satisfies EditorialCtaConfig;

export const journalIndexHero = {
  eyebrow: "The Journal",
  title: "Look once. Then look closer.",
  lead:
    "Short readings on the myths, materials and visual histories behind the Beyond collection.",
  image: timeArtworkImage,
  imagePosition: "50% 30%",
  developmentNotice:
    "Development journal content. No publication history or named authors are being claimed.",
} as const satisfies EditorialHeroConfig;

export const journalArticles = [
  {
    slug: "atlas-and-the-weight-of-heaven",
    title: "Atlas and the Weight of Heaven",
    excerpt:
      "The figure known for carrying the world was originally condemned to support the sky. That difference changes the story.",
    category: "Artwork Notes",
    readingTime: "4 min read",
    heroImage: atlasArtworkImage,
    featured: true,
    contentStatus: "development",
    relatedSlugs: [
      "when-marble-was-never-white",
      "what-250-gsm-really-means",
    ],
    content: [
      {
        type: "callout",
        title: "The detail most people miss",
        body:
          "In Greek mythology, Atlas supports the heavens or celestial sphere—not the planet Earth. Later images gradually turned that sky into the globe most people recognise today.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "That distinction makes Atlas more than a symbol of physical strength. His burden is cosmic and permanent: the structure above him depends on his refusal to let it fall.",
      },
      {
        type: "heading",
        level: 2,
        content: "From endurance to possibility",
      },
      {
        type: "paragraph",
        content:
          "Beyond Limits keeps the familiar pose but fractures the sphere. The break changes the question. Strength is no longer only the ability to carry more; it can also be the decision to challenge the shape of the burden itself.",
      },
      {
        type: "quote",
        quote: "A limit can be a weight, a horizon—or simply an idea that has not been questioned yet.",
      },
      {
        type: "heading",
        level: 2,
        content: "Why the artwork sits on the back",
      },
      {
        type: "paragraph",
        content:
          "The front carries a small celestial mark; the full scene appears only when the wearer turns. That delay is intentional. The piece introduces itself quietly, then reveals the scale of its story.",
      },
      {
        type: "image",
        image: atlasArtworkImage,
        caption:
          "Beyond Limits turns the celestial burden into a fractured, open-ended composition.",
      },
    ],
  },
  {
    slug: "when-marble-was-never-white",
    title: "When Marble Was Never Simply White",
    excerpt:
      "Ancient sculpture was once painted, gilded and vivid. Past Present Beyond uses colour to disturb the version history left behind.",
    category: "Visual History",
    readingTime: "5 min read",
    heroImage: timeArtworkImage,
    contentStatus: "development",
    relatedSlugs: [
      "atlas-and-the-weight-of-heaven",
      "what-250-gsm-really-means",
    ],
    content: [
      {
        type: "callout",
        title: "The colour that time removed",
        body:
          "Greek and Roman sculpture was often richly painted, gilded and inlaid. Much of that colour disappeared through burial, weathering, cleaning and the passage of time.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "The white marble ideal is partly a modern inheritance. When ancient sculpture was rediscovered, its surviving surfaces often appeared colourless; later taste turned that loss into an aesthetic rule.",
      },
      {
        type: "heading",
        level: 2,
        content: "A portrait interrupted",
      },
      {
        type: "paragraph",
        content:
          "Past Present Beyond begins with the authority of a classical face, then cuts through it with red, grids and distressed geometry. The red is not simply an accent. It restores colour as evidence of change and makes the portrait feel unfinished in the present tense.",
      },
      {
        type: "image",
        image: timeArtworkImage,
        caption:
          "A classical portrait, fragmented and reassembled as an image about continuity rather than nostalgia.",
      },
      {
        type: "quote",
        quote: "The past does not arrive intact. It arrives edited by everything that happened after it.",
      },
    ],
  },
  {
    slug: "what-250-gsm-really-means",
    title: "What 250–280 GSM Really Changes",
    excerpt:
      "Fabric weight is not a quality score, but it changes density, drape and the way an oversized silhouette holds its shape.",
    category: "Material Notes",
    readingTime: "4 min read",
    heroImage: fabricEditorialImage,
    contentStatus: "development",
    relatedSlugs: [
      "atlas-and-the-weight-of-heaven",
      "when-marble-was-never-white",
    ],
    content: [
      {
        type: "callout",
        title: "Start with the unit",
        body:
          "GSM means grams per square metre. It describes fabric weight and density—not softness, sustainability or quality on its own.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "The Beyond development specifications range from 250 to 280 GSM. That places the collection on the more substantial side of everyday T-shirt fabric, chosen to support a structured silhouette and the visual weight of the back artwork.",
      },
      {
        type: "two-column",
        left: [
          {
            type: "heading",
            level: 2,
            content: "What weight changes",
          },
          {
            type: "paragraph",
            content:
              "More mass can create a denser hand, reduce cling and help a boxy or oversized shape fall away from the body. Double-knit structures also tend to be more stable and curl less than single knits.",
          },
        ],
        right: [
          {
            type: "heading",
            level: 2,
            content: "What weight cannot tell you",
          },
          {
            type: "paragraph",
            content:
              "GSM does not explain fiber quality, finishing, print durability or fit. Those details have to be considered together; a heavier number alone is not a promise of a better garment.",
          },
        ],
      },
      {
        type: "image",
        image: fabricEditorialImage,
        caption: "The washed cotton surface is designed to feel substantial without losing the ease of a daily T-shirt.",
      },
    ],
  },
] as const satisfies readonly JournalArticle[];

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
    "Use the development form for enquiries about the brand, products or future collections. No message delivery is connected yet.",
  developmentNotice:
    "Development contact interface. Submissions are validated but never sent, stored or logged.",
} as const satisfies EditorialHeroConfig;

export const faqHero = {
  eyebrow: "Help",
  title: "Questions, answered honestly.",
  lead:
    "Confirmed information and clearly marked development guidance for shopping with ra&ra.",
  developmentNotice:
    "Policies, timelines and production specifications remain pending until the relevant business and legal information is approved.",
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
          "No. Products, prices and purchase actions currently use development fixtures. Live ordering will only be enabled after the commerce platform and checkout strategy are approved and connected.",
      },
      {
        id: "payment-methods",
        question: "Which payment methods will be available?",
        answer:
          "Payment methods have not been confirmed. They will be displayed only after the selected commerce provider and checkout configuration are finalized.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    items: [
      {
        id: "shipping-destinations",
        question: "Where will ra&ra ship?",
        answer:
          "Germany and the European Union are the intended launch market, but the exact eligible countries, carriers and delivery estimates are not yet confirmed.",
      },
      {
        id: "shipping-cost",
        question: "How much will shipping cost?",
        answer:
          "Shipping costs and any free-shipping threshold remain unconfirmed. Final costs will be calculated through the approved commerce setup.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        id: "return-policy",
        question: "What is the return policy?",
        answer:
          "Final return eligibility, process, costs and refund timing will be published after professionally approved German and EU legal wording is supplied.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      {
        id: "product-specifications",
        question: "Are the current materials and product details final?",
        answer:
          "No. Current records are development fixtures. Materials, fit, care, manufacturing and production details will appear only after they are verified.",
      },
      {
        id: "collections",
        question: "Will every ra&ra edition explore the same theme?",
        answer:
          "No. Beyond is Edition 01. Future editions can begin with a different question or visual world while keeping the same approach: one connected idea, considered artwork and clearly explained garment construction.",
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
          "Approved garment measurements and fit guidance have not been supplied. The Size Guide currently explains the future measurement process without inventing numeric values.",
      },
    ],
  },
] as const satisfies readonly FaqCategoryData[];

export const sizeGuideHero = {
  eyebrow: "Size Guide",
  title: "A better fit starts with clear information.",
  lead:
    "This development guide reserves the structure for garment measurements, fit notes and care information without publishing unverified specifications.",
  image: collectionImage,
  imagePosition: "50% 50%",
  developmentNotice:
    "Placeholder structure only. Do not use this page to choose a production size until approved measurements are supplied.",
} as const satisfies EditorialHeroConfig;

export const sizeChart = {
  columns: ["Size", "Chest", "Body length", "Sleeve"],
  rows: [
    { id: "small", values: ["S", "Pending", "Pending", "Pending"] },
    { id: "medium", values: ["M", "Pending", "Pending", "Pending"] },
    { id: "large", values: ["L", "Pending", "Pending", "Pending"] },
  ],
  caption: "Development garment-measurement table",
  developmentNotice:
    "Numeric measurements, tolerances and unit conventions are awaiting approved supplier information.",
} as const satisfies SizeChartData;

export const sizeGuideInstructions = [
  {
    type: "heading",
    level: 2,
    content: "How the final guide will work",
  },
  {
    type: "paragraph",
    content:
      "The final chart will explain whether each number represents a garment measurement or a body measurement. That distinction will be stated clearly before launch.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Use a flexible measuring tape and keep it level.",
      "Compare like with like: garment measurements with a similar garment, or body measurements with the approved body-measurement guide.",
      "If a measurement falls between sizes, follow the product-specific fit note once it is confirmed.",
    ],
  },
  {
    type: "callout",
    title: "Measuring illustration pending",
    body:
      "An approved measurement illustration will replace this placeholder once the supplier confirms measurement points and terminology.",
    tone: "notice",
  },
] as const satisfies readonly EditorialBlock[];

export const sizeGuideNotes = [
  {
    type: "two-column",
    left: [
      { type: "heading", level: 2, content: "Fit notes" },
      {
        type: "paragraph",
        content:
          "Fit classification, model measurements and size recommendations remain unconfirmed. Each production product will need its own verified fit note.",
      },
    ],
    right: [
      { type: "heading", level: 2, content: "Care information" },
      {
        type: "paragraph",
        content:
          "Care instructions depend on the final garment, print method and supplier guidance. No washing or drying instructions are published at this stage.",
      },
    ],
  },
] as const satisfies readonly EditorialBlock[];
