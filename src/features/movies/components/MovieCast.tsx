import type { MovieCast as MovieCastType } from "../types/movieDetails";

interface MovieCastProps {
  cast: MovieCastType[];
}

export function MovieCast({ cast }: MovieCastProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white">Cast</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cast.map((actor) => (
          <CastCard key={actor.id} actor={actor} />
        ))}
      </div>
    </section>
  );
}

interface CastCardProps {
  actor: MovieCastType;
}

function CastCard({ actor }: CastCardProps) {
  return (
    <article className="rounded-lg bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">
            {actor.firstName} {actor.lastName}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">as {actor.characterName}</p>
        </div>

        {actor.isMainCast && (
          <span className="shrink-0 rounded-full bg-zinc-700 px-2 py-1 text-xs text-zinc-200">
            Main Cast
          </span>
        )}
      </div>

      <p className="mt-3 text-xs text-zinc-500">Born {actor.birthYear}</p>
    </article>
  );
}
