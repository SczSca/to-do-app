import { useContext, useEffect } from "react";
import { TextBox } from "../TextBox/TextBox";
import Select from "../Select/Select";
import { priorityOptions, statusOptions } from "../../utils";
import "./Search.css";
import { Button } from "../Button/Button";
import { TaskRequest } from "../../types";
import { crudContext } from "../../context/crudContext";

export const Search = () => {
  const { getData, setTaskRequest, taskRequest } = useContext(crudContext);

  // getData will be called after taskRequest is set on handleSubmit
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskRequest]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formElements = new FormData(form);
    const formData = Object.fromEntries(formElements) as unknown as TaskRequest;

    const text: string = formData.taskText;
    //Set value used in backend to let it know it is blank
    formData.taskText = text == "" ? "blankTask_0X0" : text;

    //now the task info requested will be saved on taskRequest in crudContext
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
          //onChange={(e) => handleChange(e)}
          placeholder="Introduce task name"
        />
        <div className="selectNbtn">
          <Select
            options={priorityOptions}
            id="priority"
            name="priority"
            label="Priority:"
            //onChange={(e) => handleChange(e)}
          />
          <Select
            options={statusOptions}
            id="status"
            name="status"
            label="State:"
            //onChange={(e) => handleChange(e)}
          />
          <Button className="button" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};
