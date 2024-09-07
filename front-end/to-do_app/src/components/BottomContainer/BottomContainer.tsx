import { useContext } from "react";
import { Button } from "../Button/Button";
import { Pagination } from "../Pagination/Pagination";
import "./BottomContainer.css";
import { modalContext } from "../../context/modalContext";
export const BottomContainer = () => {
  const { openModal } = useContext(modalContext);
  return (
    <div className="bottom__container">
      <div className="buttons">
        <Button className="button__open__modal button__black">
          Time Metrics
        </Button>
        <Button
          className="button__open__modal button__blue"
          onClick={() => {
            openModal();
          }}
        >
          Add new task
        </Button>
      </div>
    </div>
  );
};
