import { useContext, useEffect, useRef } from "react";
import "./Filter.css";
import { crudContext } from "../../context/crudContext";
import { Button } from "../Button/Button";
import { order } from "../../types";

export const Filter = () => {
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
      <div className="sorts">
        <label htmlFor="sortDate">
          Sort by deadline:
          <Button
            id="sortDate"
            className="button__sort"
            onClick={() => {
              handleOnClick(setDateOrder);
            }}
          >
            {dateOrder}
          </Button>
        </label>
        <label htmlFor="sortPrior">
          Sort by priority:
          <Button
            id="sortPrior"
            className="button__sort"
            onClick={() => {
              handleOnClick(setPriorOrder);
            }}
          >
            {priorOrder}
          </Button>
        </label>
      </div>
    </div>
  );
};
