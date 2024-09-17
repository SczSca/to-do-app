import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages";
import { ModalProvider } from "./context/modalContext";
import { CrudProvider } from "./context/crudContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <CrudProvider>
        <ModalProvider>
          <Home />
        </ModalProvider>
      </CrudProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
