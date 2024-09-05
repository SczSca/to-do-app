import {} from "react";
import "./AddModal.css";
import { TextBox } from "../TextBox/TextBox";

export const AddModal = () => {
  return (
    <div className="add__modal">
      <div className="modal__content">
        <TextBox
          id="name_add"
          name="name_add"
          label="Name:"
          //onChange={(e) => handleChange(e)}
          placeholder="Introduce task name"
        />
      </div>
    </div>
  );
};
