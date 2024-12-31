import { useContext } from "react";
import "./Filter.css";
import { crudContext } from "../../context/crudContext";
import { Button } from "../Button/Button";
import { order, SearchParams } from "../../types";

export const Filter = () => {
  const { setSearchParams, searchParams } = useContext(crudContext);
  const handleOnClick = (
    setFunc: React.Dispatch<React.SetStateAction<SearchParams>>,
    type: number
  ) => {
    if (type == 1) {
      setFunc((prevState) => ({
        ...prevState, // Spread the previous state to keep other fields unchanged
        priorOrder: prevState.priorOrder === order.Asc ? order.Desc : order.Asc, // Toggle the value
      }));
    } else if (type == 2) {
      setFunc((prevState) => ({
        ...prevState, // Spread the previous state to keep other fields unchanged
        dateOrder: prevState.dateOrder === order.Asc ? order.Desc : order.Asc, // Toggle the value
      }));
    }
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
              handleOnClick(setSearchParams, 2);
            }}
          >
            {searchParams.dateOrder}
          </Button>
        </label>
        <label htmlFor="sortPrior">
          Sort by priority:
          <Button
            id="sortPrior"
            className="button__sort"
            onClick={() => {
              handleOnClick(setSearchParams, 1);
            }}
          >
            {searchParams.priorOrder}
          </Button>
        </label>
      </div>
    </div>
  );
};
