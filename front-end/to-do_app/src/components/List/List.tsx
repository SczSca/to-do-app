import { useContext } from "react";
import "./List.css";
import { Pagination } from "../Pagination/Pagination";
import { TasksView } from "../TasksView/TasksView";
import { crudContext } from "../../context/crudContext";

export const List = () => {
  const { getData, setCurrentPage, currentPage, totalPages } =
    useContext(crudContext);

  return (
    <div className="list">
      <TasksView />
      <Pagination
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPageChange={async (page) => {
          setCurrentPage(page);
          await getData(page);
        }}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
