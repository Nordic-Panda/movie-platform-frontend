import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

export function MovieCard({ movie, onEdit }: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-700">
      <div className="flex aspect-2/3 items-center justify-center bg-zinc-800">
        <span className="text-4xl font-black text-zinc-700">
          {movie.title.charAt(0)}
        </span>
      </div>

      <div className="p-4">
        <h2 className="truncate text-lg font-semibold text-white">
          {movie.title}
        </h2>

        <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
          <span>
            {movie.year} · {movie.durationMinutes} min
          </span>

          <span>{movie.language}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {movie.synopsis}
        </p>

        {movie.genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => onEdit(movie)}
          className="mt-4 w-full rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-yellow-500 hover:text-yellow-500"
        >
          Edit
        </button>
      </div>
    </article>
  );
}
