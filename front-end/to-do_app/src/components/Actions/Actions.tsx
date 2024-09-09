import { useContext } from "react";
import { Button } from "../Button/Button";
import "./Actions.css";
import { modalContext } from "../../context/modalContext";
import { ModalType } from "../../types";
export const Actions = () => {
  const { openModal } = useContext(modalContext);
  const { Edit, Delete } = ModalType;
  return (
    <div className="actions">
      <Button
        className="button__actions button__blue"
        onClick={() => {
          openModal(Edit);
        }}
      >
        Edit
        {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
      </Button>
      <Button
        className="button__actions button__red"
        onClick={() => {
          openModal(Delete);
        }}
      >
        Delete
        {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
      </Button>
    </div>
  );
};
