interface ReviewRatingProps {
  rating: number;
}

export function ReviewRating({ rating }: ReviewRatingProps) {
  const normalizedRating = Math.min(5, Math.max(0, rating));

  return (
    <p
      aria-label={`${normalizedRating} out of 5 stars`}
      className="type-label text-accent"
    >
      Rating: {normalizedRating} out of 5
    </p>
  );
}
