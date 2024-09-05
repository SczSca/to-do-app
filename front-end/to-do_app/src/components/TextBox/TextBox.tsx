import { InputHTMLAttributes } from "react";
import "./TextBox.css";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
}

export const TextBox = (props: Props) => {
  //gets all the props and separates to use in the code
  //...rest are all the other props from InputHTMLAttributes<HTMLInputElement>
  const { id, label, type, ...rest } = props;
  return (
    <label htmlFor={id}>
      {label}
      <input type={type} id={id} {...rest} />
    </label>
  );
};
