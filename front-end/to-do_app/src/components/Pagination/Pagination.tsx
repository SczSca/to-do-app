import { usePagination, DOTS } from "../../hooks/usePagination";
import "./Pagination.css";

export const Pagination = () => {
  // llamada 10

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
