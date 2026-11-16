import type { CommunityGridConfig } from "@/types/community";
import type { NewsletterSectionConfig } from "@/types/newsletter";
import type { ReviewSectionConfig } from "@/types/review";

const developmentNewsletterBase = {
  id: "development-newsletter-showcase",
  eyebrow: "Development Form",
  heading: "Stories Worth Wearing",
  description:
    "Test the email field, validation and status messages without storing an address or creating a subscription.",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  submitLabel: "Join the Story",
  pendingLabel: "Joining…",
  consentText:
    "This development form does not create a marketing subscription. Final consent wording, provider disclosure and double opt-in details are pending review.",
  privacyLabel: "View the privacy policy placeholder.",
  privacyHref: "/privacy",
} as const satisfies NewsletterSectionConfig;

export const developmentNewsletterShowcase = developmentNewsletterBase;

export const developmentReviewShowcase = {
  id: "development-review-showcase",
  eyebrow: "Development Fixtures",
  heading: "Review Layout States",
  description:
    "Interface-only examples for rating text, optional titles and different review lengths.",
  hideWhenEmpty: false,
} as const satisfies ReviewSectionConfig;

export const developmentCommunityShowcase = {
  id: "development-community-showcase",
  eyebrow: "Development Campaign Fixtures",
  heading: "A Curated Visual Rhythm",
  description:
    "A static local-image grid used to validate cropping, captions and responsive layout without a social embed or customer-content claim.",
  itemLimit: 8,
  hideWhenEmpty: false,
  emptyMessage:
    "Approved campaign and community imagery will appear here when available.",
} as const satisfies CommunityGridConfig;
