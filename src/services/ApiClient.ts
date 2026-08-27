import type { ApiResponse } from "../shared/types/api";
import { ApiException } from "./ApiException";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiFetchOptions extends RequestInit {
  authenticated?: boolean;
}

// This is sending cookie by default, works when we have HttpOnly cookie handling Accesstoken
// And it handles the repeated custom response code

// Generic here is the Api boundary, shows what are we expecting
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { authenticated = true, ...requestOptions } = options;

  const headers = new Headers(requestOptions.headers);

  // Only set Content-Type when the request actually has a body.
  if (requestOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,
    credentials: authenticated ? "include" : "omit",
    headers,
  });

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}
