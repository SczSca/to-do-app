//import { FormEvent } from "react";
import { useContext } from "react";
import { BottomContainer } from "../../components/BottomContainer/BottomContainer";
import { FilterNPaginationModal } from "../../components/FilterNPaginationModal/FilterNPaginationModal";
import { List } from "../../components/List/List";
import { Modal } from "../../components/Modal/Modal";
import { Search } from "../../components/Search/Search";
import "./Home.css";
import { modalContext } from "../../context/modalContext";
export const Home = () => {
  //
  const { isOpen, modalType } = useContext(modalContext);
  return (
    <div className="home">
      <Search />
      <FilterNPaginationModal />
      <List />

      <BottomContainer />
      {isOpen && <Modal type={modalType} />}
    </div>
  );
};
