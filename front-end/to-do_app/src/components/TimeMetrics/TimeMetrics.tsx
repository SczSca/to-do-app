import { useContext } from "react";
import { modalContext } from "../../context/modalContext";

export const TimeMetrics = () => {
  const { prueba } = useContext(modalContext);
  console.log(prueba);
  // const
  return <div></div>;
};
