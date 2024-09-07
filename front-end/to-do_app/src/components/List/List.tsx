import {} from "react";
import "./List.css";
import { Pagination } from "../Pagination/Pagination";
import { TasksView } from "../TasksView/TasksView";

export const List = () => {
  return (
    <div className="list">
      <TasksView></TasksView>
      <Pagination></Pagination>
    </div>
  );
};
