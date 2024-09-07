import {} from "react";
import "./TasksView.css";
import { Task } from "../Task/Task";

/**
 * TODO:
 *  add interaction with pagination
 *      show n tasks with its info and props
 *  try not to die in the process
 *
 */
export const TasksView = () => {
  return (
    <div className="tasks__view">
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
};
