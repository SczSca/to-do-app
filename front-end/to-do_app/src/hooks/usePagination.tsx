import { useMemo } from "react";

export const DOTS = "...";

type PaginationItem = number | typeof DOTS;

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number; // optional | to stablish the amount of pagination buttons to display
}

/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The ending number of the range (inclusive).
 * @returns {number[]} An array of numbers from `start` to `end`.
 */
const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => start + idx);

/**
 * Custom hook to generate a pagination range based on the current page, total pages, and sibling count.
 *
 * The logic determines the visibility of page numbers and adds ellipsis (`...`) where appropriate.
 *
 * @param {Object} params - Pagination parameters.
 * @param {number} params.currentPage - The currently active page.
 * @param {number} params.totalPages - The total number of pages.
 * @param {number} [params.siblingCount=1] - The number of sibling pages to show around the current page.
 * @returns {(number | string)[]} An array representing the pagination range, including numbers and ellipsis.
 */
export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps): PaginationItem[] => {
  const paginationRange: PaginationItem[] = useMemo(() => {
    if (totalPages <= 0) return [];
    // Ensure the currentPage is within valid bounds
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    // Total number of page buttons to display including siblings, first/last page, and ellipsis.
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If total pages are less than the required page buttons, show all pages.
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    // Calculate left and right sibling indices.
    const leftSiblingIdx = Math.max(validCurrentPage - siblingCount, 1);
    const rightSiblingIdx = Math.min(
      validCurrentPage + siblingCount,
      totalPages
    );

    // Determine whether to show dots on the left or right.
    const showLeftDots = leftSiblingIdx > 2;
    const showRightDots = rightSiblingIdx < totalPages - 2;

    // Case 2: No left dots, only right dots (show from 1 to a limited range, then ellipsis, then last page).
    if (!showLeftDots && showRightDots) {
      return [...range(1, siblingCount + 3), DOTS, totalPages];
    }

    // Case 3: No right dots, only left dots (show first page, ellipsis, and a limited range at the end).
    else if (showLeftDots && !showRightDots) {
      return [1, DOTS, ...range(totalPages - (siblingCount + 2), totalPages)];
    }

    // Case 4: Both left and right dots (show first page, ellipsis, middle range, ellipsis, last page).
    else {
      return [
        1,
        DOTS,
        ...range(leftSiblingIdx, rightSiblingIdx),
        DOTS,
        totalPages,
      ];
    }
  }, [currentPage, totalPages, siblingCount]);

  return paginationRange;
};
