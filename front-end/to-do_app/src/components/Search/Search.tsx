import { useContext } from "react";
import { TextBox } from "../TextBox/TextBox";
import Select from "../Select/Select";
import { priorityOptions, statusOptions } from "../../utils";
import "./Search.css";
import { Button } from "../Button/Button";
import { TaskRequest } from "../../types";
import { crudContext } from "../../context/crudContext";

export const Search = () => {
  const { setSearchParams } = useContext(crudContext);

  const setTaskRequest = (taskRequest: TaskRequest) => {
    setSearchParams((prevState) => ({
      ...prevState,
      taskRequest: taskRequest,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formElements = new FormData(form);
    const formData = Object.fromEntries(formElements) as unknown as TaskRequest;

    const text: string = formData.taskText;
    //Set value used in backend to let it know it is blank
    formData.taskText = text == "" ? "blankTask_0X0" : text;

    //now the task info requested will be saved on taskRequest in crudContext to be able to go through the pages and keep the search
    setTaskRequest(formData);

    // direct access to textInput to erase value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const taskTextInput = form.querySelector<HTMLInputElement>(
      'input[name="taskText"]'
    )!;

    taskTextInput.value = "";
  };
  return (
    <div className="search">
      <form action="" onSubmit={handleSubmit}>
        <TextBox
          id="nameSearch"
          name="taskText"
          label="Name:"
          type="text"
          placeholder="Enter task name to search"
        />
        <div className="selectNbtn">
          <Select
            options={priorityOptions}
            id="priority"
            name="priority"
            label="Priority:"
          />
          <Select
            options={statusOptions}
            id="status"
            name="status"
            label="State:"
          />
          <Button className="button" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};
