import { createContext, useState } from "react";
import { ComponentWithChildren } from "../types";

//TODO cambiar el tipado para la aceptacion de param para identificar con que modal se interactua
interface ModalContextI {
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  isOpen: boolean;
}

//creates initial obj
export const modalContext = createContext<ModalContextI>(null!);
modalContext.displayName = "modalProvider";

// context

//works as parent component
export const ModalProvider = ({ children }: ComponentWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  // type
  // toogle
  // cerrar
  // abrir

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClosed = () => {
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
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
