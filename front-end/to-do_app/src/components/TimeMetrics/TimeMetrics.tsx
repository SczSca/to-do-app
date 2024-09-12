import { useContext } from "react";
import { modalContext } from "../../context/modalContext";
import "./TimeMetrics.css";
import { Button } from "../Button/Button";

export const TimeMetrics = () => {
  const { closeModal } = useContext(modalContext);
  // const
  return (
    <div className="modal__content__time">
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
          <p>01:10:30 hours </p>
        </div>
      </div>
      <div className="average__time__priority">
        <div className="priority">
          <p>Average time to finish tasks by priority:</p>
          {/* TODO: Add a cycle that creates n <p>s based on the ammount of priorities */}
          <p>Low: 02:30:10 hours</p>
          <p>Low: 02:30:10 hours</p>
          <p>Low: 02:30:10 hours</p>
        </div>
      </div>
    </div>
  );
};
