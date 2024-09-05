import {} from "react";
import { Button } from "../Button/Button";
import { Pagination } from "../Pagination/Pagination";
import "./BottomContainer.css";
export const BottomContainer = () => {
  return (
    <div className="bottom__container">
      <Pagination />
      <div className="buttons">
        <Button className="button__open__modal button__black">
          Time Metrics
        </Button>
        <Button className="button__open__modal button__blue">
          Add new task
        </Button>
      </div>
    </div>
  );
};
