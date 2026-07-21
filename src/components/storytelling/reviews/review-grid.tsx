import { ReviewCard } from "@/components/storytelling/reviews/review-card";
import type { Review } from "@/types/review";

interface ReviewGridProps {
  reviews: readonly Review[];
}

export function ReviewGrid({ reviews }: ReviewGridProps) {
  return (
    <ul className="mt-10 grid gap-x-8 gap-y-12 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
