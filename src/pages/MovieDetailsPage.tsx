import { useParams } from "react-router-dom";
import { useMovieDetails } from "../features/movies/hooks/useMovieDetails";
import { MovieDetailsHero } from "../features/movies/components/MovieDetailsHero";
import { MovieCast } from "../features/movies/components/MovieCast";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";
import { MovieReviews } from "../features/movies/components/MovieReviews";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { movie, status, error } = useMovieDetails(id);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="flex flex-col items-center justify-center py-24">
          <LoadingSpinner size="lg" />

          <p className="mt-4 text-zinc-400">Loading movie...</p>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-red-400">{error ?? "Failed to load movie"}</p>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-zinc-400">Movie not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <MovieDetailsHero movie={movie} />

        <MovieCast cast={movie.cast} />

        <MovieReviews reviews={movie.reviews} />
      </section>
    </main>
  );
}
