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

const dogOwnerEditorialImage = {
  url: "/hero/hero-dog-owner.png",
  alt: "Golden retriever presenting a dog-illustrated T-shirt to its owner in a warm home",
  width: 1717,
  height: 916,
} as const;

const dogOwnerHeroImage = {
  url: "/hero/hero-dog-owner.png",
  alt: "Golden retriever presenting a dog-illustrated T-shirt to its owner in a warm home",
  width: 1717,
  height: 916,
} as const;

const collectionImage = {
  url: "/featured-collection/dogs-and-humans-campaign.jpeg",
  alt: "Black and white T-shirts featuring a restrained dog illustration beneath a heart",
  width: 1402,
  height: 1122,
} as const;

const chosenArtworkImage = {
  url: "/development-products/chosen-companion-detail.jpeg",
  alt: "Development artwork detail of a seated golden retriever beneath a heart",
  width: 1254,
  height: 1254,
} as const;

const loyalArtworkImage = {
  url: "/development-products/loyal-line-detail.jpeg",
  alt: "Development artwork detail of a German Shepherd line illustration",
  width: 1254,
  height: 1254,
} as const;

export const aboutHero = {
  eyebrow: "About Ra & Ra",
  title: "Made for what stays with us.",
  lead:
    "Ra & Ra creates theme-led apparel around the connections, rituals and passions that become part of who we are.",
  image: dogOwnerEditorialImage,
  imagePosition: "56% 50%",
  developmentNotice: EDITORIAL_DEVELOPMENT_NOTICE,
} as const satisfies EditorialHeroConfig;

export const aboutContent = [
  {
    type: "heading",
    level: 2,
    content: "Why Ra & Ra exists",
    id: "our-story",
  },
  {
    type: "paragraph",
    content:
      "Some ideas stay close because they hold a memory, a routine or a shared identity. Ra & Ra begins there: with simple apparel that gives those ideas a quiet, everyday form.",
  },
  {
    type: "paragraph",
    content:
      "The garment is the surface, not the whole story. Each collection is designed to make room for the meaning behind an image while keeping the product clear, useful and easy to wear.",
  },
  {
    type: "quote",
    quote: "The artwork can be minimal while the meaning behind it is not.",
  },
  {
    type: "two-column",
    left: [
      {
        type: "heading",
        level: 2,
        content: "Theme-led by design",
      },
      {
        type: "paragraph",
        content:
          "Ra & Ra is built around reusable collections rather than one permanent category. A collection can begin with pets, travel, coffee, music or another community, while the wider brand remains consistent.",
      },
    ],
    right: [
      {
        type: "heading",
        level: 2,
        content: "Quiet enough to feel personal",
      },
      {
        type: "paragraph",
        content:
          "Minimal artwork keeps the expression considered rather than novelty-led. It allows the person wearing the piece to recognize the story without asking the design to explain everything at once.",
      },
    ],
  },
  {
    type: "image",
    image: collectionImage,
    caption:
      "Development campaign imagery for the first collection. Final product specifications are not represented here.",
  },
  {
    type: "heading",
    level: 2,
    content: "The first story",
  },
  {
    type: "paragraph",
    content:
      "Dogs & Their Humans explores companionship through familiar glances, daily walks, waiting at the door and the small routines that quietly shape a home. The designs translate those moments into restrained illustrations rather than loud pet merchandise.",
  },
  {
    type: "callout",
    title: "A broader future",
    body:
      "Future collections may explore new communities and everyday passions. No launch dates or future inventory have been announced.",
    tone: "notice",
  },
] as const satisfies readonly EditorialBlock[];

export const editorialCta = {
  eyebrow: "Collection One",
  heading: "Ready to wear the story?",
  description:
    "Explore the development collection inspired by dogs and the people who love them.",
  label: "Explore the Collection",
  href: "/collections/pets",
} as const satisfies EditorialCtaConfig;

export const journalIndexHero = {
  eyebrow: "The Journal",
  title: "Ideas behind the artwork.",
  lead:
    "Development essays about meaningful design, quiet expression and the stories that shape each collection.",
  image: chosenArtworkImage,
  imagePosition: "50% 44%",
  developmentNotice:
    "Development journal content. No publication history or named authors are being claimed.",
} as const satisfies EditorialHeroConfig;

