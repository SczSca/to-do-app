import { useContext } from "react";
import { modalContext } from "../../context/modalContext";
import { Button } from "../Button/Button";
import "./DeleteNote.css";
import { crudContext } from "../../context/crudContext";

export const DeleteNote = () => {
  const { closeModal } = useContext(modalContext);
  const { deleteTask, task, setTask } = useContext(crudContext);

  return (
    <div className="delete__content">
      <p>Are you sure you want to delete the task &quot;{task.text}&quot;?</p>
      <div className="delete__cancel">
        <Button
          className="button__actions button__gray"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
        <Button
          className="button__actions button__red"
          onClick={() => {
            deleteTask(task.id);
            closeModal();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
