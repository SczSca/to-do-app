import {} from "react";
import "./AddModal.css";
import { TextBox } from "../TextBox/TextBox";
import { Button } from "../Button/Button";

export const AddModal = () => {
  return (
    <div className="add__modal">
      <div className="modal__content">
        <div className="textbox__container">
          <TextBox
            id="name_add"
            name="name_add"
            label="Name:"
            type="text"
            //onChange={(e) => handleChange(e)}
            placeholder="Introduce task name"
          />
        </div>
        <div className="calendar__time">
          <TextBox
            id="calendar"
            name="calendar"
            label="Assign deadline:"
            type="date"
            //onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="buttons__container">
          <Button className="button button__large__gray" innerHTML="Set Time" />
          <Button
            className="button button__large__blue"
            innerHTML="Save Changes"
          />
        </div>
      </div>
    </div>
  );
};
