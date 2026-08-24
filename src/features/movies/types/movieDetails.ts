import type { Language } from "../../languages/types/language";

export interface MovieCast {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  characterName: string;
  isMainCast: boolean;
}

export interface MovieReview {
  id: string;
  movieId: string;
  comment: string;
  rating: number;
  username: string;
  displayName: string;
}

export interface MovieDetails {
  id: string;
  title: string;
  year: number;
  durationMinutes: number;
  synopsis: string | null;
  budget: {
    amount: number | null;
    currencyName: string | null;
    currencyCode: string | null;
  } | null;
  language: Language;
  cast: MovieCast[];
  reviews: MovieReview[];
  posterUrl: string | null;
}
