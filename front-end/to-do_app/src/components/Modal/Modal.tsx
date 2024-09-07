import { AddNote } from "../AddNote/AddNote";
import { TimeMetrics } from "../TimeMetrics/TimeMetrics";

export const Modal = ({ type }: { type: "add" | "time" }) => {
  return (
    <div className="modal">
      {type === "time" ? <TimeMetrics /> : <AddNote />}
    </div>
  );
};
//TODO: AGREGAR EL TIPO DE MODAL (otra prop) accesar por useContext

//e.g.
// const ModalBody = ({ children }: ComponentWithChildren) => {
//   return <div>{children}</div>;
// };

// Modal.ModalBody = ModalBody;
