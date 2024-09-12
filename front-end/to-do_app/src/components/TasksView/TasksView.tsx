import { useContext } from "react";
import "./TasksView.css";
import { Task } from "../Task/Task";
import { crudContext } from "../../context/crudContext";
import { TaskStructure } from "../../types";

/**
 * TODO:
 *  add interaction with pagination
 *      show n tasks with its info and props
 *  try not to die in the process
 *
 */

// props notes
export const TasksView = () => {
  const { data } = useContext(crudContext);
  return (
    <div className="tasks__view">
      {data.map((item: TaskStructure) => (
        <Task key={item.id} item={item} />
      ))}
    </div>
  );
};
