import { createContext, useState } from "react";
import { ComponentWithChildren, ModalType } from "../types";

//TODO cambiar el tipado para la aceptacion de param para identificar con que modal se interactua

interface ModalContextI {
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  typeModal: (type: ModalType) => void;
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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClosed = () => {
    setModalType(ModalType.Null);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleModalType = (type: ModalType) => {
    setModalType(type);
  };
  return (
    <modalContext.Provider
      value={{
        openModal: handleOpen,
        closeModal: handleClosed,
        toggleModal: handleToggle,
        typeModal: handleModalType,
        isOpen,
        modalType,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
