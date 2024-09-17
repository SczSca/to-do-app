import "../components/DeleteNote/DeleteNote";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { ModalType } from "../types";
import { Modal } from "../components/Modal/Modal";

describe("DeleteNote", () => {
  it("renders DeleteNote", () => {
    renderWithProviders(<Modal type={ModalType.Delete}></Modal>);

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();
  });
});
