import { screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { ModalType } from "../types";
import { Modal } from "../components/Modal/Modal";

describe("TimeMetrics", () => {
  it("renders TimeMetrics", () => {
    renderWithProviders(<Modal type={ModalType.Time}></Modal>);

    const cancelBtn = screen.getByRole("button", { name: "X" });
    expect(cancelBtn).toBeInTheDocument();

    const averageParagraph = screen.getByText("Average time to finish tasks:");
    expect(averageParagraph).toBeInTheDocument();

    const averageParagraphPrior = screen.getByText(
      "Average time to finish tasks by priority:"
    );
    expect(averageParagraphPrior).toBeInTheDocument();
    const paragraphHours = screen.getAllByText(/hours/i);
    expect(paragraphHours.length).toEqual(4);
  });
});
