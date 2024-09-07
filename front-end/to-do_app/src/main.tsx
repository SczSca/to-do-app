import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages";
import { ModalProvider } from "./context/modalContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ModalProvider>
        <Home />
      </ModalProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
