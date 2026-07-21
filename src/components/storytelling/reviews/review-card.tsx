import { ReviewRating } from "@/components/storytelling/reviews/review-rating";
import type { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex h-full flex-col border-t border-border pt-6">
      <ReviewRating rating={review.rating} />
      <blockquote className="mt-6 flex flex-1 flex-col">
        {review.title ? (
          <p className="font-serif text-2xl font-semibold leading-tight text-foreground">
            {review.title}
          </p>
        ) : null}
        <p className="type-body mt-4 text-foreground-muted">
          “{review.content}”
        </p>
        <footer className="mt-8 border-t border-border pt-4">
          <cite className="type-small not-italic font-semibold text-foreground">
            {review.customerDisplayName}
          </cite>
          {review.verifiedPurchase ? (
            <p className="type-caption mt-1 text-success">
              Verified Purchase
            </p>
          ) : null}
          {review.publishedAt ? (
            <p className="type-caption mt-1 text-foreground-muted">
              <time dateTime={review.publishedAt}>{review.publishedAt}</time>
            </p>
          ) : null}
        </footer>
      </blockquote>
    </article>
  );
}
