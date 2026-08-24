import type { MovieReview } from "../types/movieDetails";
import { formatRelativeTime } from "../../../shared/utils/formatRelativeTime";

interface MovieReviewsProps {
  reviews: MovieReview[];
}

export function MovieReviews({ reviews }: MovieReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>

        <p className="mt-4 text-zinc-500">No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white">Reviews</h2>

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

interface ReviewCardProps {
  review: MovieReview;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-lg bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{review.displayName}</h3>

          {review.username && (
            <p className="mt-1 text-sm text-zinc-500">@{review.username}</p>
          )}

          <p className="mt-1 text-xs text-zinc-600">
            {formatRelativeTime(review.createdAt)}
          </p>
        </div>

        <Rating rating={review.rating} />
      </div>

      <p className="mt-4 text-zinc-300">{review.comment}</p>
    </article>
  );
}

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <div
      className="flex shrink-0 gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;

        return (
          <span
            key={starNumber}
            className={
              starNumber <= rating ? "text-yellow-500" : "text-zinc-700"
            }
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
