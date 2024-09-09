import { useContext } from "react";
import { modalContext } from "../../context/modalContext";
import { Button } from "../Button/Button";
import "./DeleteNote.css";

export const DeleteNote = () => {
  const { closeModal } = useContext(modalContext);
  return (
    <div className="delete__content">
      <p>Are you sure you want to delete this task?</p>
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
            closeModal();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
