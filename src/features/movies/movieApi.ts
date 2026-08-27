import { apiFetch } from "../../services/apiClient";
import type { CreateMovieRequest } from "./types/createMovie";
import type { Movie } from "./types/movie";
import type { MovieDetails } from "./types/movieDetails";
import type { PagedResult } from "../../shared/types/pageResult";

export function getMovies(
  page: number = 1,
  pageSize: number = 20,
): Promise<PagedResult<Movie>> {
  return apiFetch(`/movies?page=${page}&pageSize=${pageSize}`, {
    authenticated: false,
  });
}

export function createMovie(request: CreateMovieRequest): Promise<Movie> {
  return apiFetch<Movie>("/movies", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function updateMovie(
  id: string,
  request: CreateMovieRequest,
): Promise<Movie> {
  return apiFetch<Movie>(`/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(request),
  });
}

export function deleteMovie(id: string): Promise<void> {
  return apiFetch<void>(`/movies/${id}`, {
    method: "DELETE",
  });
}

export function getMovieDetails(id: string): Promise<MovieDetails> {
  return apiFetch<MovieDetails>(`/movies/${id}/details`, {
    authenticated: false,
  });
}
