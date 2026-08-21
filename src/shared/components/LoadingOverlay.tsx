import { LoadingSpinner } from "./LoadingSpinner";

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
    </div>
  );
}
