import { useContext } from "react";
import { BottomContainer } from "../../components/BottomContainer/BottomContainer";
import { Filter } from "../../components/Filter/Filter";
import { List } from "../../components/List/List";
import { Modal } from "../../components/Modal/Modal";
import { Search } from "../../components/Search/Search";
import "./Home.css";
import { modalContext } from "../../context/modalContext";
export const Home = () => {
  const { isOpen, modalType } = useContext(modalContext);
  return (
    <div className="home">
      <Search />
      <Filter />
      <List />

      <BottomContainer />
      {isOpen && <Modal type={modalType} />}
    </div>
  );
};
