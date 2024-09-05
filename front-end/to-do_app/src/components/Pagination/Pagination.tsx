import {} from "react";
import "./Pagination.css";
import { Button } from "../Button/Button";

export const Pagination = () => {
  return (
    <div className="pagination">
      <Button className="button__pagination">{"<"}</Button>
      <Button className="button__pagination">{">"}</Button>
    </div>
  );
};
