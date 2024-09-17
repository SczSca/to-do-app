import { createContext, useState } from "react";
import { ComponentWithChildren, ModalType } from "../types";

//TODO cambiar el tipado para la aceptacion de param para identificar con que modal se interactua

interface ModalContextI {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  toggleModal: () => void;
  isOpen: boolean;
  modalType: ModalType;
}

//creates initial obj
export const modalContext = createContext<ModalContextI>(null!);
modalContext.displayName = "modalProvider";

// context

//works as parent component
export const ModalProvider = ({ children }: ComponentWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const [modalType, setModalType] = useState(ModalType.Null);
  // type
  // toogle
  // cerrar
  // abrir

  const handleOpen = (type: ModalType) => {
    setIsOpen(true);
    setModalType(type);
  };

  const handleClosed = () => {
    setModalType(ModalType.Null);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <modalContext.Provider
      value={{
        openModal: handleOpen,
        closeModal: handleClosed,
        toggleModal: handleToggle,
        isOpen,
        modalType,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
