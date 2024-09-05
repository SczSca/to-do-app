//import { FormEvent } from "react";
import { AddModal } from "../../components/AddModal/AddModal";
import { BottomContainer } from "../../components/BottomContainer/BottomContainer";
import { Button } from "../../components/Button/Button";
import { FilterNPaginationModal } from "../../components/FilterNPaginationModal/FilterNPaginationModal";
import { ListModal } from "../../components/ListModal/ListModal";
import { Pagination } from "../../components/Pagination/Pagination";
import { SearchModal } from "../../components/SearchModal/SearchModal";
import "./Home.css";
export const Home = () => {
  return (
    <div className="home">
      <SearchModal />
      <FilterNPaginationModal />
      <ListModal />
      <AddModal />
      <BottomContainer />
    </div>
  );
};