export const journalArticles = [
  {
    slug: "why-stories-belong-in-what-we-wear",
    title: "Why Stories Belong in What We Wear",
    excerpt:
      "A development essay about the difference between decoration and an image that carries personal meaning.",
    category: "Brand Notes",
    readingTime: "4 min read",
    heroImage: dogOwnerEditorialImage,
    featured: true,
    contentStatus: "development",
    relatedSlugs: [
      "behind-the-first-story",
      "the-quiet-language-of-minimal-artwork",
    ],
    content: [
      {
        type: "callout",
        title: "Development article",
        body:
          "This editorial fixture validates the journal template. It is not part of a claimed publication archive.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "Clothing can be practical and still carry an idea. A familiar image may recall a person, a place, a ritual or a companion without needing to announce the entire story to everyone who sees it.",
      },
      {
        type: "heading",
        level: 2,
        content: "Meaning before decoration",
      },
      {
        type: "paragraph",
        content:
          "For Ra & Ra, a collection starts by identifying what people already feel connected to. The artwork comes later. This order matters because it keeps the design grounded in a recognizable experience rather than a visual trend.",
      },
      {
        type: "quote",
        quote: "Wear what matters, without having to explain it loudly.",
      },
      {
        type: "heading",
        level: 2,
        content: "A framework for future stories",
      },
      {
        type: "list",
        items: [
          "Begin with a real theme or community.",
          "Find the moments that make the theme emotionally specific.",
          "Reduce the artwork until it remains expressive without becoming novelty-led.",
          "Keep practical product information close to the decision to purchase.",
        ],
      },
      {
        type: "image",
        image: dogOwnerEditorialImage,
        caption:
          "Campaign imagery used to establish the emotional tone of the first collection.",
      },
    ],
  },
  {
    slug: "behind-the-first-story",
    title: "Behind the First Story: Dogs & Their Humans",
    excerpt:
      "How quiet routines and familiar companionship became the emotional framework for the first collection.",
    category: "Collection Notes",
    readingTime: "5 min read",
    heroImage: dogOwnerHeroImage,
    contentStatus: "development",
    relatedSlugs: [
      "why-stories-belong-in-what-we-wear",
      "the-quiet-language-of-minimal-artwork",
    ],
    content: [
      {
        type: "callout",
        title: "Development article",
        body:
          "This copy is a collection-story fixture and does not represent a founder or customer account.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "The first Ra & Ra collection focuses on the relationship between dogs and their humans because it is made visible through ordinary routines: a walk at the same time each day, a glance toward the door, or a companion appearing in every room.",
      },
      {
        type: "heading",
        level: 2,
        content: "Choosing the everyday moments",
      },
      {
        type: "paragraph",
        content:
          "Rather than illustrate the whole relationship, each design isolates one recognizable detail. The result is intended to feel familiar to the wearer while remaining visually restrained for everyone else.",
      },
      {
        type: "image",
        image: collectionImage,
        caption:
          "Development product imagery showing the restrained illustration direction.",
      },
      {
        type: "quote",
        quote: "Chosen by paws. Worn by love.",
      },
    ],
  },
  {
    slug: "the-quiet-language-of-minimal-artwork",
    title: "The Quiet Language of Minimal Artwork",
    excerpt:
      "A development design note about reducing an illustration without removing the feeling behind it.",
    category: "Design Notes",
    heroImage: loyalArtworkImage,
    contentStatus: "development",
    relatedSlugs: [
      "why-stories-belong-in-what-we-wear",
      "behind-the-first-story",
    ],
    content: [
      {
        type: "callout",
        title: "Development article",
        body:
          "This design note exists to test optional metadata, imagery and related-content behavior.",
        tone: "notice",
      },
      {
        type: "paragraph",
        content:
          "Minimal artwork is not simply artwork with fewer lines. The remaining marks have to carry proportion, expression and enough character for the subject to feel recognizable.",
      },
      {
        type: "two-column",
        left: [
          {
            type: "heading",
            level: 2,
            content: "What remains",
          },
          {
            type: "paragraph",
            content:
              "A posture, silhouette or glance can communicate more than added decoration when it is chosen carefully.",
          },
        ],
        right: [
          {
            type: "heading",
            level: 2,
            content: "What is removed",
          },
          {
            type: "paragraph",
            content:
              "Unnecessary slogans, novelty details and visual noise are reduced so the wearer can bring their own meaning to the design.",
          },
        ],
      },
      {
        type: "image",
        image: loyalArtworkImage,
        caption: "Development artwork detail; final print production is unconfirmed.",
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
    "Confirmed information and clearly marked development guidance for shopping with Ra & Ra.",
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
        question: "Where will Ra & Ra ship?",
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
        question: "Will Ra & Ra always focus on dogs?",
        answer:
          "No. Dogs & Their Humans is the first collection concept. The wider brand is designed to support future theme-led collections without changing the storefront architecture.",
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
