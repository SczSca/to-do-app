import { useContext, useEffect, useRef } from "react";
import "./FilterNPaginationModal.css";
import { crudContext } from "../../context/crudContext";
import { Button } from "../Button/Button";
import { order } from "../../types";

export const FilterNPaginationModal = () => {
  return (
    <div className="filter__pagination__modal">
      <Select
        options={orderOptions}
        id="order"
        name="order"
        label="Order:"
        //onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
