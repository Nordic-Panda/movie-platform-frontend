import type { Genre } from "./genre";

export interface Movie {
  id: string;
  title: string;
  durationMinutes: number;
  genres: Genre[];
  language: string;
  synopsis: string | null;
  budgetAmount: number | null;
  currency: string | null;
}
