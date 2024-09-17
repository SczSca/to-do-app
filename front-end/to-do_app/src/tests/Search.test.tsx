import { Search } from "../components/Search/Search";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";

describe("Search", () => {
  it("renders Search", () => {
    renderWithProviders(<Search />);

    const inputText = screen.getByRole("textbox", {
      name: "Name:",
    });
    expect(inputText).toBeInTheDocument();

    const selectPrior = screen.getByRole("combobox", { name: "Priority:" });
    expect(selectPrior).toBeInTheDocument();

    const selectStatus = screen.getByRole("combobox", { name: "State:" });
    expect(selectStatus).toBeInTheDocument();

    const searchBtn = screen.getByRole("button", {
      name: "Search",
    });
    expect(searchBtn).toBeInTheDocument();
  });
});
