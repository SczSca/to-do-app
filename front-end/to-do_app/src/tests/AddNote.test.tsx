import "../components/AddNote/AddNote";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { Modal } from "../components/Modal/Modal";
import { ModalType } from "../types";
import { errorMessages } from "../utils";

// Calculate a date string with +2 years from the current date
const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 2);
const futureDateString = futureDate.toISOString().split("T")[0];

describe("AddNote", () => {
  it("renders modal addNote", () => {
    renderWithProviders(<Modal type={ModalType.Add}></Modal>);

    // Verifies elements of modal addNote
    const inputText = screen.getByRole("textbox", { name: "Name:" });
    expect(inputText).toBeInTheDocument();

    const inputDeadline = screen.getByLabelText("Deadline:");
    expect(inputDeadline).toBeInTheDocument();

    const selectPrior = screen.getByRole("combobox", { name: "Priority:" });
    expect(selectPrior).toBeInTheDocument();

    const saveBtn = screen.getByRole("button", { name: "Save Changes" });
    expect(saveBtn).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();
  });

  it(`submits error, ${errorMessages.emptyTaskText}`, async () => {
    renderWithProviders(<Modal type={ModalType.Add}></Modal>);

    const inputText = screen.getByLabelText("Name:");
    fireEvent.change(inputText, { target: { value: "" } });

    const inputDeadline = screen.getByLabelText("Deadline:");
    fireEvent.change(inputDeadline, { target: { value: futureDateString } });

    const selectPrior = screen.getByLabelText("Priority:");
    fireEvent.change(selectPrior, { target: { value: "High" } });

    const saveBtn = screen.getByRole("button", { name: "Save Changes" });

    fireEvent.click(saveBtn);

    const pError = screen.getByText(errorMessages.emptyTaskText);
    expect(pError).toBeInTheDocument();
  });

  it(`submits error, ${errorMessages.taskTextLength}`, async () => {
    renderWithProviders(<Modal type={ModalType.Add}></Modal>);

    const inputText = screen.getByLabelText("Name:");
    const text =
      "Write a brief essay discussing the impact of technology on modern education. Include examples of how digital tools have transformed learning experiences in classrooms and beyond.";
    fireEvent.change(inputText, { target: { value: text } });

    const inputDeadline = screen.getByLabelText("Deadline:");
    fireEvent.change(inputDeadline, { target: { value: futureDateString } });

    const selectPrior = screen.getByLabelText("Priority:");
    fireEvent.change(selectPrior, { target: { value: "High" } });

    const saveBtn = screen.getByRole("button", { name: "Save Changes" });

    fireEvent.click(saveBtn);

    const pError = screen.getByText(errorMessages.taskTextLength);
    expect(pError).toBeInTheDocument();
  });
});
