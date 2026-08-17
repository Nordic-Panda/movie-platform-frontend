import type { ApiResponse } from "../types/api";
import type { Movie } from "../types/movie";

const API_URL = "http://localhost:5224/api";

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(`${API_URL}/movies`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const result: ApiResponse<Movie[]> = await response.json();

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
