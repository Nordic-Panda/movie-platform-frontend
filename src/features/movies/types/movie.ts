import type { Genre } from "../../genres/types/genre";

export interface Movie {
  id: string;
  title: string;
  year: number;
  durationMinutes: number;
  genres: Genre[];
  language: string;
  synopsis: string | null;
  budgetAmount: number | null;
  currency: string | null;
}
