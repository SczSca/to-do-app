import { useContext, useRef, useState } from "react";
import "./AddNote.css";
import { TextBox } from "../TextBox/TextBox";
import { Button } from "../Button/Button";
import Select from "../Select/Select";
import { priorityOptions } from "../../utils";
import { modalContext } from "../../context/modalContext";
import { taskElements } from "../../types";
import { crudContext } from "../../context/crudContext";

//add func updateTask type if it is different
type SubmitFuncType = (task: taskElements) => void;

interface Props {
  IDTask?: string;
  idTaskText: string;
  submitFunc: SubmitFuncType;
}

export const AddNote = ({ IDTask, idTaskText, submitFunc }: Props) => {
  const { closeModal } = useContext(modalContext);

  const { createTask, updateTask } = useContext(crudContext);

  const taskNameRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const handleSave = () => {
    // const taskName = taskNameRef.current?.value.trim() ?? "";
    // const priority = priorityRef.current?.value ?? "";
    // const deadlineValue = deadlineRef.current?.value ?? "";
    const taskNameElement = document.getElementById(idTaskText);
    const priorityElement = document.getElementById("priority");
    const deadlineElement = document.getElementById('calendar');

    //WHERE THINGS ARE BROKE
    const taskName = taskNameElement?.innerHTML.trim();
    const priority = priorityElement?.options[priorityElement.selectedIndex].text;
    const deadlineValue = deadlineElement.current?.value ??;
    const deadline = deadlineValue
      ? new Date(deadlineValue)
      : new Date("1999-01-01");

    // TODO: check if it will be saved in UTC or how it will be done
    // const utcDateString = deadline.toISO();

    if (!taskName) {
      setError("Task name cannot be empty");
      return;
    } else if (taskName.length > 120) {
      setError("120 characters limit!");
      return;
    }

    const task: taskElements = {
      taskName,
      priority,
      deadline,
    };
    submitFunc(task);
    closeModal();
  };

  return (
    <div className="modal__content">
      <div className="input__container">
        <TextBox
          id={idTaskText}
          name={idTaskText}
          label="Name:"
          type="text"
          //onChange={(e) => handleChange(e)}
          placeholder="Introduce task name"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <Button
          className="button__modal button__blue"
          onSubmit={handleSave}
          // {() => {
          //   /**
          //    * TODO:
          //    * get the input value of all the elements in this component and add it in the parameter
          //    * param be like this interface
          //    * interface taskElements {
          //    * taskName: string;
          //       priority: string;
          //       deadline: Date;
          //     }
          //    */
          //   submitFunc();
          //   closeModal();
          // }}
        >
          Save Changes
        </Button>
        <Button
          className="button__modal button__gray"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
