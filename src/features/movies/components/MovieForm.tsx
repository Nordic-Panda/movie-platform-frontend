import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createMovie, updateMovie } from "../movieSlice";
import { FieldError } from "./FieldError";
import { RequiredLabel } from "./RequiredLabel";
import { fetchGenres } from "../../genres/genreSlice";
import type { Movie } from "../types/movie";
import { fetchLanguages } from "../../languages/languageSlice";

interface MovieFormProps {
  movie?: Movie;
  onCancelEdit?: () => void;
}

export function MovieForm({ movie, onCancelEdit }: MovieFormProps) {
  const MAX_BUDGET = 9_999_999_999_999_999.99;
  const DEFAULT_CURRENCYCODE = "USD";

  const [title, setTitle] = useState(movie?.title ?? "");

  const [year, setYear] = useState(
    String(movie?.year ?? new Date().getFullYear()),
  );

  const [durationMinutes, setDurationMinutes] = useState(
    movie ? String(movie.durationMinutes) : "",
  );

  const [languageId, setLanguageId] = useState(movie?.language?.id ?? "");

  const [synopsis, setSynopsis] = useState(movie?.synopsis ?? "");

  const [budgetAmount, setBudgetAmount] = useState(
    movie?.budgetAmount != null ? String(movie.budgetAmount) : "",
  );

  const [currencyCode, setCurrencyCode] = useState(
    movie?.currencyCode ?? DEFAULT_CURRENCYCODE,
  );

  const [posterUrl, setPosterUrl] = useState(movie?.posterUrl ?? "");

  const [genreIds, setGenreIds] = useState<string[]>(
    movie?.genres.map((genre) => genre.id) ?? [],
  );

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const dispatch = useAppDispatch();

  const genres = useAppSelector((state) => state.genres.items);
  const genreStatus = useAppSelector((state) => state.genres.status);

  const languages = useAppSelector((state) => state.languages.items);
  const languageStatus = useAppSelector((state) => state.languages.fetchStatus);

  const createStatus = useAppSelector((state) => state.movies.createStatus);

  const createError = useAppSelector((state) => state.movies.createError);

  const createErrorDetails = useAppSelector(
    (state) => state.movies.createErrorDetails,
  );

  const updateStatus = useAppSelector((state) => state.movies.updateStatus);

  const updateError = useAppSelector((state) => state.movies.updateError);

  const updateErrorDetails = useAppSelector(
    (state) => state.movies.updateErrorDetails,
  );

  const isSubmitting = createStatus === "loading" || updateStatus === "loading";

  const submitError = movie ? updateError : createError;

  const submitErrorDetails = movie ? updateErrorDetails : createErrorDetails;

  useEffect(() => {
    if (genreStatus === "idle") {
      dispatch(fetchGenres());
    }
  }, [dispatch, genreStatus]);

  useEffect(() => {
    if (languageStatus === "idle") {
      dispatch(fetchLanguages());
    }
  }, [dispatch, languageStatus]);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setYear(String(movie.year));
      setDurationMinutes(String(movie.durationMinutes));
      setLanguageId(movie.language.id);
      setSynopsis(movie.synopsis ?? "");

      setBudgetAmount(
        movie.budgetAmount != null ? String(movie.budgetAmount) : "",
      );

      setCurrencyCode(movie.currencyCode ?? "USD");

      setPosterUrl(movie.posterUrl ?? "");

      setGenreIds(movie.genres.map((genre) => genre.id));
    } else {
      setTitle("");
      setYear(String(new Date().getFullYear()));
      setDurationMinutes("");
      setLanguageId("");
      setSynopsis("");
      setBudgetAmount("");
      setCurrencyCode("USD");
      setPosterUrl("");
      setGenreIds([]);
      setValidationErrors({});
    }
  }, [movie]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: Record<string, string> = {};

    if (!title.trim()) {
      errors.Title = "Title is required.";
    }

    if (!year) {
      errors.Year = "Year is required.";
    } else {
      const movieYear = Number(year);
      const currentYear = new Date().getFullYear();

      if (!Number.isInteger(movieYear)) {
        errors.Year = "Year must be a whole number.";
      } else if (movieYear < 1888 || movieYear > currentYear) {
        errors.Year = `Year must be between 1888 and ${currentYear}.`;
      }
    }

    if (!durationMinutes) {
      errors.DurationMinutes = "Duration is required.";
    } else if (Number(durationMinutes) < 1) {
      errors.DurationMinutes = "Duration must be at least 1 minute.";
    }

    if (!languageId) {
      errors.LanguageId = "Language is required.";
    }

    if (genreIds.length === 0) {
      errors.GenreIds = "At least one genre is required.";
    }

    if (budgetAmount) {
      const budget = Number(budgetAmount);

      if (!Number.isFinite(budget)) {
        errors.BudgetAmount = "Budget is too large.";
      } else if (budget < 0) {
        errors.BudgetAmount = "Budget cannot be negative.";
      } else if (budget > MAX_BUDGET) {
        errors.BudgetAmount = "Budget is too large.";
      }

      if (!currencyCode) {
        errors.CurrencyCode = "Currency is required.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      const data = {
        title: title.trim(),
        year: Number(year),
        durationMinutes: Number(durationMinutes),
        genreIds,
        languageId,
        synopsis: synopsis.trim() || undefined,
        budgetAmount: budgetAmount ? Number(budgetAmount) : undefined,
        currencyCode: budgetAmount ? currencyCode : undefined,
        posterUrl: posterUrl.trim() || undefined,
      };

      if (movie) {
        await dispatch(
          updateMovie({
            id: movie.id,
            request: data,
          }),
        ).unwrap();

        onCancelEdit?.();
      } else {
        await dispatch(createMovie(data)).unwrap();

        setTitle("");
        setYear(String(new Date().getFullYear()));
        setDurationMinutes("");
        setGenreIds([]);
        setLanguageId("");
        setSynopsis("");
        setBudgetAmount("");
        setCurrencyCode("USD");
        setPosterUrl("");
      }

      setValidationErrors({});
    } catch {
      // Redux already stores the error.
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
    >
      {submitError && (
        <div className="rounded-md border border-red-900 bg-red-950/40 p-3 text-sm text-red-400">
          {submitError}
        </div>
      )}

      <h2 className="text-xl font-semibold text-white">
        {movie ? "Edit Movie" : "Add Movie"}
      </h2>

      <div className="mt-6 space-y-5">
        {/* Title */}
        <div>
          <RequiredLabel htmlFor="title" required>
            Title
          </RequiredLabel>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />

          <FieldError
            messages={validationErrors.Title ?? submitErrorDetails.Title}
          />
        </div>

        {/* Year */}
        <div>
          <RequiredLabel htmlFor="year" required>
            Year
          </RequiredLabel>

          <input
            id="year"
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />

          <FieldError
            messages={validationErrors.Year ?? submitErrorDetails.Year}
          />
        </div>

        {/* Duration */}
        <div>
          <RequiredLabel htmlFor="duration" required>
            Duration
          </RequiredLabel>

          <input
            id="duration"
            type="number"
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />

          <FieldError
            messages={
              validationErrors.DurationMinutes ??
              submitErrorDetails.DurationMinutes
            }
          />
        </div>

        {/* Genres */}
        <div>
          <RequiredLabel htmlFor="genres" required>
            Genres
          </RequiredLabel>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isSelected = genreIds.includes(genre.id);

              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => {
                    setGenreIds((current) =>
                      isSelected
                        ? current.filter((id) => id !== genre.id)
                        : [...current, genre.id],
                    );
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>

          <FieldError
            messages={validationErrors.GenreIds ?? submitErrorDetails.GenreIds}
          />
        </div>

        {/* Language */}
        <div>
          <RequiredLabel htmlFor="language" required>
            Language
          </RequiredLabel>

          <select
            id="language"
            value={languageId}
            onChange={(event) => setLanguageId(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select language</option>

            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>

          <FieldError
            messages={
              validationErrors.LanguageId ?? submitErrorDetails.LanguageId
            }
          />
        </div>

        {/* Synopsis */}
        <div>
          <label
            htmlFor="synopsis"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Synopsis
          </label>

          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(event) => setSynopsis(event.target.value)}
            rows={4}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />
        </div>

        {/* Budget + Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Budget
            </label>

            <input
              id="budget"
              type="number"
              value={budgetAmount}
              onChange={(event) => setBudgetAmount(event.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
            />

            <FieldError
              messages={
                validationErrors.BudgetAmount ?? submitErrorDetails.BudgetAmount
              }
            />
          </div>

          <div>
            <label
              htmlFor="currency"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Currency
            </label>

            <select
              id="currency"
              value={currencyCode}
              onChange={(event) => setCurrencyCode(event.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="SEK">SEK</option>
              <option value="DKK">DKK</option>
              <option value="CNY">CNY</option>
              <option value="JPY">JPY</option>
            </select>

            <FieldError
              messages={
                validationErrors.CurrencyCode ?? submitErrorDetails.CurrencyCode
              }
            />
          </div>
        </div>

        {/* Poster URL */}
        <div>
          <label
            htmlFor="posterUrl"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Poster URL
          </label>

          <input
            id="posterUrl"
            type="url"
            value={posterUrl}
            onChange={(event) => setPosterUrl(event.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : movie ? "Update Movie" : "Add Movie"}
          </button>

          {movie && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-md border border-zinc-700 px-5 py-2 font-semibold text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
