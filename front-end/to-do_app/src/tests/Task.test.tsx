import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { Task } from "../components/Task/Task";
import { priorityType, TaskStructure } from "../types";
import { useContext } from "react";
import { modalContext } from "../context/modalContext";
import { Modal } from "../components/Modal/Modal";

interface Props {
  fakeItem: TaskStructure;
}

const TestModal = ({ fakeItem }: Props) => {
  const { isOpen, modalType } = useContext(modalContext);

  return (
    <div>
      <Task item={fakeItem} />
      {isOpen && <Modal type={modalType} />}
    </div>
  );
};

describe("Task", () => {
  const fakeItem: TaskStructure = {
    creationDate: "",
    id: 1,
    isDone: false,
    priority: priorityType.High,
    text: "fake task",
  };
  it("renders Task", () => {
    renderWithProviders(<TestModal fakeItem={fakeItem} />);

    const inputCheck = screen.getByRole("checkbox", {
      checked: false,
    });
    expect(inputCheck).toBeInTheDocument();

    const taskText = screen.getByText(fakeItem.text);
    expect(taskText).toBeInTheDocument();

    const taskPrior = screen.getByText(fakeItem.priority);
    expect(taskPrior).toBeInTheDocument();

    const dateString = fakeItem.dueDate
      ? new Date(fakeItem.dueDate).toLocaleDateString()
      : "No due date";

    const taskDate = screen.getByText(dateString);
    expect(taskDate).toBeInTheDocument();

    const editBtn = screen.getByRole("button", {
      name: "Edit",
    });
    expect(editBtn).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", {
      name: "Delete",
    });
    expect(deleteBtn).toBeInTheDocument();
  });

  it("renders editModal", () => {
    renderWithProviders(<TestModal fakeItem={fakeItem} />);
    const editBtn = screen.getByRole("button", {
      name: "Edit",
    });

    fireEvent.click(editBtn);

    const modalEdit = screen.getByRole("modal", { name: "" });
    expect(modalEdit).toBeInTheDocument();
  });

  it("renders deleteModal", () => {
    renderWithProviders(<TestModal fakeItem={fakeItem} />);
    const deleteBtn = screen.getByRole("button", {
      name: "Delete",
    });

    fireEvent.click(deleteBtn);

    const modalDelete = screen.getByRole("modal", { name: "" });
    expect(modalDelete).toBeInTheDocument();
  });
});
