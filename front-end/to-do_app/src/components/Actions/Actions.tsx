import {} from "react";
import { Button } from "../Button/Button";
import "./Actions.css";
export const Actions = () => {
  return (
    <div className="actions">
      <Button
        className="button__actions button__yellow"
        onClick={() => {
          console.log(1);
        }}
      >
        Edit
        {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
      </Button>
      <Button
        className="button__actions button__red"
        onClick={() => {
          console.log(1);
        }}
      >
        Delete
        {/* <img src="../../assets/edit.png" alt="" srcSet="" /> */}
      </Button>
    </div>
  );
};
