import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-64 items-center justify-center bg-zinc-800">
        <span className="text-5xl font-bold text-zinc-600">
          {movie.title.charAt(0)}
        </span>
      </div>

      <div className="p-5">
        <h2 className="truncate text-xl font-semibold text-white">
          {movie.title}
        </h2>

        <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
          <span>{movie.durationMinutes} min</span>
          <span>•</span>
          <span>{movie.language}</span>
        </div>

        {movie.genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {movie.synopsis && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
            {movie.synopsis}
          </p>
        )}
      </div>
    </article>
  );
}
