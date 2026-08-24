import type { ApiResponse } from "../../shared/types/api";
import { ApiException } from "../../services/ApiException";
import type { Movie } from "./types/movie";
import type { CreateMovieRequest } from "./types/createMovie";
import type { PagedResult } from "../../shared/types/pageResult";
import type { MovieDetails } from "./types/movieDetails";

const API_URL = "https://localhost:7294/api";

export async function getMovies(
  page: number = 1,
  pageSize: number = 20,
): Promise<PagedResult<Movie>> {
  const response = await fetch(
    `${API_URL}/movies?page=${page}&pageSize=${pageSize}`,
  );

  const result: ApiResponse<PagedResult<Movie>> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}

export async function createMovie(request: CreateMovieRequest): Promise<Movie> {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const result: ApiResponse<Movie> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}

export async function updateMovie(
  id: string,
  request: CreateMovieRequest,
): Promise<Movie> {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const result: ApiResponse<Movie> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}

export async function deleteMovie(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  });

  const result: ApiResponse<string> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(`${API_URL}/movies/${id}/details`);

  const result: ApiResponse<MovieDetails> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}
