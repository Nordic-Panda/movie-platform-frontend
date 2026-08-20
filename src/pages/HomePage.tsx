import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteMovie,
  fetchMovies,
  resetCreateStatus,
} from "../features/movies/movieSlice";
import { MovieGrid } from "../features/movies/components/MovieGrid";
import { MovieForm } from "../features/movies/components/MovieForm";
import { Pagination } from "../shared/components/Pagination";
import type { Movie } from "../features/movies/types/movie";
import { DeleteMovieModal } from "../features/movies/components/DeleteMovieModal";
import { ConfirmationModal } from "../shared/components/ConfirmationModal";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [movieToDelete, setMovieToDelete] = useState<Movie | undefined>();

  const [showCreateConfirmation, setShowCreateConfirmation] = useState(false);

  const moviesListRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef<number | null>(null);

  const movies = useAppSelector((state) => state.movies.items);
  const page = useAppSelector((state) => state.movies.page);
  const totalPages = useAppSelector((state) => state.movies.totalPages);

  const fetchStatus = useAppSelector((state) => state.movies.fetchStatus);

  const fetchError = useAppSelector((state) => state.movies.fetchError);

  const createStatus = useAppSelector((state) => state.movies.createStatus);

  const deleteStatus = useAppSelector((state) => state.movies.deleteStatus);

  const deleteError = useAppSelector((state) => state.movies.deleteError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (fetchStatus !== "succeeded") {
      return;
    }

    if (previousPageRef.current === null) {
      previousPageRef.current = page;
      return;
    }

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
  }, [page, fetchStatus]);

  useEffect(() => {
    if (createStatus !== "succeeded") {
      return;
    }

    dispatch(fetchMovies(page))
      .unwrap()
      .then(() => {
        setShowCreateConfirmation(true);

        dispatch(resetCreateStatus());
      })
      .catch(() => {
        // fetchMovies already stores the error in Redux.
      });
  }, [createStatus, dispatch, page]);

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

    const deletedMovieId = movieToDelete.id;

    try {
      await dispatch(deleteMovie(deletedMovieId)).unwrap();

      if (selectedMovie?.id === deletedMovieId) {
        setSelectedMovie(undefined);
      }

      setMovieToDelete(undefined);

      const targetPage = movies.length === 1 && page > 1 ? page - 1 : page;

      await dispatch(fetchMovies(targetPage)).unwrap();
    } catch {
      // Redux already stores the error.
    }
  }

  function closeCreateConfirmation() {
    setShowCreateConfirmation(false);
  }

  const isInitialLoading = fetchStatus === "loading" && movies.length === 0;

  const isRefreshing = fetchStatus === "loading" && movies.length > 0;

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

        {isInitialLoading && (
          <div className="py-10 text-center">
            <p className="text-zinc-400">Loading movies...</p>
          </div>
        )}

        {fetchStatus === "failed" && (
          <div className="rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to load movies</p>

            <p className="mt-1 text-sm text-red-300">{fetchError}</p>
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

        {isRefreshing && (
          <div className="mt-6 flex justify-center">
            <p className="text-sm text-zinc-500">Loading...</p>
          </div>
        )}

        {movies.length > 0 && (
          <div
            ref={moviesListRef}
            className={`mt-6 transition-opacity duration-300 ${
              isRefreshing ? "opacity-60" : "opacity-100"
            }`}
          >
            <MovieGrid
              movies={movies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
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

      {showCreateConfirmation && (
        <ConfirmationModal
          title="Movie Created"
          message="The movie was successfully added to your movie collection."
          confirmText="OK"
          onConfirm={closeCreateConfirmation}
        />
      )}
    </main>
  );
}
