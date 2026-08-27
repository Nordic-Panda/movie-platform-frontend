import type { Genre } from "./types/genre";
import { apiFetch } from "../../services/apiClient";

export function getGenres(): Promise<Genre[]> {
  return apiFetch(`/genres`, { authenticated: false });
}
