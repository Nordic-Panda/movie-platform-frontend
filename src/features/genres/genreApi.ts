import type { ApiResponse } from "../../shared/types/api";
import type { Genre } from "./types/genre";

const API_URL = "https://localhost:7294/api";

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${API_URL}/genres`);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const result: ApiResponse<Genre[]> = await response.json();

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
