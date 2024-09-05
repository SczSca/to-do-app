import {} from "react";
import "./FilterNPaginationModal.css";
import Select from "../Select/Select";
import { orderOptions } from "../../utils";
import { Pagination } from "../Pagination/Pagination";

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
