import {} from "react";
import "./AddNote.css";
import { TextBox } from "../TextBox/TextBox";
import { Button } from "../Button/Button";
import Select from "../Select/Select";
import { priorityOptions } from "../../utils";

export const AddNote = () => {
  return (
    <div className="add__modal">
      <div className="modal__content">
        <div className="input__container">
          <TextBox
            id="name_add"
            name="name_add"
            label="Name:"
            type="text"
            //onChange={(e) => handleChange(e)}
            placeholder="Introduce task name"
          />
          <TextBox
            id="calendar"
            name="calendar"
            label="Deadline:"
            type="date"
            //onChange={(e) => handleChange(e)}
          />
          <Select
            options={priorityOptions}
            id="priority"
            name="priority"
            label="Priority:"
            //onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="buttons__container">
          <Button className="button__modal button__blue">Save Changes</Button>
          <Button className="button__modal button__gray">Cancel</Button>
        </div>
      </div>
    </div>
  );
};
