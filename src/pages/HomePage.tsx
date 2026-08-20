import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteMovie, fetchMovies } from "../features/movies/movieSlice";
import { MovieGrid } from "../features/movies/components/MovieGrid";
import { MovieForm } from "../features/movies/components/MovieForm";
import { Pagination } from "../shared/components/Pagination";
import type { Movie } from "../features/movies/types/movie";
import { DeleteMovieModal } from "../features/movies/components/DeleteMovieModal";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [movieToDelete, setMovieToDelete] = useState<Movie | undefined>();

  const moviesListRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef<number | null>(null);

  const movies = useAppSelector((state) => state.movies.items);
  const page = useAppSelector((state) => state.movies.page);
  const totalPages = useAppSelector((state) => state.movies.totalPages);

  const status = useAppSelector((state) => state.movies.fetchStatus);
  const error = useAppSelector((state) => state.movies.fetchError);

  const deleteStatus = useAppSelector((state) => state.movies.deleteStatus);
  const deleteError = useAppSelector((state) => state.movies.deleteError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (status !== "succeeded") {
      return;
    }

    // First successful load.
    // Do not scroll when the page is initially loaded or refreshed.
    if (previousPageRef.current === null) {
      previousPageRef.current = page;
      return;
    }

    // Page has not actually changed.
    if (previousPageRef.current === page) {
      return;
    }

    previousPageRef.current = page;

    const element = moviesListRef.current;

    if (!element) {
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 32;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [page, status]);

  function handlePageChange(newPage: number) {
    dispatch(fetchMovies(newPage));
  }

  function handleEdit(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleDelete(id: string) {
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
      return;
    }

    setMovieToDelete(movie);
  }

  async function confirmDelete() {
    if (!movieToDelete) {
      return;
    }

    try {
      await dispatch(deleteMovie(movieToDelete.id)).unwrap();

      if (selectedMovie?.id === movieToDelete.id) {
        setSelectedMovie(undefined);
      }

      setMovieToDelete(undefined);
    } catch {
      // Redux already stores the error.
    }
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

        {deleteStatus === "failed" && deleteError && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to delete movie</p>

            <p className="mt-1 text-sm text-red-300">{deleteError}</p>
          </div>
        )}

        <MovieForm
          movie={selectedMovie}
          onCancelEdit={() => setSelectedMovie(undefined)}
        />

        <div ref={moviesListRef} className="scroll-mt-8">
          {status === "succeeded" && (
            <MovieGrid
              movies={movies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {movieToDelete && (
        <DeleteMovieModal
          movieTitle={movieToDelete.title}
          onCancel={() => setMovieToDelete(undefined)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}
