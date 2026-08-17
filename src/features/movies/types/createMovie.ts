export interface CreateMovieRequest {
  title: string;
  year: number;
  durationMinutes: number;
  genreIds: string[];
  language: string;
  synopsis?: string;
  budgetAmount?: number;
  currencyCode?: string;
}
