import { usePagination, DOTS } from "../../hooks/usePagination";
import "./Pagination.css";

interface Props {
  onPageChange: (page: number) => void;
  totalPages: number; // maybe switch to a useState val stored in crudContext
  siblingCount?: number;
  currentPage: number; // maybe switch to a useState val stored in crudContext
  className?: string;
}

export const Pagination = ({
  onPageChange,
  totalPages,
  siblingCount = 1,
  currentPage,
}: Props) => {
  // llamada 10
  const paginationRange = usePagination({
    currentPage,
    totalPages, // Ya no necesitas totalCount y pageSize exactos
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
        {"<"}
      </Button>
      <p>{pagination}</p>
      <Button
        className="button__pagination"
        onClick={() => {
          // llamada
          // aumenat la paginacion
          // fetch(pagination + 1 )
          setPagination((prev) => prev + 1);
        }}
      >
        {">"}
      </Button>
    </div>
  );
};
