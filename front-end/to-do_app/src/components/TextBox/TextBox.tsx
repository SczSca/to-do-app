import { InputHTMLAttributes } from "react";
import "./TextBox.css";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextBox = (props: Props) => {
  //gets all the props and separates to use in the code
  //...rest are all the other props from InputHTMLAttributes<HTMLInputElement>
  const { id, label, ...rest } = props;
  return (
    <label htmlFor={id}>
      {label}
      <input type="text" id={id} {...rest} />
    </label>
  );
};
