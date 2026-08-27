export type AuthProvider = "Local" | "Google";

// type is better for it's just describing API contract
export interface LoginRequest {
  provider: AuthProvider;
  identifier?: string;
  password?: string;
  credential?: string;
}
