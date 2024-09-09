import { useContext } from "react";
import { Button } from "../Button/Button";
import "./BottomContainer.css";
import { modalContext } from "../../context/modalContext";
import { ModalType } from "../../types";
export const BottomContainer = () => {
  const { openModal } = useContext(modalContext);

  const { Add, Time } = ModalType;
  return (
    <div className="bottom__container">
      <div className="buttons">
        <Button
          className="button__open__modal button__black"
          onClick={() => {
            openModal(Time);
          }}
        >
          Time Metrics
        </Button>
        <Button
          className="button__open__modal button__green"
          onClick={() => {
            openModal(Add);
          }}
        >
          Add new task
        </Button>
      </div>
    </div>
  );
};
