import { useContext } from "react";
import { modalContext } from "../../context/modalContext";
import "./TimeMetrics.css";
import { Button } from "../Button/Button";
import { crudContext } from "../../context/crudContext";

export const TimeMetrics = () => {
  const { closeModal } = useContext(modalContext);
  const { allData } = useContext(crudContext);
  const { averageTime, lowPriorTime, mediumPriorTime, highPriorTime } =
    allData.timeMetrics;
  return (
    <div className="modal__content__time" role="modal">
      <div className="close">
        <Button
          className="button__close button__gray"
          onClick={() => {
            closeModal();
          }}
        >
          X
        </Button>
      </div>
      <div className="average__time">
        <div className="average">
          <p>Average time to finish tasks:</p>
          <p>{averageTime} hours </p>
        </div>
      </div>
      <div className="average__time__priority">
        <div className="priority">
          <p>Average time to finish tasks by priority:</p>
          <p>Low: {lowPriorTime} hours</p>
          <p>Medium: {mediumPriorTime} hours</p>
          <p>High: {highPriorTime} hours</p>
        </div>
      </div>
    </div>
  );
};
