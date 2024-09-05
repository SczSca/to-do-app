import { ButtonHTMLAttributes } from "react";
import "./Button.css";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  innerHTML: string;
  className: string;
}
export const Button = (props: Props) => {
  const { innerHTML, className, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {innerHTML}
    </button>
  );
};
