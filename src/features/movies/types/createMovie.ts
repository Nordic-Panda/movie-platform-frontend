export interface CreateMovieRequest {
  title: string;
  year: number;
  durationMinutes: number;
  genreIds: string[];
  languageId: string;
  synopsis?: string;
  budgetAmount?: number;
  currencyCode?: string;
}
