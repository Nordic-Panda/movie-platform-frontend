import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMovies } from "../features/movies/movieSlice";
import { MovieGrid } from "../features/movies/components/MovieGrid";
import { MovieForm } from "../features/movies/components/MovieForm";
import { Pagination } from "../shared/components/Pagination";
import type { Movie } from "../features/movies/types/movie";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();

  const movies = useAppSelector((state) => state.movies.items);
  const page = useAppSelector((state) => state.movies.page);
  const totalPages = useAppSelector((state) => state.movies.totalPages);

  const status = useAppSelector((state) => state.movies.status);

  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  function handlePageChange(newPage: number) {
    dispatch(fetchMovies(newPage));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-yellow-500">
            Discover · Watch · Enjoy
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Discover Movies
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Explore our collection of movies and discover something worth
            watching.
          </p>
        </div>

        {status === "loading" && (
          <p className="text-zinc-400">Loading movies...</p>
        )}

        {status === "failed" && (
          <div className="rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to load movies</p>

            <p className="mt-1 text-sm text-red-300">{error}</p>
          </div>
        )}

        <MovieForm
          movie={selectedMovie}
          onCancelEdit={() => setSelectedMovie(undefined)}
        />

        {status === "succeeded" && (
          <MovieGrid movies={movies} onEdit={setSelectedMovie} />
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
