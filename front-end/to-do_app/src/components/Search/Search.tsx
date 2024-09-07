import { ChangeEvent, DetailedHTMLProps, FormEvent, useState } from "react";
import { TextBox } from "../TextBox/TextBox";
import Select from "../Select/Select";
import { priorityOptions, statusOptions } from "../../utils";
import "./Search.css";
import { Button } from "../Button/Button";

type Props = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Search = (props: Props) => {
  const [form, setForm] = useState({
    name: "",
    priority: "",
    state: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="search">
      <form action="" onSubmit={handleSubmit}>
        <TextBox
          id="name"
          name="name"
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
            id="state"
            name="state"
            label="State:"
            //onChange={(e) => handleChange(e)}
          />
          <Button className="button">Search</Button>
        </div>
      </form>
    </div>
  );
};
