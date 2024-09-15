import { useMemo } from "react";

export const DOTS = "...";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number; // optional | to stablish the amount of pagination buttons to display
}

// pagination bar logic
export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps): (number | string)[] | undefined => {
  const paginationRange = useMemo(() => {
    // Number of button pages to show: First, Last, current, siblings + 2 DOTS
    const totalPageNumbers = siblingCount + 5;

    // if total pages are less than the ones we want to display
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIdx = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIdx > 2;
    const showRightDots = rightSiblingIdx < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from(
        { length: leftItemCount },
        (_, idx) => idx + 1
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, idx) => totalPages - rightItemCount + idx + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIdx - leftSiblingIdx + 1 },
        (_, idx) => leftSiblingIdx + idx
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [currentPage, totalPages, siblingCount]);

  return paginationRange;
};
