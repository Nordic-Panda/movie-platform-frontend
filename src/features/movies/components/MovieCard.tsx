import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-zinc-600 hover:shadow-xl">
      <div className="aspect-2/3 overflow-hidden bg-zinc-800">
        <Link to={`/movies/${movie.id}`}>
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className="h-full w-full cursor-pointer object-cover transition-transform duration-300 ease-out hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl font-black text-zinc-700">
                {movie.title.charAt(0)}
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="p-4">
        <Link to={`/movies/${movie.id}`}>
          <h2 className="cursor-pointer truncate text-lg font-semibold text-white hover:text-yellow-500">
            {movie.title}
          </h2>
        </Link>

        <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
          <span>
            {movie.year} · {movie.durationMinutes} min
          </span>

          <span>{movie.language.name}</span>
        </div>

        <p className="mt-3 h-10 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {movie.synopsis}
        </p>

        {movie.genres.length > 0 ? (
          <div className="mt-3 flex h-14 flex-wrap content-start gap-2 overflow-hidden">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-3 h-14" />
        )}

        <div className="mt-3 h-5 text-sm text-zinc-400">
          {movie.budgetAmount !== null && (
            <>
              Budget: {movie.budgetAmount.toLocaleString()} {movie.currencyCode}
            </>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(movie)}
            className="flex-1 cursor-pointer rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(movie.id)}
            className="flex-1 cursor-pointer rounded-md border border-red-900 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-950/40 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
