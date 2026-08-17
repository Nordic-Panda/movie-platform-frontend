import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createMovie } from "../movieSlice";
import { FieldError } from "./FieldError";
import { RequiredLabel } from "./RequiredLabel";
import { fetchGenres } from "../../genres/genreSlice";

export function MovieForm() {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [language, setLanguage] = useState("ENGLISH");
  const [synopsis, setSynopsis] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [genreIds, setGenreIds] = useState<string[]>([]);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const MAX_BUDGET = 9_999_999_999_999_999.99;

  const dispatch = useAppDispatch();

  const genres = useAppSelector((state) => state.genres.items);

  const genreStatus = useAppSelector((state) => state.genres.status);

  const createStatus = useAppSelector((state) => state.movies.createStatus);

  const createError = useAppSelector((state) => state.movies.createError);

  const createErrorDetails = useAppSelector(
    (state) => state.movies.createErrorDetails,
  );

  useEffect(() => {
    if (genreStatus === "idle") {
      dispatch(fetchGenres());
    }
  }, [dispatch, genreStatus]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: Record<string, string> = {};

    if (!title.trim()) {
      errors.Title = "Title is required.";
    }

    if (!durationMinutes) {
      errors.DurationMinutes = "Duration is required.";
    } else if (Number(durationMinutes) < 1) {
      errors.DurationMinutes = "Duration must be at least 1 minute.";
    }

    if (!language) {
      errors.Language = "Language is required.";
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
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await dispatch(
        createMovie({
          title: title.trim(),
          durationMinutes: Number(durationMinutes),
          genreIds,
          language,
          synopsis: synopsis.trim() || undefined,
          budgetAmount: budgetAmount ? Number(budgetAmount) : undefined,
          currencyCode: budgetAmount ? currencyCode : undefined,
        }),
      ).unwrap();

      setTitle("");
      setDurationMinutes("");
      setGenreIds([]);
      setLanguage("ENGLISH");
      setSynopsis("");
      setBudgetAmount("");
      setCurrencyCode("USD");
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
      {createStatus === "failed" && createError && (
        <div className="rounded-md border border-red-900 bg-red-950/40 p-3 text-sm text-red-400">
          {createError}
        </div>
      )}

      <h2 className="text-xl font-semibold text-white">Add Movie</h2>

      <div className="mt-6 space-y-5">
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
            messages={validationErrors.Title ?? createErrorDetails.Title}
          />
        </div>

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
              createErrorDetails.DurationMinutes
            }
          />
        </div>

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
            messages={validationErrors.GenreIds ?? createErrorDetails.GenreIds}
          />
        </div>

        <div>
          <RequiredLabel htmlFor="language" required>
            Language
          </RequiredLabel>

          <select
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          >
            <option value="ENGLISH">English</option>
            <option value="FRENCH">French</option>
            <option value="GERMAN">German</option>
            <option value="SPANISH">Spanish</option>
          </select>

          <FieldError
            messages={validationErrors.Language ?? createErrorDetails.Language}
          />
        </div>

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
                validationErrors.BudgetAmount ?? createErrorDetails.BudgetAmount
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
            </select>

            <FieldError
              messages={
                validationErrors.CurrencyCode ?? createErrorDetails.CurrencyCode
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={createStatus === "loading"}
          className="rounded-md bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add Movie
        </button>
      </div>
    </form>
  );
}
