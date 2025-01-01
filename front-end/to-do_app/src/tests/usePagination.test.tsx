import { renderHook } from "@testing-library/react";
import "../hooks/usePagination";
import { usePagination } from "../hooks/usePagination";

describe("Pagination hook", () => {
  const usePaginationProps = {
    currentPage: 3,
    totalPages: 7,
  };

  it("7 or more total pages returns 6 pagination elements for pagination bar", () => {
    const { result } = renderHook(() => usePagination(usePaginationProps));

    //If there are a total of, at least, 7 pages, it will always return 6 pagination elements
    expect(result.current?.length).toEqual(6);
  });

  it("less than 7 total pages returns the same amount of pages", () => {
    usePaginationProps.totalPages = 3;
    const { result } = renderHook(() => usePagination(usePaginationProps));

    expect(result.current?.length).toEqual(usePaginationProps.totalPages);
  });

  it("0 pages equals to 0 pagination elements", () => {
    usePaginationProps.totalPages = 0;
    const { result } = renderHook(() => usePagination(usePaginationProps));

    expect(result.current?.length).toEqual(0);
  });
});
