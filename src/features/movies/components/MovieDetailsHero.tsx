import type { MovieDetails } from "../types/movieDetails";

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export function MovieDetailsHero({ movie }: MovieDetailsHeroProps) {
  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <div className="w-full shrink-0 md:w-72">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            className="aspect-2/3 w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-2/3 items-center justify-center rounded-lg bg-zinc-800">
            <span className="text-6xl font-black text-zinc-700">
              {movie.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-4xl font-bold text-white">{movie.title}</h1>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
          <span>{movie.year}</span>
          <span>{movie.durationMinutes} min</span>
          <span>{movie.language.name}</span>
        </div>

        {movie.synopsis && (
          <p className="mt-6 max-w-3xl leading-relaxed text-zinc-300">
            {movie.synopsis}
          </p>
        )}

        {movie.budget && movie.budget.amount !== null && (
          <p className="mt-6 text-sm text-zinc-400">
            Budget:{" "}
            <span className="text-zinc-200">
              {movie.budget.amount.toLocaleString()} {movie.budget.currencyCode}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
