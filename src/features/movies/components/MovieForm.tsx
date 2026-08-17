import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createMovie } from "../movieSlice";
import { FieldError } from "./FieldError";

export function MovieForm() {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [language, setLanguage] = useState("ENGLISH");
  const [synopsis, setSynopsis] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [currencyCode, setCurrencyCode] = useState("USD");

  const dispatch = useAppDispatch();

  const createStatus = useAppSelector((state) => state.movies.createStatus);

  const createError = useAppSelector((state) => state.movies.createError);

  const createErrorDetails = useAppSelector(
    (state) => state.movies.createErrorDetails,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await dispatch(
        createMovie({
          title: title.trim(),
          durationMinutes: Number(durationMinutes),
          genreIds: [],
          language,
          synopsis: synopsis.trim() || undefined,
          budgetAmount: budgetAmount ? Number(budgetAmount) : undefined,
          currencyCode: budgetAmount ? currencyCode : undefined,
        }),
      ).unwrap();

      setTitle("");
      setDurationMinutes("");
      setLanguage("ENGLISH");
      setSynopsis("");
      setBudgetAmount("");
      setCurrencyCode("USD");
    } catch {
      // Redux already stores the error.
    }
  }

  return (
    <form
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
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />

          <FieldError messages={createErrorDetails.Title} />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Duration
          </label>

          <input
            id="duration"
            type="number"
            min="1"
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
          />

          <FieldError messages={createErrorDetails.DurationMinutes} />
        </div>

        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Language
          </label>

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

          <FieldError messages={createErrorDetails.Language} />
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
              min="0"
              value={budgetAmount}
              onChange={(event) => setBudgetAmount(event.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-yellow-500"
            />
            {/* <FieldError messages={createErrorDetails.BudgetAmount} /> */}
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

            <FieldError messages={createErrorDetails.CurrencyCode} />
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
