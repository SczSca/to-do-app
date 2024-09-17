import { render } from "@testing-library/react";
import { ModalProvider } from "../../context/modalContext";
import { CrudProvider } from "../../context/crudContext";

export const renderWithProviders = (ui: JSX.Element) => {
  return render(
    <CrudProvider>
      <ModalProvider>{ui}</ModalProvider>
    </CrudProvider>
  );
};
