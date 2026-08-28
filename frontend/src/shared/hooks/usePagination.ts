export const DOTS = "...";

interface UsePaginationParams {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
}: UsePaginationParams): (number | typeof DOTS)[] => {
  const totalPageNumbers = siblingCount * 2 + 3;

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    return [...range(1, leftItemCount), DOTS, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    return [
      firstPageIndex,
      DOTS,
      ...range(totalPages - rightItemCount + 1, totalPages),
    ];
  }

  return [
    firstPageIndex,
    DOTS,
    ...range(leftSiblingIndex, rightSiblingIndex),
    DOTS,
    lastPageIndex,
  ];
};
