import { useContext, useState } from "react";
import "./AddNote.css";
import { TextBox } from "../TextBox/TextBox";
import { Button } from "../Button/Button";
import Select from "../Select/Select";
import { errorMessages, priorityOptions } from "../../utils";
import { modalContext } from "../../context/modalContext";
import { TaskElements } from "../../types";
import { crudContext } from "../../context/crudContext";
import {
  createTaskAndFetchAll,
  updateTaskAndFetchAll,
} from "../../service/ApiService";

interface Props {
  isEdit?: boolean;
}

//This component is used to add a new task or edit an existing task
export const AddNote = ({ isEdit }: Props) => {
  const [error, setError] = useState("");
  const { closeModal } = useContext(modalContext);
  const { searchParams, setSearchParams, allData, setAllData } =
    useContext(crudContext);

  //remove all option
  const priorityOpts = priorityOptions.slice(1);

  const setTask = (item: TaskElements) => {
    setAllData((prevData) => ({
      ...prevData,
      task: item,
    }));
  };

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

    // Check if the task description length is valid.
    if (textVal.length > 120) {
      taskTextInput.value = "";
      setError(errorMessages.taskTextLength);
      setTimeout(() => {
        setError("");
      }, 5000);
      return Promise;
    }
    // Check if the task description is empty.
    else if (textVal.trim() == "") {
      setError(errorMessages.emptyTaskText);
      setTimeout(() => {
        setError("");
      }, 5000);
      return Promise;
    }

    const formElements = new FormData(form);
    const formData = Object.fromEntries(
      formElements
    ) as unknown as TaskElements;
    formData.id = allData.task.id;

    // Set the due date to the end of the day if the user has entered a date
    if (dateVal) {
      formData.dueDate = new Date(`${dateVal}T23:59:59Z`).toISOString();
    }

    // if the modal is type edit, update the task. Otherwise, create a new task
    if (isEdit) {
      updateTaskAndFetchAll(
        formData,
        searchParams,
        setAllData,
        setSearchParams
      );
    } else {
      createTaskAndFetchAll(
        formData,
        searchParams,
        setAllData,
        setSearchParams
      );
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
          placeholder="Enter new task name"
          defaultValue={allData.task.text ?? ""}
        />
        {error && <p style={{ color: "red", margin: "0" }}>{error}</p>}
        <TextBox
          id="dueDate"
          name="dueDate"
          label="Deadline:"
          type="date"
          defaultValue={
            allData.task.dueDate ? allData.task.dueDate.split("T")[0] : ""
          }
          min={new Date().toISOString().split("T")[0]}
        />
        <Select
          options={priorityOpts}
          id="priority"
          name="priority"
          label="Priority:"
          defaultValue={allData.task.priority ?? ""}
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
