import type { Genre } from "../../genres/types/genre";
import type { Language } from "../../languages/types/language";

export interface Movie {
  id: string;
  title: string;
  year: number;
  durationMinutes: number;
  genres: Genre[];
  language: Language;
  synopsis: string | null;
  budgetAmount: number | null;
  currency: string | null;
}
