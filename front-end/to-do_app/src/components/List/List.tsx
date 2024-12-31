import { useContext } from "react";
import "./List.css";
import { Pagination } from "../Pagination/Pagination";
import { TasksView } from "../TasksView/TasksView";
import { crudContext } from "../../context/crudContext";
import { fetchTasks } from "../../service/ApiService";

export const List = () => {
  const { searchParams, setSearchParams, setAllData } = useContext(crudContext);

  const setCurrentPage = (page: number) => {
    setSearchParams((prevState) => ({ ...prevState, currentPage: page }));
  };
  return (
    <div className="list">
      <TasksView />
      <Pagination
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPageChange={async (page) => {
          setCurrentPage(page);
          fetchTasks(searchParams, setAllData, setSearchParams, page);
        }}
        totalPages={searchParams.totalPages}
        currentPage={searchParams.currentPage}
      />
    </div>
  );
};
