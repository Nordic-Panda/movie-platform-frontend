import type { ApiResponse } from "../../types/api";
import { ApiException } from "../../services/ApiException";
import type { Movie } from "./types/movie";
import type { CreateMovieRequest } from "./types/createMovie";
import type { PagedResult } from "../../types/pagination";

const API_URL = "http://localhost:5224/api";

export async function getMovies(page: number = 1): Promise<PagedResult<Movie>> {
  const response = await fetch(`${API_URL}/movies?page=${page}`);

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
