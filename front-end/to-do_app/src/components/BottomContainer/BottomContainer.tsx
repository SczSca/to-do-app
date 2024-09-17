import { useContext } from "react";
import { Button } from "../Button/Button";
import "./BottomContainer.css";
import { modalContext } from "../../context/modalContext";
import { ModalType } from "../../types";
import { crudContext } from "../../context/crudContext";
export const BottomContainer = () => {
  const { openModal } = useContext(modalContext);
  const { getTimeMetrics } = useContext(crudContext);

  const { Add, Time } = ModalType;
  return (
    <div className="bottom__container">
      <div className="buttons">
        <Button
          className="button__open__modal button__black"
          onClick={() => {
            void getTimeMetrics();
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
