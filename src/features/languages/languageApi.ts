import type { ApiResponse } from "../../shared/types/api";
import { ApiException } from "../../services/ApiException";
import type { Language } from "./types/language";

const API_URL = import.meta.env.VITE_API_URL;

export async function getLanguages(): Promise<Language[]> {
  const response = await fetch(`${API_URL}/languages`);

  const result: ApiResponse<Language[]> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}
