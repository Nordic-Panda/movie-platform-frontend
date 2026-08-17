export interface CreateMovieRequest {
  title: string;
  durationMinutes: number;
  genreIds: string[];
  language: string;
  synopsis?: string;
  budgetAmount?: number;
  currencyCode?: string;
}
