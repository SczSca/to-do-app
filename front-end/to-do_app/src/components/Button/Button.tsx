import { ButtonHTMLAttributes } from "react";
import "./Button.css";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className: string;
}
export const Button = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
