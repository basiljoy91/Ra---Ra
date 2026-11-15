import type { ProductImage, ProductStory } from "@/lib/commerce";

export const BEYOND_COLLECTION_HANDLE = "beyond";
export const BEYOND_GARMENT_TYPE = "Boxy Oversized Unisex Tee";
export const BEYOND_PRODUCT_HANDLES = [
  "beyond-time",
  "beyond-fear",
  "beyond-reality",
  "beyond-limits",
] as const;

export type BeyondProductHandle = (typeof BEYOND_PRODUCT_HANDLES)[number];

export const beyondCollectionPhilosophy = [
  "Not everything that shapes us can be seen.",
  "There are words we spent years finding the courage to say. Old ideas of ourselves that no longer fit. People we came to understand differently. Ordinary moments that stayed with us long after they passed.",
  "These experiences rarely announce themselves. Yet they become part of who we are.",
  "BEYOND is a collection built around four of them: Time, Fear, Reality and Limits.",
  "Each design translates an experience into a visual language of lines, forms, light and space.",
  "The artwork is intentional. The interpretation is personal.",
  "You don't have to explain what it means to you. You don't even have to see it the way we do.",
  "We create the design. You give it meaning.",
] as const;

export interface BeyondDesignContent {
  handle: BeyondProductHandle;
  title: string;
  number: string;
  corePhilosophy: string;
  collectionStoryHeading: string;
  collectionStoryParagraphs: readonly string[];
  productStoryParagraphs: readonly string[];
  signatureStatement: string;
  shortDescription: string;
  artworkDescription: string;
  images: readonly ProductImage[];
  hero: {
    desktop: ProductImage;
    mobile: ProductImage;
  };
}

const image = (
  url: string,
  alt: string,
  width: number,
  height: number,
): ProductImage => ({ url, alt, width, height });

