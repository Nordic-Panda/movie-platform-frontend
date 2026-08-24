import { useEffect, useState } from "react";
import { getMovieDetails } from "../movieApi";
import type { MovieDetails } from "../types/movieDetails";

export function useMovieDetails(id: string | undefined) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    /*     If we accept undefined due to value is from for example param
    it is not garanteed to have a value
    function useMovieDetails(id: string | undefined)
    then we had to assign ID here
    despite we checked id is not null */
    const movieId = id;

    async function fetchMovieDetails() {
      try {
        setStatus("loading");
        setError(null);

        const result = await getMovieDetails(movieId);

        setMovie(result);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load movie details",
        );
      }
    }

    fetchMovieDetails();
  }, [id]);

  return {
    movie,
    status,
    error,
  };
}
