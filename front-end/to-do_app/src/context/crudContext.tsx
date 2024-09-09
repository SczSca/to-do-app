import { createContext } from "react";
import { ComponentWithChildren, taskElements } from "../types";

interface crudContextI {
  createTask: (task: taskElements) => void;
  readTask: () => void;
  updateTask: (task: taskElements) => void;
  deleteTask: () => void;
}

export const crudContext = createContext<crudContextI>(null!);
crudContext.displayName = "crudProvider";

export const CrudProvider = ({ children }: ComponentWithChildren) => {
  const handleCreation = (task: taskElements) => {
    console.log(task);
  };

  const handleUpdate = (task: taskElements) => {
    console.log(task);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleRead = () => {
    console.log("read");
  };

  return (
    <crudContext.Provider
      value={{
        createTask: handleCreation,
        readTask: handleRead,
        updateTask: handleUpdate,
        deleteTask: handleDelete,
      }}
    >
      {children}
    </crudContext.Provider>
  );
};