export const beyondDesigns: readonly BeyondDesignContent[] = [
  {
    handle: "beyond-time",
    title: "Beyond Time",
    number: "01",
    corePhilosophy: "What remains",
    collectionStoryHeading: "WHAT REMAINS.",
    collectionStoryParagraphs: [
      "You probably didn't know it was a moment you would remember.",
      "There was nothing remarkable about the day.",
      "Maybe you were sitting around a table with people you love. Someone was telling a story you'd already heard. The conversation went nowhere in particular. Nobody was watching the clock.",
      "Years later, you might remember that evening more clearly than the celebrations you had planned for months.",
      "The sound of a familiar laugh. The light in the room. The feeling of having nowhere else you needed to be.",
      "Time is strange that way.",
      "We can measure every second, but we cannot measure what a second will mean to us.",
      "Some years become a blur. Some afternoons remain remarkably clear.",
      "And the people we were in those moments stay with us, even as our lives change.",
      "BEYOND TIME takes its inspiration from this quiet contradiction.",
      "The artwork brings together lunar forms and measured lines: a visual language of movement, change and passing time. Yet its meaning is not found in the measurements.",
      "It is found in everything they cannot capture.",
      "A person. A place. A version of yourself. An ordinary moment that became part of your story.",
      "Not every memory needs to be extraordinary.",
      "Some are precious simply because they were ours.",
    ],
    productStoryParagraphs: [
      "An ordinary moment. A lasting meaning.",
      "Some moments stay with us long after they have passed.",
      "An evening with friends. A familiar voice. A place that once felt like home.",
      "BEYOND TIME explores the difference between time as something we measure and time as something we experience.",
      "Two textured lunar forms, a measured line and continuing marks create a composition inspired by the passage of time. The regularity of those marks contrasts with the unpredictable ways memories remain.",
      "A personal reminder of the people, places and moments that become part of us.",
    ],
    signatureStatement: "The day was ordinary. What it left behind wasn't.",
    shortDescription: "An ordinary moment. A lasting meaning. A reflection on the people, places and experiences that remain with us.",
    artworkDescription: "Two textured lunar forms, a measured line, circular marks and a continuing dotted element.",
    images: [
      image("/products/beyond-time/male-front.png", "Male model wearing the black Beyond Time T-shirt from the front", 1086, 1448),
      image("/products/beyond-time/female-front.png", "Female model wearing the black Beyond Time T-shirt from the front", 1086, 1448),
      image("/products/beyond-time/male-back.png", "Male model showing the back artwork of the black Beyond Time T-shirt", 1086, 1448),
      image("/products/beyond-time/female-back.png", "Female model showing the back artwork of the black Beyond Time T-shirt", 1086, 1448),
      image("/products/beyond-time/female-seated-editorial.png", "Seated female model wearing the black Beyond Time T-shirt", 1086, 1448),
      image("/products/beyond-time/male-walking-editorial.png", "Male model walking in the black Beyond Time T-shirt", 1086, 1448),
      image("/products/beyond-time/studio-duo.png", "Two models wearing black Beyond Time T-shirts in a studio", 1199, 1312),
      image("/products/beyond-time/lifestyle-duo.png", "Two models wearing black Beyond Time T-shirts outdoors", 422, 565),
      image("/products/beyond-time/front-artwork-detail.png", "Close view of the Beyond Time chest artwork on black cotton", 1536, 1024),
      image("/products/beyond-time/back-artwork-detail.png", "Close view of the Beyond Time back artwork on black cotton", 1536, 1024),
      image("/products/beyond-time/collar-detail.png", "Close view of the rib crew neck on the black Beyond Time T-shirt", 979, 1024),
    ],
    hero: {
      desktop: image("/campaign/beyond-v2/desktop/beyond-time.png", "Two models in black RA & RA T-shirts sharing a moment at an outdoor cafe", 1672, 941),
      mobile: image("/campaign/beyond-v2/mobile/beyond-time.png", "Two models in black RA & RA T-shirts at an outdoor cafe", 1024, 1536),
    },
  },
  {
    handle: "beyond-fear",
    title: "Beyond Fear",
    number: "02",
    corePhilosophy: "The courage to be seen",
    collectionStoryHeading: "THE COURAGE TO BE SEEN.",
    collectionStoryParagraphs: [
      "There are things we find difficult to say.",
      "I was wrong. I miss you. I don't know what I'm doing. I need help.",
      "Four ordinary sentences. And sometimes, four of the hardest.",
      "We hesitate because we cannot control what comes after them.",
      "Someone might misunderstand. They might disagree. They might see a part of us we usually keep hidden.",
      "So we wait for a better moment. For more confidence. For the right words.",
      "But real life rarely gives us perfect conditions.",
      "Sometimes the moment arrives while we're still uncertain.",
      "A voice shakes. A sentence comes out differently than we rehearsed. A message is sent before we feel completely ready.",
      "Nothing dramatic has to happen afterward.",
      "There may be no applause, no sudden clarity, no remarkable change.",
      "Yet something honest has been shared.",
      "BEYOND FEAR is inspired by these quiet moments of vulnerability.",
      "Its wavering line moves through the darkness without pretending the path is clear. It is imperfect, exposed, and still present.",
      "The design doesn't celebrate fearlessness.",
      "It recognizes the humanity of being afraid of what comes next, while choosing not to hide everything that matters.",
      "Sometimes, allowing ourselves to be seen is enough.",
    ],
    productStoryParagraphs: [
      "For the moments that require quiet courage.",
      "There is a particular kind of courage in saying something honest without knowing how it will be received.",
      "BEYOND FEAR is inspired by those private moments.",
      "A narrow mark on the chest and a wavering vertical line on the back express uncertainty without trying to eliminate it. The irregular path is not a flaw in the composition. It is its meaning.",
      "For the conversation you finally had, the truth you shared, or the moment you let someone see a little more of who you are.",
      "Not every act of courage needs an audience.",
    ],
    signatureStatement: "You don't have to sound certain to speak honestly.",
    shortDescription: "For the moments that require quiet courage: honesty shared without knowing how it will be received.",
    artworkDescription: "A narrow chest mark and an imperfect, wavering vertical line across the back.",
    images: [
      image("/products/beyond-fear/male-front.png", "Male model wearing the black Beyond Fear T-shirt from the front", 1086, 1448),
      image("/products/beyond-fear/female-front.png", "Female model wearing the black Beyond Fear T-shirt from the front", 1086, 1448),
      image("/products/beyond-fear/male-back.png", "Male model showing the back artwork of the black Beyond Fear T-shirt", 1086, 1448),
      image("/products/beyond-fear/female-back.png", "Female model showing the back artwork of the black Beyond Fear T-shirt", 1086, 1448),
      image("/products/beyond-fear/male-portrait.png", "Portrait of a male model in the black Beyond Fear T-shirt", 1086, 1448),
      image("/products/beyond-fear/female-portrait.png", "Portrait of a female model in the black Beyond Fear T-shirt", 1086, 1448),
      image("/products/beyond-fear/male-back-editorial.png", "Male model showing the Beyond Fear back artwork in a concrete setting", 1086, 1448),
      image("/products/beyond-fear/front-artwork-detail.png", "Close view of the Beyond Fear chest artwork on black cotton", 1086, 1448),
      image("/products/beyond-fear/back-artwork-detail.png", "Close view of the wavering Beyond Fear back artwork", 1086, 1448),
      image("/products/beyond-fear/collar-detail.png", "Close view of the rib crew neck on the black Beyond Fear T-shirt", 1086, 1448),
    ],
    hero: {
      desktop: image("/campaign/beyond-v2/desktop/beyond-fear.png", "Two models wearing black RA & RA T-shirts in a metro station", 1672, 941),
      mobile: image("/campaign/beyond-v2/mobile/beyond-fear.png", "Two models walking through a rainy city in black RA & RA T-shirts", 1024, 1536),
    },
  },
  {
    handle: "beyond-reality",
    title: "Beyond Reality",
    number: "03",
    corePhilosophy: "The space for another truth",
    collectionStoryHeading: "THE PART WE HAVEN'T SEEN.",
    collectionStoryParagraphs: [
      "There's a person you've known for years.",
      "You know how they talk. What makes them laugh. How they behave when they're tired.",
      "You think you know them quite well.",
      "Then one evening, during an ordinary conversation, they tell you something about their life you've never heard before.",
      "A childhood experience. A difficult decision. A reason behind something you never understood.",
      "And suddenly, a familiar person becomes a little less familiar.",
      "Not because they've changed. Because you have discovered another part of them.",
      "We do this with more than people.",
      "We form impressions of places, cultures, ideas and even ourselves. We build a picture from what we have experienced, and sometimes forget how much remains outside its edges.",
      "BEYOND REALITY explores that space between what is visible and what is known.",
      "The eclipse-inspired artwork reveals only part of a circular form. Light and shadow share the same composition. What is hidden hasn't ceased to exist.",
      "It asks for no grand revelation. Only the willingness to look again.",
      "To listen a little longer. To be curious about what we don't yet understand. To leave room for another interpretation before deciding the first is complete.",
      "The world doesn't have to become different to become more interesting.",
      "Sometimes we simply discover how much of it we've yet to see.",
    ],
    productStoryParagraphs: [
      "There is always more to discover.",
      "An impression can feel complete long before we know the whole story.",
      "BEYOND REALITY is an exploration of the distance between seeing and understanding.",
      "An eclipse-like form on the chest and a larger circular composition on the back use partial visibility, light, shadow and geometric lines to represent the limits of a single perspective.",
      "The artwork leaves something unresolved, inviting a closer look.",
      "For those who value curiosity, welcome unfamiliar perspectives, and know that understanding often begins with listening.",
    ],
    signatureStatement: "What you see can be real without being the whole story.",
    shortDescription: "There is always more to discover. An exploration of the space between seeing and understanding.",
    artworkDescription: "Eclipse-like forms use partial visibility, light, shadow and geometric lines.",
    images: [
      image("/products/beyond-reality/male-front.png", "Male model wearing the black Beyond Reality T-shirt from the front", 1086, 1448),
      image("/products/beyond-reality/female-front.png", "Female model wearing the black Beyond Reality T-shirt from the front", 1086, 1448),
      image("/products/beyond-reality/male-back.png", "Male model showing the back artwork of the black Beyond Reality T-shirt", 1086, 1448),
      image("/products/beyond-reality/female-back.png", "Female model showing the back artwork of the black Beyond Reality T-shirt", 1086, 1448),
      image("/products/beyond-reality/female-seated-editorial.png", "Seated female model wearing the black Beyond Reality T-shirt", 1086, 1448),
      image("/products/beyond-reality/male-walking-editorial.png", "Male model walking in the black Beyond Reality T-shirt", 1086, 1448),
      image("/products/beyond-reality/editorial-duo.png", "Two models wearing black Beyond Reality T-shirts", 1086, 1448),
      image("/products/beyond-reality/front-artwork-detail.png", "Close view of the Beyond Reality chest artwork on black cotton", 1086, 1448),
      image("/products/beyond-reality/back-artwork-detail.png", "Close view of the circular Beyond Reality back artwork", 1086, 1448),
      image("/products/beyond-reality/collar-detail.png", "Close view of the rib crew neck on the black Beyond Reality T-shirt", 1086, 1448),
    ],
    hero: {
      desktop: image("/campaign/beyond-v2/desktop/beyond-reality.png", "Two models wearing black RA & RA T-shirts beside a misty lake", 1672, 941),
      mobile: image("/campaign/beyond-v2/mobile/beyond-reality.png", "Two models wearing black RA & RA T-shirts beside a lake", 1024, 1536),
    },
  },
  {
    handle: "beyond-limits",
    title: "Beyond Limits",
    number: "04",
    corePhilosophy: "The freedom to outgrow yourself",
    collectionStoryHeading: "MORE THAN WHO YOU WERE.",
    collectionStoryParagraphs: [
      "“I'm not that kind of person.”",
      "It's something we say without thinking.",
      "I'm not creative. I'm not good with people. I'm not someone who takes risks.",
      "Sometimes these descriptions come from experience. Sometimes they come from other people. Sometimes they're simply things we believed at a particular point in our lives.",
      "We repeat them until they start to feel permanent.",
      "But life has a quiet way of surprising us.",
      "You find yourself enjoying something you once dismissed. You become comfortable in a place where you used to feel out of place. You discover an interest, a skill, or an ambition that doesn't fit the person you thought you were.",
      "It doesn't mean your past was wrong. It means you are still changing.",
      "BEYOND LIMITS explores this freedom to become unfamiliar to ourselves.",
      "The design begins with a defined line. At its boundary, the line changes into separated marks.",
      "What once appeared fixed becomes open.",
      "There is no perfectly drawn road beyond that point, no guarantee that every direction is available.",
      "Only space for something you hadn't considered before.",
      "Because growing doesn't always mean becoming better, stronger, or more successful.",
      "Sometimes it simply means allowing yourself to be different.",
      "You don't have to remain the person you once believed you were.",
    ],
    productStoryParagraphs: [
      "You are allowed to change.",
      "We all develop ideas about who we are. Some guide us. Others become too small for the lives we're growing into.",
      "BEYOND LIMITS is about noticing when an old definition no longer fits.",
      "A solid line crosses a boundary and continues as separated dots. Its structure changes, leaving the direction open rather than prescribing a destination.",
      "The artwork represents self-discovery without the expectation of endless achievement.",
      "For anyone who has found something new in themselves, changed their mind, or begun to feel comfortable becoming someone they didn't expect.",
    ],
    signatureStatement: "An old definition doesn't deserve the final word.",
    shortDescription: "You are allowed to change. A reflection on the freedom to outgrow an old definition of yourself.",
    artworkDescription: "A solid line reaches a boundary and continues as separated marks and dots.",
    images: [
      image("/products/beyond-limits/male-front.png", "Male model wearing the black Beyond Limits T-shirt from the front", 1024, 1536),
      image("/products/beyond-limits/female-front.png", "Female model wearing the black Beyond Limits T-shirt from the front", 1024, 1536),
      image("/products/beyond-limits/male-back.png", "Male model showing the back artwork of the black Beyond Limits T-shirt", 1024, 1536),
      image("/products/beyond-limits/female-back.png", "Female model showing the back artwork of the black Beyond Limits T-shirt", 1024, 1536),
      image("/products/beyond-limits/male-infinity-back.png", "Male model showing the supplied Beyond Limits back artwork with its infinity symbol", 1024, 1536),
      image("/products/beyond-limits/female-concrete-editorial.png", "Female model wearing the black Beyond Limits T-shirt in a concrete setting", 1024, 1536),
      image("/products/beyond-limits/male-streetwear-editorial.png", "Male model wearing the black Beyond Limits T-shirt outdoors", 1024, 1536),
      image("/products/beyond-limits/male-portrait.png", "Portrait of a male model in the black Beyond Limits T-shirt", 1024, 1536),
      image("/products/beyond-limits/artwork-detail.png", "Close view of the Beyond Limits artwork on black cotton", 1536, 1024),
      image("/products/beyond-limits/garment-detail.png", "Close view of the black Beyond Limits T-shirt fabric and artwork", 1536, 1024),
      image("/products/beyond-limits/collar-detail.png", "Close view of the rib crew neck on the black Beyond Limits T-shirt", 1536, 1024),
      image("/products/beyond-limits/collar-artwork-detail.png", "Close view of the Beyond Limits collar and chest artwork", 1536, 1024),
    ],
    hero: {
      desktop: image("/campaign/beyond-v2/desktop/beyond-limits.png", "A group of models wearing black RA & RA T-shirts in a sunlit courtyard", 1672, 941),
      mobile: image("/campaign/beyond-v2/mobile/beyond-limits.png", "A group of models wearing black RA & RA T-shirts in a courtyard", 1024, 1536),
    },
  },
] as const;

export const beyondCollectionHero = {
  desktop: image("/campaign/beyond-v2/desktop/collection.png", "Models wearing black RA & RA BEYOND T-shirts in an urban landscape", 1672, 941),
  mobile: image("/campaign/beyond-v2/mobile/collection.png", "Models wearing black RA & RA BEYOND T-shirts in a mountain landscape", 1024, 1536),
} as const;

export function getBeyondDesign(handle: string): BeyondDesignContent | undefined {
  return beyondDesigns.find((design) => design.handle === handle);
}

export function createBeyondProductStory(design: BeyondDesignContent): ProductStory {
  return {
    eyebrow: `RA & RA / COLLECTION 01 / ${design.number}`,
    title: design.title,
    shortStory: design.shortDescription,
    corePhilosophy: design.corePhilosophy,
    productStoryParagraphs: design.productStoryParagraphs,
    collectionStoryHeading: design.collectionStoryHeading,
    collectionStoryParagraphs: design.collectionStoryParagraphs,
    signatureStatement: design.signatureStatement,
    quote: design.signatureStatement,
    artworkMeaning: design.artworkDescription,
    image: design.images[2]!,
  };
}
