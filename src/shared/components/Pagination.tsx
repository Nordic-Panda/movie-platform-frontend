import type { MouseEvent } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function handlePageChange(
    event: MouseEvent<HTMLButtonElement>,
    page: number,
  ) {
    event.currentTarget.blur();
    onPageChange(page);
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={(event) => handlePageChange(event, currentPage - 1)}
        className="cursor-pointer rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-yellow-500 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => {
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={(event) => handlePageChange(event, pageNumber)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                isCurrentPage
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "border border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:bg-zinc-800 hover:text-yellow-500"
              }`}
            >
              {pageNumber}
            </button>
          );
        },
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={(event) => handlePageChange(event, currentPage + 1)}
        className="cursor-pointer rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-yellow-500 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
      >
        Next
      </button>
    </div>
  );
}
