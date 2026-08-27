export type AuthProvider = "Local" | "Google";

export interface LoginRequest {
  provider: AuthProvider;
  identifier?: string;
  password?: string;
  credential?: string;
}
