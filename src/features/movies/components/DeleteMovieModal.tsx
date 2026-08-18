interface DeleteMovieModalProps {
  movieTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteMovieModal({
  movieTitle,
  onCancel,
  onConfirm,
}: DeleteMovieModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Delete Movie</h2>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Are you sure you want to delete{" "}
          <span className="font-medium text-white">{movieTitle}</span>? This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
