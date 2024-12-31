import { useContext } from "react";
import { Button } from "../Button/Button";
import "./BottomContainer.css";
import { modalContext } from "../../context/modalContext";
import { ModalType } from "../../types";
import { crudContext } from "../../context/crudContext";
import { fetchMetrics } from "../../service/ApiService";
export const BottomContainer = () => {
  const { openModal } = useContext(modalContext);
  const { setAllData } = useContext(crudContext);

  const { Add, Time } = ModalType;
  return (
    <div className="bottom__container">
      <div className="buttons">
        <Button
          className="button__open__modal button__black"
          onClick={() => {
            fetchMetrics(setAllData);
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
