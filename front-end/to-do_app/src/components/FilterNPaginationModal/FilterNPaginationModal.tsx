import { useContext, useEffect, useRef } from "react";
import "./FilterNPaginationModal.css";
import { crudContext } from "../../context/crudContext";
import { Button } from "../Button/Button";
import { order } from "../../types";

export const FilterNPaginationModal = () => {
  const { getData, setDateOrder, setPriorOrder, priorOrder, dateOrder } =
    useContext(crudContext);
  const isFirstRender = useRef(true); // Track if it's the first render

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorOrder, dateOrder]);
  const handleOnClick = (
    setFunc: React.Dispatch<React.SetStateAction<order>>
  ) => {
    setFunc((prevOrder) => (prevOrder === order.Asc ? order.Desc : order.Asc));
  };
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
