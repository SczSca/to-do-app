import { usePagination, DOTS } from "../../hooks/usePagination";
import "./Pagination.css";

interface Props {
  onPageChange: (page: number) => void;
  totalPages: number;
  siblingCount?: number;
  currentPage: number;
  className?: string;
}

export const Pagination = ({
  onPageChange,
  totalPages,
  siblingCount = 1,
  currentPage,
}: Props) => {
  
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  // no render if there is no pages
  if (!paginationRange) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const lastPage = totalPages;

  return (
    <div className="pagination">
      <ul className={`pagination-container`}>
        <li
          className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={`pagination-item ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              onClick={() => {
                onPageChange(pageNumber as number);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`pagination-item ${
            currentPage === lastPage ? "disabled" : ""
          }`}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};
