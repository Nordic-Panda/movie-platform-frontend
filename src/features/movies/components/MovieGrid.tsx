import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
        <p className="text-zinc-400">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
