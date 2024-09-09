import { JSX, useContext } from "react";
import { ModalType } from "../../types";
import { AddNote } from "../AddNote/AddNote";
import { TimeMetrics } from "../TimeMetrics/TimeMetrics";
import { DeleteNote } from "../DeleteNote/DeleteNote";
import "./Modal.css";
import { crudContext } from "../../context/crudContext";

interface Props {
  type: ModalType;
}

export const Modal = ({ type }: Props) => {
  const { Add, Time, Edit, Delete } = ModalType;
  const { createTask, updateTask } = useContext(crudContext);

  /**
   * Based on the param, renderSwitch will return an specific modal_content component
   * @param mType determines which modal will be rendered
   * @returns  modal_content component
   */
  const renderSwitch = (mType: ModalType): JSX.Element => {
    switch (mType) {
      case Time:
        return <TimeMetrics />;
      case Add:
        return (
          <AddNote IDTask="1" idTaskText="name_add" submitFunc={createTask} />
        );
      case Edit:
        return (
          <AddNote IDTask="2" idTaskText="name_edit" submitFunc={updateTask} />
        );
      case Delete:
        return <DeleteNote></DeleteNote>;
      default:
        return <></>;
    }
  };
  return <div className="modal">{renderSwitch(type)}</div>;
};

//e.g.
// const ModalBody = ({ children }: ComponentWithChildren) => {
//   return <div>{children}</div>;
// };

// Modal.ModalBody = ModalBody;
