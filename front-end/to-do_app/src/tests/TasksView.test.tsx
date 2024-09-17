import "../components/TasksView/TasksView";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./tests_utils/utils";
import { priorityType, TaskStructure } from "../types";
import { useContext, useEffect } from "react";
import { crudContext } from "../context/crudContext";
import { TasksView } from "../components/TasksView/TasksView";

interface Props {
  dataParam: TaskStructure[];
}
const TestTasks = ({ dataParam }: Props) => {
  const { setData } = useContext(crudContext);

  // Usa useEffect para actualizar el estado después de la primera renderización
  useEffect(() => {
    setData(dataParam);
  }, [dataParam]);

  return <TasksView />;
};

describe("Tasks view", () => {
  const fakeItem: TaskStructure = {
    creationDate: "",
    id: 1,
    isDone: false,
    priority: priorityType.High,
    text: "fake task",
  };

  const fakeData: TaskStructure[] = [fakeItem];

  it("renders TasksView", () => {
    renderWithProviders(<TestTasks dataParam={fakeData} />);

    const taskText = screen.getByText(fakeItem.text);
    expect(taskText).toBeInTheDocument();
  });
});
