import { useContext, useState } from "react";
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
  const [error, setError] = useState("");
  const { closeModal } = useContext(modalContext);
  const { createTask, updateTask, task, setTask } = useContext(crudContext);

  //remove all option
  const priorityOpts = priorityOptions.slice(1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const taskTextInput =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      form.querySelector<HTMLInputElement>('input[name="text"]')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const taskDateInput = form.querySelector<HTMLInputElement>(
      'input[name="dueDate"]'
    )!;

    const dateVal = taskDateInput.value;
    const textVal = taskTextInput.value;

    if (textVal.length > 120) {
      taskTextInput.value = "";
      setError("Task's text must be less than 120 chars.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return Promise;
    } else if (textVal.trim() == "") {
      setError("There must be a task text");
      setTimeout(() => {
        setError("");
      }, 5000);
      return Promise;
    }

    const formElements = new FormData(form);
    const formData = Object.fromEntries(
      formElements
    ) as unknown as TaskElements;
    formData.id = task.id;
    formData.dueDate = new Date(`${dateVal}T23:59:59Z`);

    if (isEdit) {
      await updateTask(formData);
    } else {
      await createTask(formData);
    }
    closeModal();
  };

  return (
    <div className="modal__content" role="modal">
      <form className="input__container" onSubmit={handleSubmit}>
        <TextBox
          id="nameTextBox"
          name="text"
          label="Name:"
          type="text"
          placeholder="Introduce task name"
          defaultValue={task.text ?? ""}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextBox
          id="dueDate"
          name="dueDate"
          label="Deadline:"
          type="date"
          // For some reason, this works fine, but is marked as an error in code
          defaultValue={task.dueDate ? task.dueDate.split("T")[0] : ""}
          min={new Date().toISOString().split("T")[0]}
        />
        <Select
          options={priorityOpts}
          id="priority"
          name="priority"
          label="Priority:"
          defaultValue={task.priority ?? ""}
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
