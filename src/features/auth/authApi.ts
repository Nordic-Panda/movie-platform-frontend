import type { ApiResponse } from "../../shared/types/api";
import { ApiException } from "../../services/ApiException";
import type { LoginRequest } from "./types/LoginRequest";
import type { LoginResponse } from "./types/LoginResponse";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const result: ApiResponse<LoginResponse> = await response.json();

  if (!result.success) {
    throw new ApiException(
      result.error.code,
      result.error.message,
      result.error.details,
    );
  }

  return result.data;
}
