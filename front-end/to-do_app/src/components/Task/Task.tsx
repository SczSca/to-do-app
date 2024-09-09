import {} from "react";
import "./Task.css";
import { Actions } from "../Actions/Actions";

/**
 * TODO:
 *  add functionality
 *  add interaction with pagination
 *  try not to die in the process
 */
export const Task = () => {
  return (
    <div className="task">
      <input type="checkbox" name="done" id="" />
      <p className="task__name">
        Aprender programación es una habilidad importante que puede abrir muchas
        oportunidades en diversos campos de la tecnología.
      </p>
      <div className="task__priority task__info  high__prio">
        <p>High</p>
      </div>
      <div className="task__date task__info due__later">
        <p>2024-09-03T14:30:00Z</p>
      </div>
      <Actions></Actions>
    </div>
  );
};
