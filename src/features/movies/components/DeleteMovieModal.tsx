import { ConfirmationModal } from "../../../shared/components/ConfirmationModal";

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
    <ConfirmationModal
      title="Delete Movie"
      message={
        <>
          Are you sure you want to delete{" "}
          <span className="font-medium text-white">{movieTitle}</span>? This
          action cannot be undone.
        </>
      }
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmVariant="danger"
    />
  );
}
