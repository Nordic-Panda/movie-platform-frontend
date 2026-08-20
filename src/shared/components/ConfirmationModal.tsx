interface ConfirmationModalProps {
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmVariant?: "default" | "danger";
}

export function ConfirmationModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmVariant = "default",
}: ConfirmationModalProps) {
  const confirmButtonClass =
    confirmVariant === "danger"
      ? "bg-red-600 text-white hover:bg-red-500"
      : "bg-yellow-500 text-black hover:bg-yellow-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-md border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer rounded-md px-5 py-2 text-sm font-semibold transition ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
