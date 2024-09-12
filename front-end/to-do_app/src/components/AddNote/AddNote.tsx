import { useContext, useRef, useState } from "react";
import "./AddNote.css";
import { TextBox } from "../TextBox/TextBox";
import { Button } from "../Button/Button";
import Select from "../Select/Select";
import { priorityOptions } from "../../utils";
import { modalContext } from "../../context/modalContext";
import { TaskElements } from "../../types";
import { crudContext } from "../../context/crudContext";

interface Props {
  isEdit?: boolean;
}

export const AddNote = ({ isEdit }: Props) => {
  const { closeModal } = useContext(modalContext);
  const { createTask, updateTask, task, setTask } = useContext(crudContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = new FormData(event.target as HTMLFormElement);
    const formData = Object.fromEntries(
      formElements
    ) as unknown as TaskElements;
    formData.id = task.id;
    console.log(formData);

    if (isEdit) {
      await updateTask(formData);
    } else {
      await createTask(formData);
    }
    closeModal();
  };

  return (
    <div className="modal__content">
      <form className="input__container" onSubmit={void handleSubmit}>
        <TextBox
          id="nameTextBox"
          name="text"
          label="Name:"
          type="text"
          // onChange={(e) => handleChange(e)}
          placeholder="Introduce task name"
          defaultValue={task.text ?? ""}
        />
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <TextBox
          id="dueDate"
          name="dueDate"
          label="Deadline:"
          type="date"
          defaultValue={task.dueDate ?? ""}
          // onChange={(e) => handleChange(e)}
        />
        <Select
          options={priorityOptions}
          id="priority"
          name="priority"
          label="Priority:"
          defaultValue={task.priority ?? ""}
          // onChange={(e) => handleChange(e)}
        />
        <div className="buttons__container">
          <Button className="button__modal button__blue" type="submit">
            Save Changes
          </Button>
          <Button
            className="button__modal button__gray"
            onClick={() => {
              closeModal();
              if (isEdit) {
                setTask({});
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
