import { useContext, useEffect, useRef } from "react";
import { BottomContainer } from "../../components/BottomContainer/BottomContainer";
import { Filter } from "../../components/Filter/Filter";
import { List } from "../../components/List/List";
import { Modal } from "../../components/Modal/Modal";
import { Search } from "../../components/Search/Search";
import "./Home.css";
import { modalContext } from "../../context/modalContext";
import { crudContext } from "../../context/crudContext";
import { fetchTasks } from "../../service/ApiService";
export const Home = () => {
  const { isOpen, modalType } = useContext(modalContext);

  const { searchParams, setSearchParams, setAllData } = useContext(crudContext);

  const isFirstRender = useRef(true); // Track if it's the first render

  // Fetch tasks when the search params change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchTasks(
      searchParams,
      setAllData,
      setSearchParams,
      searchParams.currentPage
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchParams.priorOrder,
    searchParams.dateOrder,
    searchParams.taskRequest,
  ]);
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
