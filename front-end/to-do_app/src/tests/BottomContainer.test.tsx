import "../components/BottomContainer/BottomContainer";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { BottomContainer } from "../components/BottomContainer/BottomContainer";
import { useContext } from "react";
import { modalContext } from "../context/modalContext";
import { Modal } from "../components/Modal/Modal";

const TestModal = () => {
  const { isOpen, modalType } = useContext(modalContext);

  return (
    <div>
      <BottomContainer />
      {isOpen && <Modal type={modalType} />}
    </div>
  );
};

describe("BottomContainer", () => {
  it("renders BottomContainer", () => {
    renderWithProviders(<TestModal />);

    const openTimeModalBtn = screen.getByRole("button", {
      name: "Time Metrics",
    });
    expect(openTimeModalBtn).toBeInTheDocument();

    const openAddModalBtn = screen.getByRole("button", {
      name: "Add new task",
    });
    expect(openAddModalBtn).toBeInTheDocument();
  });

  it("renders addModal", () => {
    renderWithProviders(<TestModal />);
    const openAddModalBtn = screen.getByRole("button", {
      name: "Add new task",
    });

    fireEvent.click(openAddModalBtn);
    const modalAdd = screen.getByRole("modal", { name: "" });
    expect(modalAdd).toBeInTheDocument();
  });

  it("renders TimeModal", () => {
    renderWithProviders(<TestModal />);
    const openTimeModalBtn = screen.getByRole("button", {
      name: "Time Metrics",
    });

    fireEvent.click(openTimeModalBtn);
    const modalTime = screen.getByRole("modal", { name: "" });
    expect(modalTime).toBeInTheDocument();
  });
});
