import { DOTS, Spinner, usePagination, type PaginationProps } from "@/shared";

export const Pagination = ({
  pagination,
  onPageChange,
  isLoading = false,
  className = "",
  siblingCount = 1,
}: PaginationProps) => {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  const pageRange = usePagination({
    totalPages,
    currentPage: +page,
    siblingCount,
  });

  if (totalPages <= 1) return null;

  const goTo = (target: number) => {
    if (isLoading || target === page || target < 1 || target > totalPages)
      return;

    onPageChange(target);
  };

  return (
    <nav aria-label="Pagination" className={`flex-center gap-1 ${className}`}>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => goTo(+page - 1)}
        disabled={!hasPrevPage || isLoading}
        className="flex-center h-8 min-w-8 px-2 text-sm text-tx-placeholder transition-colors hover:bg-b-secondary rounded-lg disabled:pointer-events-none disabled:opacity-25"
      >
        Prev
      </button>

      {pageRange.map((item, idx) =>
        item === DOTS ? (
          <span
            key={`dots-${idx}`}
            className="flex h-8 min-w-8 items-center justify-center text-sm text-tx-placeholder"
          >
            {DOTS}
          </span>
        ) : (
          <button
            type="button"
            key={item}
            onClick={() => goTo(+item)}
            disabled={isLoading}
            aria-current={item === page ? "page" : undefined}
            className={`flex-center size-8 rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-25 text-tx-placeholder ${
              +item === +page ? "border border-bo-primary" : ""
            }`}
          >
            {isLoading && +item === +page ? (
              <Spinner className="size-3 text-tx-primary" />
            ) : (
              item
            )}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goTo(+page + 1)}
        disabled={!hasNextPage || isLoading}
        aria-label="Next page"
        className="flex-center h-8 min-w-8 px-2 text-sm text-tx-placeholder transition-colors hover:bg-b-secondary rounded-lg disabled:pointer-events-none disabled:opacity-25"
      >
        Next
      </button>
    </nav>
  );
};
