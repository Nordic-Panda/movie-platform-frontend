import type { User } from "./User";
import type { ExternalRegistration } from "./ExternalRegistration";

export interface LoginResponse {
  requiresRegistration: boolean;
  expiresInMinutes: number | null;
  user: User | null;
  externalRegistration: ExternalRegistration | null;
}
