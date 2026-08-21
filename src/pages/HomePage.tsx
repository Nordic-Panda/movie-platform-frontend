import { useState } from "react";
import { MovieGrid } from "../features/movies/components/MovieGrid";
import { MovieForm } from "../features/movies/components/MovieForm";
import { DeleteMovieModal } from "../features/movies/components/DeleteMovieModal";
import { useMoviePage } from "../features/movies/hooks/useMoviePage";
import { Pagination } from "../shared/components/Pagination";
import { ConfirmationModal } from "../shared/components/ConfirmationModal";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";
import { LoadingOverlay } from "../shared/components/LoadingOverlay";
import type { Movie } from "../features/movies/types/movie";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [movieToDelete, setMovieToDelete] = useState<Movie | undefined>();

  // Get data from custom hook
  const {
    movies,
    page,
    totalPages,

    fetchStatus,
    fetchError,

    createStatus,
    createError,

    updateStatus,
    updateError,

    deleteStatus,
    deleteError,

    showCreateConfirmation,
    showUpdateConfirmation,

    handlePageChange,
    handleDelete,

    closeCreateConfirmation,
    closeUpdateConfirmation,
  } = useMoviePage();

  function handleEdit(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleMovieDelete(id: string) {
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
      await handleDelete(movieToDelete.id);

      // If the deleted movie was being edited,
      // stop editing it.
      if (selectedMovie?.id === movieToDelete.id) {
        setSelectedMovie(undefined);
      }

      // Only close the modal after delete has been handled.
      setMovieToDelete(undefined);
    } catch {
      // Redux already contains the error.
    }
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

        {/* Initial loading */}
        {isInitialLoading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Fetch error */}
        {fetchStatus === "failed" && fetchError && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to load movies</p>

            <p className="mt-1 text-sm text-red-300">{fetchError}</p>
          </div>
        )}

        {/* Create error */}
        {createStatus === "failed" && createError && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to create movie</p>

            <p className="mt-1 text-sm text-red-300">{createError}</p>
          </div>
        )}

        {/* Update error */}
        {updateStatus === "failed" && updateError && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to update movie</p>

            <p className="mt-1 text-sm text-red-300">{updateError}</p>
          </div>
        )}

        {/* Delete error */}
        {deleteStatus === "failed" && deleteError && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-400">Failed to delete movie</p>

            <p className="mt-1 text-sm text-red-300">{deleteError}</p>
          </div>
        )}

        {/* Create / Update form */}
        <MovieForm
          movie={selectedMovie}
          onCancelEdit={() => setSelectedMovie(undefined)}
        />

        {/* Movie list */}
        {movies.length > 0 && (
          <div className="relative mt-6">
            <div
              className={`transition-opacity duration-300 ${
                isRefreshing ? "opacity-60" : "opacity-100"
              }`}
            >
              <MovieGrid
                movies={movies}
                onEdit={handleEdit}
                onDelete={handleMovieDelete}
              />
            </div>

            {isRefreshing && <LoadingOverlay />}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* Delete confirmation */}
      {movieToDelete && (
        <DeleteMovieModal
          movieTitle={movieToDelete.title}
          onCancel={() => setMovieToDelete(undefined)}
          onConfirm={confirmDelete}
        />
      )}

      {/* Create confirmation */}
      {showCreateConfirmation && (
        <ConfirmationModal
          title="Movie Created"
          message="The movie was successfully added to your movie collection."
          confirmText="OK"
          onConfirm={closeCreateConfirmation}
        />
      )}

      {/* Update confirmation */}
      {showUpdateConfirmation && (
        <ConfirmationModal
          title="Movie Updated"
          message="The movie was successfully updated."
          confirmText="OK"
          onConfirm={closeUpdateConfirmation}
        />
      )}
    </main>
  );
}
