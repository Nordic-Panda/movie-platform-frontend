import type { ApiResponse } from "../../shared/types/api";
import { ApiException } from "../../services/ApiException";
import type { Currency } from "./types/currency";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch(`${API_URL}/currencies`);

  const result: ApiResponse<Currency[]> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}
