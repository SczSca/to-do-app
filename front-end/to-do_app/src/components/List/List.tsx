import { useContext, useEffect } from "react";
import "./List.css";
import { Pagination } from "../Pagination/Pagination";
import { TasksView } from "../TasksView/TasksView";
import { crudContext } from "../../context/crudContext";

export const List = () => {
  const { getData } = useContext(crudContext);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="list">
      <TasksView />
      <Pagination />
    </div>
  );
};
