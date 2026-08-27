import type { Language } from "./types/language";
import { apiFetch } from "../../services/apiClient";

export function getLanguages(): Promise<Language[]> {
  return apiFetch(`/languages`, { authenticated: false });
}
