//import { FormEvent } from "react";
import { Button } from "../../components/Button/Button";
import { ListModal } from "../../components/ListModal/ListModal";
import { SearchModal } from "../../components/SearchModal/SearchModal";
import "./Home.css";
export const Home = () => {
  return (
    <div className="home">
      <SearchModal />
      <ListModal />
      <div className="new__task__container">
        <Button
          className="button button__open__modal"
          innerHTML="Add new task"
        />
      </div>
    </div>
  );
};
