import type { Review } from "@/types/review";

export const DEVELOPMENT_REVIEW_NOTICE =
  "Development fixtures only. These entries are not customer feedback and must not appear on the production homepage.";

export const developmentReviews = [
  {
    id: "development-review-short",
    productId: "development-product-chosen-companion",
    customerDisplayName: "Development Fixture A",
    rating: 5,
    title: "Short review layout fixture",
    content:
      "This placeholder validates a concise review card. It is not customer feedback.",
    contentStatus: "development",
  },
  {
    id: "development-review-long",
    productId: "development-product-peeking-friend",
    customerDisplayName: "Development Fixture B",
    rating: 4,
    title: "Long review layout fixture",
    content:
      "This longer placeholder checks readable line length, natural card height and responsive wrapping. It contains no genuine customer statement, purchase claim or production endorsement.",
    contentStatus: "development",
  },
  {
    id: "development-review-no-title",
    customerDisplayName: "Development Fixture C",
    rating: 3,
    content:
      "This title-free placeholder validates optional review fields. It is not customer feedback.",
    contentStatus: "development",
  },
] as const satisfies readonly Review[];
