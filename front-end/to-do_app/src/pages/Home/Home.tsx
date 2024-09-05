//import { FormEvent } from "react";
import { AddModal } from "../../components/AddModal/AddModal";
import { Button } from "../../components/Button/Button";
import { FilterNPaginationModal } from "../../components/FilterNPaginationModal/FilterNPaginationModal";
import { ListModal } from "../../components/ListModal/ListModal";
import { SearchModal } from "../../components/SearchModal/SearchModal";
import "./Home.css";
export const Home = () => {
  return (
    <div className="home">
      <SearchModal />
      <FilterNPaginationModal />
      <ListModal />
      <AddModal />
      <div className="new__task__container">
        <Button className="button button__open__modal">Add new task</Button>
      </div>
    </div>
  );
};
