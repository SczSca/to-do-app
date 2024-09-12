import { useContext, useState } from "react";
import { crudContext } from "../../context/crudContext";
import "./Task.css";
import { ModalType, TaskStructure } from "../../types";
import { modalContext } from "../../context/modalContext";
import { Button } from "../Button/Button";

/**
 * TODO:
 *  add functionality
 *  add interaction with pagination
 *  try not to die in the process
 */

interface Props {
  item: TaskStructure;
}
export const Task = ({ item }: Props) => {
  const [isChecked, setIsChecked] = useState(item.isDone);

  const { setTask, updateStatusTask } = useContext(crudContext);
  const { openModal } = useContext(modalContext);

  const { Edit, Delete } = ModalType;

  const handleOnClicked = (modal: ModalType.Edit | ModalType.Delete) => {
    openModal(modal);
    setTask(item);
  };

  const handleOnChange = async (id: number) => {
    setIsChecked((prevChecked) => !prevChecked);
    await updateStatusTask(id);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        name="done"
        id=""
        checked={isChecked}
        onChange={() => {
          void handleOnChange(item.id);
        }}
      />
      <p className="task__name">{item.text}</p>
      <div className={`task__priority task__info  high__prio ${item.priority}`}>
        <p>{item.priority}</p>
      </div>
      <div className="task__date task__info due__later">
        <p>{new Date(item.dueDate ? item.dueDate : "").toLocaleDateString()}</p>
      </div>

      <div className="actions">
        <Button
          className="button__actions button__blue"
          onClick={() => {
            handleOnClicked(Edit);
          }}
        >
          Edit
          {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
        </Button>
        <Button
          className="button__actions button__red"
          onClick={() => {
            handleOnClicked(Delete);
          }}
        >
          Delete
          {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
        </Button>
      </div>
    </div>
  );
};
