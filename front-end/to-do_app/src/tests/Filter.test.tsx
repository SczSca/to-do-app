import "../components/Filter/Filter";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { Filter } from "../components/Filter/Filter";

describe("Filter", () => {
  it("renders Filter", () => {
    renderWithProviders(<Filter />);

    const sortDateBtn = screen.getByRole("button", {
      name: "Sort by deadline:",
    });
    expect(sortDateBtn).toBeInTheDocument();

    const sortPriorBtn = screen.getByRole("button", {
      name: "Sort by priority:",
    });
    expect(sortPriorBtn).toBeInTheDocument();
  });
});
