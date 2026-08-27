import type { Currency } from "./types/currency";
import { apiFetch } from "../../services/apiClient";

export function getCurrencies(): Promise<Currency[]> {
  return apiFetch(`/currencies`, { authenticated: false });
}
