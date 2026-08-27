import type { LoginRequest } from "./types/LoginRequest";
import type { LoginResponse } from "./types/LoginResponse";
import { apiFetch } from "../../services/apiClient";

export function login(request: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
