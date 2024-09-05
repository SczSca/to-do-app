import { SelectHTMLAttributes } from "react";
import { SelectOptionsI } from "../../types";
import "./Select.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionsI[];
  label: string;
}

const Select = (props: SelectProps) => {
  const { options, id, name, label, ...rest } = props;

  return (
    <div className="select">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} {...rest}>
        {options.map(({ id, name, value }) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
