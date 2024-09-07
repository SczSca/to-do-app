import { JSX } from "react";
import { ModalType } from "../../types";
import { AddNote } from "../AddNote/AddNote";
import { TimeMetrics } from "../TimeMetrics/TimeMetrics";
import "./Modal.css";

interface Props {
  type: ModalType;
}

export const Modal = ({ type }: Props) => {
  const { Add, Time, Edit, Delete } = ModalType;

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
        return <AddNote />;
      case Edit:
        return <></>;
      case Delete:
        return <></>;
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
