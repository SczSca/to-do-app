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

  const [pagination, setPagination] = useState(1);
  return (
    <div className="pagination">
      <Button
        className="button__pagination"
        onClick={() => {
          // llamada
          // aumenat la paginacion
          // fetch(pagination + 1 )
          setPagination((prev) => prev + 1);
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
